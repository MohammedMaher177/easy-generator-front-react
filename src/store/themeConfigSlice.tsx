import { createSlice } from "@reduxjs/toolkit";
import themeConfig from "../theme.config";

const defaultState = {
  isDarkMode: false,
  mainLayout: "app",
  theme: "light",
  menu: "vertical",
  layout: "full",
  animation: "",
  navbar: "navbar-sticky",
  locale: "en",
  sidebar: true,
  pageTitle: "",
  semidark: false,
};

const initialState = {
  theme: localStorage.getItem("theme") || themeConfig.theme,
  menu: localStorage.getItem("menu") || themeConfig.menu,
  layout: localStorage.getItem("layout") || themeConfig.layout,
  animation: localStorage.getItem("animation") || themeConfig.animation,
  navbar: localStorage.getItem("navbar") || themeConfig.navbar,
  isDarkMode: false,
  sidebar: localStorage.getItem("sidebar") || defaultState.sidebar,
  semidark: localStorage.getItem("semidark") || themeConfig.semidark,
};

const themeConfigSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      payload = payload || state.theme; // light | dark | system
      localStorage.setItem("theme", payload);
      state.theme = payload;
      if (payload === "light") {
        state.isDarkMode = false;
      } else if (payload === "dark") {
        state.isDarkMode = true;
      } else if (payload === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector("body")?.classList.add("dark");
      } else {
        document.querySelector("body")?.classList.remove("dark");
      }
    },
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      //   state.sidebar = false; // reset sidebar state
      localStorage.setItem("menu", payload);
      state.menu = payload;
    },
    toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      localStorage.setItem("layout", payload);
      state.layout = payload;
    },
    toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem("animation", payload);
      state.animation = payload;
    },
    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem("navbar", payload);
      state.navbar = payload;
    },
    toggleSemidark(state, { payload }) {
      payload = payload === true || payload === "true" ? true : false;
      localStorage.setItem("semidark", payload);
      state.semidark = payload;
    },
    toggleSidebar(state) {
      localStorage.setItem("sidebar", String(!state.sidebar));
      state.sidebar = !state.sidebar;
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
  toggleSidebar,
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
