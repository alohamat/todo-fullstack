import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TaskPopup from "./TaskPopup";
import NewTaskButton from "./NewTaskButton";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

type DashboardProps = {
  children?: React.ReactNode;
};

/**
 * TaskPopupContext
 * Expose open() and close() so any page/component can open the single popup inside Dashboard.
 */
type TaskPopupControls = {
  open: () => void;
  close: () => void;
};
const TaskPopupContext = createContext<TaskPopupControls | undefined>(undefined);

// Hook to use from pages:
// import { useTaskPopup } from "..src/components/Dashboard";
// const { open } = useTaskPopup();
export function useTaskPopup() {
  const ctx = useContext(TaskPopupContext);
  if (!ctx) throw new Error("useTaskPopup must be used inside Dashboard");
  return ctx;
}

function Dashboard({ children }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState("");
  const { addTask } = useTasks();

const handleSave = async (text: string, dueDate?: Date) => {
  console.log("Dashboard.handleSave called", { text, dueDate });
  const ok = await addTask(text, dueDate);
  console.log("Dashboard.addTask result:", ok);
  return ok;
};


  const popupControls: TaskPopupControls = {
    open: () => setIsTaskPopupOpen(true),
    close: () => setIsTaskPopupOpen(false),
  };

  return (
    <TaskPopupContext.Provider value={popupControls}>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={!!user} />
        <div className="flex flex-1 overflow-hidden relative">
          {/* overlay sidebar */}
          <div
            className={`fixed right-0 h-screen w-[30vw] bg-black/40 z-30 md:hidden
            ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* main */}
          <div className="bg-zinc-800 flex flex-col flex-1 md:ml-16 overflow-x-hidden relative">
            <NewTaskButton clickTask={() => setIsTaskPopupOpen(true)} clickNotes={() => setIsNotesOpen(true)}/>
            {/* open sidebar (mobile) */}
            <button
              className="block md:hidden mt-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <img
                src="src/assets/menu.svg"
                alt="Menu"
                className="h-10 p-1 bg-white rounded-md"
              />
            </button>

            {children}
          </div>

          {isTaskPopupOpen && (
            <TaskPopup
              onClose={() => setIsTaskPopupOpen(false)}
              onSave={handleSave}
            />
          )}

          {/* quick notes sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 text-white shadow-lg transform transition-transform duration-300 z-40
            ${isNotesOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-4 flex flex-col h-full">
              <header className="flex justify-between">
                <h2 className="text-lg font-bold mb-2">📝 Quick notes</h2>
                <button className="mb-2 hover:cursor-pointer" onClick={() => setIsNotesOpen(false)}>✕</button>
              </header>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 p-2 rounded bg-zinc-800 resize-none outline-none"
                placeholder="Write your notes here..."
              />
              <button
                onClick={() => setNotes("")}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </TaskPopupContext.Provider>
  );
}

export default Dashboard;
