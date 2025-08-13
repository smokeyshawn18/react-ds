// src/components/NavBar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const linkBase =
  "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition";
const linkInactive =
  "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800";
const linkActive = "text-white bg-gray-900 dark:bg-white dark:text-gray-900";

const navItems = [
  { to: "/", label: "Home" },
  // Routes name is according to the Task question sequence
  { to: "/task1.1", label: "Task1.1" },
  { to: "/task1.2", label: "Task1.2" },
  { to: "/task1.3", label: "Task1.3" },
  { to: "/task2", label: "Task2" },
  { to: "/task3", label: "Task3" },
];

// We can do without React.FC also but it is better to give type to the Component also
const NavBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const closeOnResize = () => setOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4"
        aria-label="Main Navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gray-900 dark:bg-white" />
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            React Data Saturn
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:ring-gray-700 dark:hover:bg-gray-800 md:hidden"
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5 text-gray-800 dark:text-gray-100" />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950`}
      >
        <ul className="mx-auto max-w-6xl px-2 py-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block ${linkBase} w-full ${
                    isActive ? linkActive : linkInactive
                  }`
                }
                end={item.to === "/"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
