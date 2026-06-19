import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  TableIcon,
  UserCircleIcon,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      {
        name: "Ecommerce",
        path: "/dashboard",
      },
    ],
  },

  {
    icon: <BoxCubeIcon />,
    name: "Products",
    subItems: [
      {
        name: "All Products",
        path: "/products",
      },
      {
        name: "Create Product",
        path: "/product/create",
      },
    ],
  },

  {
    icon: <TableIcon />,
    name: "Orders",
    subItems: [
      {
        name: "All Orders",
        path: "/basic-tables?type=orders",
      },
    ],
  },

  {
    icon: <UserCircleIcon />,
    name: "Accounts",
    subItems: [
      {
        name: "All Accounts",
        path: "/basic-tables?type=accounts",
      },
      {
        name: "Create Account",
        path: "/account/create",
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => `${location.pathname}${location.search}` === path,
    [location.pathname, location.search],
  );

  useEffect(() => {
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((subItem) => {
        if (location.pathname + location.search === subItem.path) {
          setOpenSubmenu(index);
        }
      });
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
      ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
      }
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/logo.png" alt="Logo" width={150} />
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav>
          <h2
            className={`mb-4 text-xs uppercase flex text-gray-400 ${
              !isExpanded && !isHovered ? "lg:justify-center" : ""
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Menu"
            ) : (
              <HorizontaLDots className="size-6" />
            )}
          </h2>

          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === index ? null : index)
                  }
                  className="menu-item group w-full"
                >
                  <span className="menu-item-icon-size">{nav.icon}</span>

                  {(isExpanded || isHovered || isMobileOpen) && (
                    <>
                      <span className="menu-item-text">{nav.name}</span>

                      <ChevronDownIcon
                        className={`ml-auto w-5 h-5 transition-transform ${
                          openSubmenu === index ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                <div
                  ref={(el) => {
                    subMenuRefs.current[`${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu === index
                        ? `${subMenuHeight[`${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 ml-9 space-y-1">
                    {nav.subItems?.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
