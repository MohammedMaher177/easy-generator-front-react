import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
// import 'react-day-picker/style.css';
// import "./index.css";
import "./tailwind.css";

// Tailwind css

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

// Redux
import { Provider } from "react-redux";
import makeStore from "./store";

const store = makeStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
