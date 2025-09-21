import { useState, useEffect } from "react";

type TaskPopupProps = {
  onClose: () => void;
  onSave: (text: string, dueDate?: Date) => boolean | Promise<boolean>;
};

function TaskPopup({ onClose, onSave }: TaskPopupProps) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const todayStr = (() => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  })();

  const normalizeDateInput = (s: string) => (s || "").trim();

  // Simple, robust comparison using YYYY-MM-DD lexical order
  const isDateBeforeToday = (s: string) => {
    const a = normalizeDateInput(s);
    if (!a) return false;
    return a < todayStr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (text.trim() === "") {
      setError("Task can't be empty");
      return;
    }

    if (isDateBeforeToday(dueDate)) {
      setError("Invalid date");
      return;
    }

    let finalDueDate: Date | undefined;
    if (dueDate) {
      const [year, month, day] = dueDate.split("-").map(Number);
      finalDueDate = new Date(year, month - 1, day);
    }

    // suporta onSave sync ou async
    const result = await Promise.resolve(onSave(text, finalDueDate));

    if (result) {
      setText("");
      setDueDate("");
      setError(null);
      onClose();
    } else {
      setError("❌ Can't create a task that expires in past");
    }
  };

  const saveDisabled = text.trim() === "" || isDateBeforeToday(dueDate);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md">
        <header className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">New Task</h2>
          <button className="hover:cursor-pointer" onClick={onClose}>✕</button>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p>Name:</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your task..."
            className="border px-3 py-2 rounded-md"
          />
          <p>Expire date (Optional): </p>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
            min={todayStr}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveDisabled}
              className={`px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition hover:cursor-pointer ${saveDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskPopup;
