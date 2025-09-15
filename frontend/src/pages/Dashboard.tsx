import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
   <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={!!user} centerText={"Dashboard"} />
      
      <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} >
          </Sidebar>
        <div id="right" className="bg-zinc-300 flex-[8]">
          <div className="flex border-1 border-gray-500 py-4 mx-5 mt-5 gap-4 hover:cursor-pointer "><img src="src/assets/plus.svg" alt="+" className="size-6"/><p className="text-xl">Add new task</p></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;