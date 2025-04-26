"use client";

import { FC, useState, useContext, MouseEventHandler, useEffect } from "react";
import { Home, User, Plus, DoorOpen, LogIn, Menu, X } from "lucide-react";
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
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  
  const { logout, user } = authContext;
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  

  const handleLogout = () => {
      logout();
    router.push("/login");
};


const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
      setIsMobileMenuOpen(prev => !prev);
  };
  
  const [token, setToken] = useState<string | null>(null);
  const [profileHref, setProfileHref] = useState<string>("/login");
  const router = useRouter();

  

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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed h-screen bg-main z-[99999] border-r border-zinc-200 dark:border-zinc-800 flex-col transition-all duration-300 ease-in-out">
        <div className="relative p-4">
          <h1 className="text-xl font-bold text-zinc-800 dark:text-white">
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
                <span>{item.label}</span>
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
                <span>{authItem.label}</span>
              </button>
            ) : (
              <Link
                href={typeof authItem.href === "string" ? authItem.href : "#"}
                className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {authItem.icon}
                <span>{authItem.label}</span>
              </Link>
            )}
          </div>
        </nav>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-main border-b border-zinc-200 dark:border-zinc-800 fixed w-full z-[99999]">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-white">
          Skrynya
        </h1>
        <button onClick={toggleMobileMenu} className="text-zinc-700 dark:text-zinc-300">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-main flex flex-col items-center justify-center gap-6 z-[99998]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={typeof item.href === "string" ? item.href : "#"}
              onClick={toggleMobileMenu}
              className="text-xl flex items-center gap-2 text-zinc-800 dark:text-zinc-100 hover:underline"
            >
              {item.icon}
              <span>
                {item.label}
              </span>
            </Link>
          ))}
          {authItem.action ? (
            <button
              onClick={(e) => {
                authItem.action?.(e);
                toggleMobileMenu();
              }}
              className="text-xl text-zinc-800 flex items-center gap-2 dark:text-zinc-100 hover:underline"
            >
              {authItem.icon}
              {authItem.label}
            </button>
          ) : (
            <Link
              href={typeof authItem.href === "string" ? authItem.href : "#"}
              onClick={toggleMobileMenu}
              className="text-xl text-zinc-800 dark:text-zinc-100 hover:underline"
            >
              {authItem.label}
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
