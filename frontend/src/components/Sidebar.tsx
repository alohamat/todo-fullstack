import type { ReactNode } from "react";

type SidebarProps = {
    isOpen: boolean;
    toggle: () => void;
    children?: ReactNode;
}


function Sidebar({isOpen, toggle, children}: SidebarProps) {
    return(
        <div className={`bg-gray-400 transition-all duration-300 ease-in-out flex flex-col
            ${isOpen ?'w-[50vw] md:w-[15vw]': 'w-16'} overflow-hidden`}>
            <button type="button" onClick={toggle} className="hover:cursor-pointer mb-4"><img src="src/assets/menu.svg" alt="Menu" /></button>
            <nav>
                <SidebarItem icon={<img src="src/assets/calendar.png" alt="Today"/> } text="Today" isOpen={isOpen}/>
                <SidebarItem icon={<img src="src/assets/time.png" alt="Week" /> } text="Week" isOpen={isOpen}/>
            </nav>
            {children}
        </div>
    )
}

type SidebarChildrenProps = {
    icon: ReactNode;
    text: string;
    isOpen: boolean;
}

function SidebarItem({icon, text, isOpen}: SidebarChildrenProps) {
    return (
        <div className="flex items-center gap-4 hover:bg-blue-400 hover:cursor-pointer py-2 transition-all duration-300 ease-in-out">
            <span className="">{icon}</span>
            {isOpen && <span className="">{text}</span>}
        </div>
    )
}
export default Sidebar;