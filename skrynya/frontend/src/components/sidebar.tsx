"use client";

import { FC, useState } from "react";
import { Home, User, Menu, X, Plus } from "lucide-react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { label: "Головна Сторінка", href: "/home", icon: <Home size={20} /> },
  { label: "Мій Профіль", href: "/profile", icon: <User size={20} /> },
  { label: "Опублікувати Збір", href: "/post", icon: <Plus size={20} /> },
];

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`fixed h-screen bg-main z-[99999]border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out ${
        isOpen ? "w-54" : "w-12"
      }`}
    >
        <div className="relative p-4">
        <h1
            className={`text-xl font-bold text-zinc-800 dark:text-white transition-opacity ${
            !isOpen ? "opacity-0 pointer-events-none" : ""
            }`}
        >
            Skrynya
        </h1>
        {/* <button
            className="absolute top-4 right-4 text-zinc-600 dark:text-zinc-300 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
        >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button> */}
        </div>


      <nav className="flex flex-col gap-2 px-4 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
          >
            {item.icon}
            <span
              className={`transition-opacity ${
                !isOpen ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
