import { createContext, useState, useContext } from "react";

export type Task = {
  id: string;
  text: string;
  createdAt: Date;
  dueDate?: Date;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (text: string, dueDate?: Date) => boolean;
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

  // Normaliza para meia-noite local: evita cagadas de timezone/hora
  const startOfDayLocal = (d: Date) => {
    const t = new Date(d);
    t.setHours(0, 0, 0, 0);
    return t;
  };

  // Agora "passado" significa: dia escolhido é ANTERIOR ao dia de hoje
  const isPast = (d: Date) =>
    startOfDayLocal(d).getTime() < startOfDayLocal(new Date()).getTime();

  const addTask = (text: string, dueDate?: Date): boolean => {
    if (dueDate && isPast(dueDate)) {
      console.warn("Tentou criar task com dueDate no passado — ignorado.");
      return false;
    }

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

    return true;
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
