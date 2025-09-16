import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={!!user} centerText={"Dashboard"} />
      <div className="flex flex-1 overflow-hidden">
        {/*Mobile adaptation with overlay*/}
        <div
          className={`fixed right-0 h-screen w-[30vw] bg-black/40 z-30 md:hidden
    ${
      isSidebarOpen
        ? "opacity-100 transition-opacity duration-300 ease-in-out"
        : "opacity-0"
    }
  `}
          onClick={toggleSidebar}
        />
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar}></Sidebar>
        <div id="right" className="bg-zinc-300 flex-[9] ml-15">
          <button className="block md:hidden" onClick={toggleSidebar}>
            <img src="src/assets/menu.svg" alt="Menu" className="size-8" />
          </button>
          <div className="flex border-1 border-gray-500 py-4 mx-5 mt-8 gap-4 h-[5vh] hover:cursor-pointer items-center">
            <img
              src="src/assets/plus.svg"
              alt="+"
              className="size-5 md:size-6"
            />
            <p className="text-sm md:text-xl">Add new task</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
