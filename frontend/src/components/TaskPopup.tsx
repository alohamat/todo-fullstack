import { useState, useEffect } from "react";

type TaskPopupProps = {
  onClose: () => void;
  onSave: (text: string, dueDate?: Date) => void;
};

function TaskPopup({ onClose, onSave }: TaskPopupProps) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

let finalDueDate: Date | undefined;
  if (dueDate) {
    const [year, month, day] = dueDate.split("-").map(Number);
    finalDueDate = new Date(year, month - 1, day); // mês é 0-indexado
  }

  onSave(text, finalDueDate);
    setText("");
    setDueDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">Nova Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your task..."
            className="border px-3 py-2 rounded-md"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
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
              className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition hover:cursor-pointer"
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
