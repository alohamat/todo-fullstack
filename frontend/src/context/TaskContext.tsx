import React, { createContext, useContext, useEffect, useState } from "react";

export type Task = {
  id: string;
  text: string;
  createdAt: Date;
  dueDate?: Date;
  completed?: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (text: string, dueDate?: Date) => Promise<boolean>;
  removeTask: (id: string) => Promise<void>;
  updateTask: (id: string, patch: Partial<Pick<Task, "text" | "dueDate" | "completed">>) => Promise<boolean>;
  fetchTasks: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const API_BASE = "https://todo-fullstack-production-e159.up.railway.app"

function getToken() {
  return localStorage.getItem("access_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  // build a headers object and only set Authorization if token exists (keeps TS happy)
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// Helpers to normalize server responses (handles { id } or { _id: { $oid } })
function extractId(obj: any): string {
  if (!obj) return "";
  if (typeof obj.id === "string" && obj.id) return obj.id;
  if (obj._id) {
    if (typeof obj._id === "string") return obj._id;
    if (obj._id.$oid) return obj._id.$oid;
  }
  return "";
}

function toTask(obj: any): Task {
  return {
    id: extractId(obj) || crypto.randomUUID(),
    text: obj.text ?? "",
    createdAt: obj.createdAt ? new Date(obj.createdAt) : new Date(),
    dueDate: obj.dueDate ? new Date(obj.dueDate) : undefined,
    completed: !!obj.completed,
  };
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored) as any[];
      return parsed.map(toTask);
    } catch {
      return [];
    }
  });

  const persist = (items: Task[]) => localStorage.setItem("tasks", JSON.stringify(items));

  //fetch tasks from api and replace local cache if success
  const fetchTasks = async () => {
    const token = getToken();
    if (!token) return; // not logged in, keep local cache
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "GET",
        headers: authHeaders(),
      });
      if (!res.ok) {
        const text = await res.text();
      console.warn("[fetchTasks] error response:", text);
        return;
      }
      const data: any[] = await res.json();
      const mapped = (data ?? []).map(toTask); // guarantes to never be null
      setTasks(mapped);
      persist(mapped);
    } catch (err) {
      console.warn("Failed to fetch tasks:", err);
    }
  };

  //date helpers (same behavior as before)
  const startOfDayLocal = (d: Date) => {
    const t = new Date(d);
    t.setHours(0, 0, 0, 0);
    return t;
  };
  const isPast = (d: Date) => startOfDayLocal(d).getTime() < startOfDayLocal(new Date()).getTime();

  // Create (optimistic, then sync with server)
  const addTask = async (text: string, dueDate?: Date): Promise<boolean> => {
    if (dueDate && isPast(dueDate)) {
      console.warn("task in past");
      return false;
    }

    const tempTask: Task = {
      id: crypto.randomUUID(),  
      text,
      createdAt: new Date(),
      dueDate,
      completed: false,
    };

    // optimistic update
    setTasks((prev) => {
      const updated = [...prev, tempTask];
      persist(updated);
      return updated;
    });

    const token = getToken();
    if (!token) return true; // offline/local mode
    try {
      const body: any = { text };
      if (dueDate) body.dueDate = dueDate.toISOString(); // server accepts RFC3339
      console.log("[addTask] token:", getToken());
      console.log("[addTask] body:", body);


      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      console.log("[addTask] response status:", res.status);
      if (!res.ok) {
        setTasks((prev) => {
          const updated = prev.filter((t) => t.id !== tempTask.id);
          console.warn("[addTask] server response:", text);
          persist(updated);
          return updated;
        });
        return false;
      }
      const saved = await res.json();
      const savedTask = toTask(saved);

      // replace temp with saved
      setTasks((prev) => {
        const updated = prev.map((t) => (t.id === tempTask.id ? savedTask : t));
        persist(updated);
        return updated;
      });
      return true;
    } catch (err) {
      console.warn("Network error creating task; kept local optimistic version", err);
      return true;
    }
  };

  const removeTask = async (id: string): Promise<void> => {
    console.log("delete called");
    
    const prev = tasks;
    setTasks((p) => {
      const updated = p.filter((t) => t.id !== id);
      persist(updated);
      return updated;
    });

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      console.log("sent delete req");
      if (!res.ok) {
        // revert on failure
        console.warn("fail to delete task");
        setTasks(prev);
        persist(prev);
      }
    } catch (err) {
      console.warn("Network error deleting task, reverting", err);
      setTasks(prev);
      persist(prev);
    }
  };

  // Update (optimistic then sync)
  const updateTask = async (
    id: string,
    patch: Partial<Pick<Task, "text" | "dueDate" | "completed">>
  ): Promise<boolean> => {
    const prev = tasks;
    setTasks((p) => {
      const updated = p.map((t) => (t.id === id ? { ...t, ...patch, dueDate: patch.dueDate ?? t.dueDate } : t));
      persist(updated);
      return updated;
    });

    const token = getToken();
    if (!token) return true;

    try {
      const body: any = {};
      if (patch.text !== undefined) body.text = patch.text;
      if (patch.completed !== undefined) body.completed = patch.completed;
      if (patch.dueDate !== undefined) body.dueDate = patch.dueDate ? patch.dueDate.toISOString() : "";

      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        // revert
        setTasks(prev);
        persist(prev);
        return false;
      }
      const saved = await res.json();
      // server may return updated doc — normalize it
      const savedTask = toTask(saved);
      setTasks((p) => {
        const updated = p.map((t) => (t.id === id ? savedTask : t));
        persist(updated);
        return updated;
      });
      return true;
    } catch (err) {
      console.warn("Network error updating task, reverting", err);
      setTasks(prev);
      persist(prev);
      return false;
    }
  };

  // on mount try to load from server (if logged)
  useEffect(() => {
    fetchTasks().catch(() => {
      /* silent fail — keep local cache */
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, updateTask, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}
