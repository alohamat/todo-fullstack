import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";



function Dashboard({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">  
      <Navbar centerText="Dashboard" isLoggedIn={!!user}/>
      <div className="flex flex-1 overflow-hidden">
        {/* overlay */}
        <div
          className={`fixed right-0 h-screen w-[30vw] bg-black/40 z-30 md:hidden
          ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="bg-zinc-800 flex-col  flex-1 md:ml-16 overflow-x-hidden">
          {/* mobile */}
          <button className="block md:hidden mt-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <img src="src/assets/menu.svg" alt="Menu" className="h-10 p-1 bg-white rounded-md" />
          </button>
          
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;