import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LoginPopupProps = {
  onClose: () => void;
};

function LoginPopup({ onClose }: LoginPopupProps) {
  const navigate = useNavigate();
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
        <button onClick={onClose} className="self-end hover:cursor-pointer">✕</button>
        <h1 className="font-bold">Log in or register to have access to all features!</h1>
        <button className="bg-amber-300 p-2 w-fit self-center rounded-2xl mt-2 hover:cursor-pointer" onClick={() => navigate("/register")}>Log in</button>
      </div>
    </div>
  );
}

export default LoginPopup;
