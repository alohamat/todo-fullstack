import { createContext, useState, useContext } from "react";

export type Task = {
  id: string;
  text: string;
  createdAt: Date;
  dueDate?: Date;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (text: string, dueDate?: Date) => void;
  removeTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    if (!stored) return [];
    const parsed: Task[] = JSON.parse(stored);

    return parsed.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));
  });

  const addTask = (text: string, dueDate?: Date) => {
    const newTask: Task = {
      id: crypto.randomUUID(), 
      text,
      createdAt: new Date(),
      dueDate,
    };

    setTasks(prev => {
      const updated = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeTask = (id: string) => {
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}
