"use client";

import { FC, useState, useContext, MouseEventHandler, useEffect } from "react";
import { Home, User, Plus, DoorOpen } from "lucide-react";
import AuthContext from "@/app/AuthContext";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string | CallableFunction;
  icon: React.JSX.Element;
  action?: MouseEventHandler<HTMLAnchorElement>;
}

const Sidebar: FC = () => {
  // const [isOpen, setIsOpen] = useState(true);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { logout, user } = authContext;
  const ProfileHref = (): string => {
    if (user) {
      return "/profile";
    }
    return "/login";
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const navItems: NavItem[] = [
    { label: "Головна Сторінка", href: "/home", icon: <Home size={20} /> },
    { label: "Мій Профіль", href: ProfileHref(), icon: <User size={20} /> },
    { label: "Опублікувати Збір", href: "/post", icon: <Plus size={20} /> },
    {
      label: "Вийти",
      href: "#",
      icon: <DoorOpen size={20} />,
      action: () => {
        logout();
        window.location.reload(); // Refresh the page after logout
      },
    },
  ];

  return (
    <aside
      className={`fixed h-screen bg-main z-[99999]border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out `}
    >
      <div className="relative p-4">
        <h1
          className={`text-xl font-bold text-zinc-800 dark:text-white transition-opacity`}
        >
          Skrynya
        </h1>
      </div>

      <nav className="flex flex-col gap-2 px-4 mt-4">
        {navItems.map((item) => {
          if (item.label === "Вийти" && token === null) {
            return null;
          }
          return (
            <Link
              key={typeof item.href === "string" ? item.href : "callable-function"}
              href={typeof item.href === "function" ? item.href() : item.href}
              onClick={item.action}
              className={`${
                item.label === "Вийти" ? "mt-[428px]" : ""
              }  flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
            >
              {item.icon}
              <span
                className={`transition-opacity`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
