import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarInterface } from "../../features/interface";

const Sidebar = ({ open, setOpen }: SidebarInterface) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      link: "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      id: "expenses",
      name: "Expenses",
      link: "/expenses",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "users",
      name: "Users",
      link: "/users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
        </svg>
      ),
    },
  ];
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition duration-300 ease-in-out lg:static lg:translate-x-0 $`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
          <button
            className="p-1 text-gray-500 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeItem === item.id
                      ? "text-indigo-700 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                  }`}
                >
                  <span
                    className={`${
                      activeItem === item.id
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
