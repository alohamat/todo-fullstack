import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Task from "./Task";
import TaskPopup from "./TaskPopup";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (taskName: string) => {
    setTasks([...tasks, taskName]);
    setIsTaskPopupOpen(false);
    console.log("Task added:", taskName, " Task number: ", tasks.length);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={!!user} centerText={"Dashboard"} />
      <div className="flex flex-1 overflow-hidden">
        {/*Overlay mobile adaptation*/}
        <div
          className={`fixed right-0 h-screen w-[30vw] bg-black/40 z-30 md:hidden
    ${
      isSidebarOpen
        ? "opacity-100 transition-opacity duration-300 ease-in-out"
        : "opacity-0 pointer-events-none"
    }
  `}
          onClick={toggleSidebar}
        />
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar}></Sidebar>
        <div id="right" className="bg-zinc-300 flex-col flex flex-1 ml-16">
          {isTaskPopupOpen && <TaskPopup onAddTask={addTask} onClose={() => setIsTaskPopupOpen(false)} />}
          {/*Mobile button, PC is on sidebar*/}
          <button className="block md:hidden ml-2 mt-2" onClick={toggleSidebar}>
            <img src="src/assets/menu.svg" alt="Menu" className="size-8" />
          </button>
          <button
            type="button"
            className="flex border-1 border-gray-500 bg-amber-500 hover:bg-amber-600 py-4 gap-4 h-[5vh] w-[90%] self-center hover:cursor-pointer items-center transition duration-200 "
            onClick={() => setIsTaskPopupOpen(true)}
          >
            <img
              src="src/assets/plus.svg"
              alt="+"
              className="size-5 md:size-6"
            />
            <p className="text-sm md:text-xl">Add new task</p>
          </button>
          <div className="flex flex-col gap-3">
            {tasks.map((task, index) => (
              <Task key={index} text={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
