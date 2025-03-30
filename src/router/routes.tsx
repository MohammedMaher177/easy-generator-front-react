import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Login from '@/pages/Auth/login';
import Register from '@/pages/Auth/Register';
import Auth from '@/pages/Auth';
import Todos from '@/pages/todos';

const Index = lazy(() => import('../pages/Index'));

const routes = [
    { path: '/', element: <Index />, layout: 'default' },
    { path: '/todos', element: <Todos />, layout: 'default' },
    {
        path: '/auth',
        element: <Auth />,
        layout: 'blank',
        children: [
            { path: '', element: <Navigate to="/auth/login" /> }, // redirect base /auth
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
    // { path: '/login', element: <Login />, layout: 'blank' },
    // { path: '/register', element: <Register />, layout: 'blank' },
];

export { routes };
