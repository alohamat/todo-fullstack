import { useEffect, useRef, useState } from "react";

type TaskPopupProps = {
  onAddTask: (taskName: string) => void;
  onClose?: () => void;
};

export default function TaskPopup({ onAddTask, onClose }: TaskPopupProps) {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    inputRef.current?.focus();

    // close on esc
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // submit on enter
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setText("");
    onClose?.();
  };

  return (
    // backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onClose?.()}
      aria-hidden={false}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-[90vw] md:w-[48rem] max-w-[720px] bg-white rounded-2xl shadow-2xl p-5
            transform transition-all duration-300 ease-out
            ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 id="task-popup-title" className="font-bold text-lg md:text-xl">
              Name your task
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer rounded p-1"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex gap-3 items-center">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreve aí... (Enter pra adicionar)"
            className="grow px-3 py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />

          <div className="flex flex-col md:flex-row">

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow active:scale-95 transform transition hover:cursor-pointer"
            >
            Add
          </button>

          <button
            type="button"
            onClick={() => { setText(""); onClose?.(); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition hover:cursor-pointer"
            >
            Cancel
          </button>
            </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Dica: pressione <kbd className="rounded bg-gray-100 px-1">Enter</kbd> pra adicionar rápido.
        </p>
      </form>
    </div>
  );
}
