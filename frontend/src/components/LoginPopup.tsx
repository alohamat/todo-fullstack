import { useEffect } from "react";

type LoginPopupProps = {
  onClose: () => void;
};

function LoginPopup({ onClose }: LoginPopupProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md flex flex-col">
        <button onClick={onClose} className="self-end">✕</button>
        <h1 className="font-bold">Log in or register to have access to all features!</h1>
      </div>
    </div>
  );
}

export default LoginPopup;
