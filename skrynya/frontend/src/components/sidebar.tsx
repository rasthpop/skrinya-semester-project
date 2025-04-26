"use client";

import { FC, useState, useContext, MouseEventHandler, useEffect } from "react";
import { Home, User, Plus, DoorOpen, LogIn } from "lucide-react";
import AuthContext from "@/app/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string | CallableFunction;
  icon: React.JSX.Element;
  action?: MouseEventHandler<HTMLButtonElement>;
}

const Sidebar: FC = () => {
  // const [isOpen, setIsOpen] = useState(true);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { logout, user } = authContext;

//   const profileHref = user ? "/profile" : "/login";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const [token, setToken] = useState<string | null>(null);
  const [profileHref, setProfileHref] = useState<string>("/login");
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => { 
    const profileHref = token ? "/profile" : "/login";
    setProfileHref(profileHref);
  }, [token]);

  const navItems: NavItem[] = [
    { label: "Головна Сторінка", href: "/home", icon: <Home size={20} /> },
    { label: "Мій Профіль", href: profileHref, icon: <User size={20} /> },
    { label: "Опублікувати Збір", href: "/post", icon: <Plus size={20} /> },
  ];

  const authItem: NavItem = token
    ? { label: "Вийти", href: "#", icon: <DoorOpen size={20} />, action: handleLogout }
    : { label: "Авторизуватися", href: "/login", icon: <LogIn size={20} /> };


  return (
    <aside
    className={`fixed h-screen bg-main z-[99999] border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out `}
  >
    <div className="relative p-4">
      <h1
        className={`text-xl font-bold text-zinc-800 dark:text-white transition-opacity`}
      >
        Skrynya
      </h1>
    </div>

    <nav className="flex flex-col justify-between h-[calc(100%-64px)] px-4 mt-4 pb-4">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={typeof item.href === "string" ? item.href : "#"}
            className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {item.icon}
            <span
              className={`transition-opacity`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <div>
        {authItem.action ? (
          <button
            onClick={authItem.action}
            className="w-full flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {authItem.icon}
            <span
              className={`transition-opacity`}
            >
              {authItem.label}
            </span>
          </button>
        ) : (
          <Link
            href={typeof authItem.href === "string" ? authItem.href : "#"}
            className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {authItem.icon}
            <span
              className={`transition-opacity`}
            >
              {authItem.label}
            </span>
          </Link>
        )}
      </div>
    </nav>
  </aside>
  );
};

export default Sidebar;
