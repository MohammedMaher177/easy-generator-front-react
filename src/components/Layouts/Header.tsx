import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme, toggleSidebar } from "../../store/themeConfigSlice";
import Dropdown from "../Dropdown";
import IconMenu from "../Icon/IconMenu";
import IconSearch from "../Icon/IconSearch";
import IconSun from "../Icon/IconSun";
import IconLaptop from "../Icon/IconLaptop";
import IconUser from "../Icon/IconUser";
import IconLogout from "../Icon/IconLogout";
import { logout } from "@/store/slices/auth/slice";
import { Button } from "@headlessui/react";
import user_logo from "@/assets/images/user-profile.jpeg";
import easygenerator_logo from "../../assets/images/easygenerator_logo.png";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector(({ auth }) => auth);

  const themeConfig = useAppSelector(({ themeConfig }) => themeConfig);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""
      }`}
    >
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div
            className={`horizontal-logo flex lg:hi/dden justify-between items-center ltr:mr-2 rtl:ml-2 ${
              themeConfig.sidebar ? "opacity-0 pointer-events-none transition-all duration-100" : ""
            }`}
          >
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                src={easygenerator_logo}
                alt="logo"
              />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                Easy Generator
              </span>
            </Link>
            <button
              type="button"
              className={`collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60 ${
                themeConfig.sidebar ? "hi/dden" : ""
              }`}
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="ltr:mr-2 rtl:ml-2 hidden sm:block"></div>
          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6] justify-between">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
              </button>
            </div>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <div>
                {themeConfig.theme === "light" ? (
                  <button
                    className={`${
                      themeConfig.theme === "light" &&
                      "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                    }`}
                    onClick={() => {
                      dispatch(toggleTheme("dark"));
                    }}
                  >
                    <IconSun />
                  </button>
                ) : (
                  ""
                )}
                {themeConfig.theme === "dark" && (
                  <button
                    className={`${
                      themeConfig.theme === "dark" &&
                      "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                    }`}
                    onClick={() => {
                      dispatch(toggleTheme("light"));
                    }}
                  >
                    <IconLaptop />
                  </button>
                )}
              </div>

              <div className="dropdown shrink-0 flex">
                <Dropdown
                  offset={[0, 8]}
                  placement={`bottom-end`}
                  btnClassName="relative group block"
                  button={
                    <img
                      className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                      src={user_logo}
                      alt="userProfile"
                    />
                  }
                >
                  <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                    <li>
                      <div className="flex items-center px-4 py-4">
                        <img
                          className="rounded-md w-10 h-10 object-cover"
                          src={user_logo}
                          alt="userProfile"
                        />
                        <div className="ltr:pl-4 rtl:pr-4 truncate">
                          <h4 className="text-base">
                            {user?.name}
                            <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">
                              Pro
                            </span>
                          </h4>
                          <button
                            type="button"
                            className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                          >
                            {user?.email}
                          </button>
                        </div>
                      </div>
                    </li>
                    {/* <li>
                      <Link to="/profile" className="dark:hover:text-white">
                        <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        Profile
                      </Link>
                    </li> */}
                    <li className="border-t border-white-light dark:border-white-light/10">
                      <Button
                        onClick={handleLogout}
                        className="text-danger !py-3"
                      >
                        <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                        Sign Out
                      </Button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
