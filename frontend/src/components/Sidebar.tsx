import type { ReactNode } from "react";

type SidebarProps = {
    isOpen: boolean;
    toggle: () => void;
    children?: ReactNode;
}

function Sidebar({isOpen, toggle, children}: SidebarProps) {
    return(
        <div className={`bg-zinc-500 transition-all duration-300 ease-in-out 
        %{isOpen ?'w-64': 'w-0'}`}>
            
        </div>
    )
}

export default Sidebar;