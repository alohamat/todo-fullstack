import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

import DefaultAvatar from "../assets/defaultavatar.png"
import Library from "../assets/library.png"
import Time from "../assets/time.png"
import Calendar from "../assets/calendar.png"

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
  children?: ReactNode;
};

function Sidebar({ isOpen, toggle, children }: SidebarProps) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  function PrivateNavigate(path: string) {
    if (!user) {
      setShowLogin(true);
    } else {
      navigate(path);
    }
  }

  return (
    // Sidebar container
    <div
      className={`fixed left-0 bg-gradient-to-b from-zinc-300 to-zinc-800 h-screen transition-all duration-200 ease-in-out overflow-hidden z-40
            ${
              isOpen
                ? "w-[70vw] md:w-[30vw] xl:w-[20vw] 2xl:w-[15vw] shadow-2xl shadow-black"
                : "md:flex md:flex-col w-0 md:w-16"
            }`}
    >
      <div
        className={`flex bg-amber-300 items-center py-2 overflow-hidden  ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <div className="flex items-center gap-4">
            <img
              src={DefaultAvatar}
              alt="Avatar"
              className="size-9"
            />
            <h1 className="whitespace-nowrap">
              {user ? `Hello, ${user.username}!` : "Log in to sync"}
            </h1>
          </div>
        )}
        {/*PC button, mobile is on dashboard*/}
        <button
          type="button"
          onClick={toggle}
          className={`hover:cursor-pointer hidden md:block ${
            isOpen ? "self-end mr-4" : "self-center"
          }`}
        >
          <img src="src/assets/menu.svg" alt="Menu" className="size-8" />
        </button>
      </div>
      <hr className="border-gray-400 my-2" />
      <nav className="flex flex-col transition-all duration-150 ease">
        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        <SidebarItem
          icon={
            <img
              src={Library}
              alt="All tasks"
              className="size-8"
            />
          }
          text="All tasks"
          isOpen={isOpen}
          click={() => PrivateNavigate("/alltasks")}
        />
        <SidebarItem
          icon={
            <img src={Time} alt="Today" className="size-8" />
          }
          text="Today"
          isOpen={isOpen}
          click={() => PrivateNavigate("/today")}
        />
        <SidebarItem
          icon={
            <img src={Calendar} alt="Week" className="size-8" />
          }
          text="Week"
          isOpen={isOpen}
          click={() => PrivateNavigate("/week")}
        />
      </nav>
      {children}
    </div>
  );
}

type SidebarChildrenProps = {
  icon: ReactNode;
  text: string;
  isOpen: boolean;
  click?: () => void;
};

function SidebarItem({ icon, text, isOpen, click }: SidebarChildrenProps) {
  const [showClosed, setShowClosed] = useState(!isOpen);

  useEffect(() => {
    let timeout: number;
    if (!isOpen) {
      timeout = setTimeout(() => setShowClosed(true), 50);
    } else {
      setShowClosed(false);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div
      className={`flex items-center gap-4 hover:bg-amber-300 bg-white rounded-2xl mb-4 w-full hover:cursor-pointer py-2 transition-all duration-500 ease-in-out ${
        showClosed ? "justify-center" : ""
      }`}
      onClick={click}
    >
      <span>{icon}</span>
      {isOpen && <span>{text}</span>}
    </div>
  );
}
export default Sidebar;
