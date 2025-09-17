import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
  children?: ReactNode;
};

function Sidebar({ isOpen, toggle, children }: SidebarProps) {
  const { user } = useContext(AuthContext);

  return (
    // Sidebar container
    <div 
    className={`fixed left-0 bg-gradient-to-b from-gray-300 to-gray-800 h-screen transition-all duration-200 ease-in-out overflow-hidden
            ${
              isOpen ? "w-[70vw] md:w-[15vw] shadow-2xl shadow-black" : "md:flex md:flex-col w-0 md:w-16"
            }`}
    >
      <div 
        className={`flex bg-amber-300 items-center py-2 overflow-hidden  ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <div className="flex items-center gap-4">
            <img src="src/assets/defaultavatar.png" alt="Avatar" className="size-9" />
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
      <nav
        className="flex flex-col transition-all duration-150 ease"
      >
        <SidebarItem
          icon={
            <img
              src="src/assets/library.png"
              alt="All tasks"
              className="size-8"
            />
          }
          text="All tasks"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={
            <img src="src/assets/time.png" alt="Today" className="size-8" />
          }
          text="Today"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={
            <img src="src/assets/calendar.png" alt="Week" className="size-8" />
          }
          text="Week"
          isOpen={isOpen}
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
};

function SidebarItem({ icon, text, isOpen }: SidebarChildrenProps) {
  return (
    <div className={`flex items-center gap-4 hover:bg-amber-300 hover:cursor-pointer py-2 transition-all duration-300 ease-in-out ${isOpen ? "" : "justify-center"}`}>
      <span className="">{icon}</span>
      {isOpen && <span className="">{text}</span>}
    </div>
  );
}
export default Sidebar;
