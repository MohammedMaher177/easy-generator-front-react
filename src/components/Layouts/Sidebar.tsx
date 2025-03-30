import { useEffect } from "react";
import { IRootState, useAppDispatch, useAppSelector } from "../../store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import IconCaretsDown from "../Icon/IconCaretsDown";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconMenuContacts from "../Icon/IconMenuContacts";
import { sidebarItems } from "@/common/sidebarItems";
import easygenerator_logo from "../../assets/images/easygenerator_logo.png";
import { Button } from "@headlessui/react";
import { logout } from "@/store/slices/auth/slice";
import IconLogout from "../Icon/IconLogout";

type Props = {};

export default function Sidebar({}: Props) {
  const themeConfig = useAppSelector((state: IRootState) => state.themeConfig);
  const semidark = useAppSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`${semidark ? "dark" : ""} 
       ${themeConfig.sidebar ? "" : "hidden"}
      `}
    >
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-8 ml-[5px] flex-none"
                src={easygenerator_logo}
                alt="logo"
              />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                Easy Generator
              </span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative flex flex-col justify-between">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              {sidebarItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink to={item.path} className="group">
                    <div className="flex items-center">
                      <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                      <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                        {item.name}
                      </span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button onClick={handleLogout} className="text-danger !py-3 flex items-center justify-center gap-6 w-full">
              <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
              Sign Out
            </Button>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
}
