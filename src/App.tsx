import { PropsWithChildren, useEffect } from "react";
import { IRootState, useAppDispatch, useAppSelector } from "./store";
import {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "./store/themeConfigSlice";
import { getFromLocal } from "./util/util";
import { setAuth } from "./store/slices/auth/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { howAmI } from "./store/slices/auth/actions";

function App({ children }: PropsWithChildren) {
  const themeConfig = useAppSelector((state: IRootState) => state.themeConfig);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });

  const initUser = () => {
    const token = getFromLocal("jwt_access_token");
    if (token) {
      dispatch(howAmI());
    } else {
      dispatch(setAuth(false));
      if (location.pathname.includes("auth")) return;
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    initUser();
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark)
    );
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(themeConfig?.sidebar && "toggle-sidebar") || ""} ${
        themeConfig.menu
      } ${
        themeConfig.layout
      } main-section antialiased relative text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default App;
