import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfig from './themeConfigSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import auth from './slices/auth/slice';
import todos from './slices/todos/slice';

const rootReducer = combineReducers({
    themeConfig,
    auth,
    todos,
});

const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

export type IRootState = ReturnType<typeof rootReducer>;

export type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

// export const useStore = (initialState?: any) => {
//     return useMemo(() => makeStore(), [initialState]);
// };

export default makeStore;
