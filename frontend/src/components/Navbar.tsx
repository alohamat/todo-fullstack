import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import TodoCheck from "../assets/todocheck.png"

type NavbarProps = {
  isLoggedIn: boolean;
};

function Navbar({ isLoggedIn }: NavbarProps) {

  const {logout} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const goLogin = () => {
    navigate('/register');
  };
  const goHome = () => {
    navigate('/');
  }
  const goDashboard = () => {
    navigate('/dashboard');
  }
  const goLogout = () => {
    logout();
    navigate('/');
  }

 const centerTextMap: Record<string, string> = {
    "/": "Welcome",
    "/dashboard": "Quick Tasks",
    "/alltasks": "All Tasks",
    "/week": "This week",
    "/today": "Today",
    "register": "Authenticate to have access to all features",
  };

  const centerText = centerTextMap[location.pathname] || "";
  
  return (
    <header className="sticky top-0 flex items-center gap-4 bg-amber-300 w-screen p-4 h-15 justify-between">
      <div className="flex items-center gap-4">
        <img src={TodoCheck} alt="icon" className="size-7 md:size-10" />
        <button className="text-xl md:text-2xl font-bold hover:cursor-pointer hover:underline" onClick={goHome}>To-do</button>
      </div>

      <h1 className="text-2xl font-bold overflow-hidden hidden sm:block">{centerText}</h1>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <button className="text-xl md:text-2xl font-bold mr-4 hover:cursor-pointer hover:underline" onClick={goDashboard}>Dashboard</button>
            <button className="text-xl md:text-2xl font-bold hover:cursor-pointer hover:underline" onClick={goLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="text-xl md:text-2xl font-bold mr-4 hover:cursor-pointer hover:underline" onClick={goLogin}>Login</button>
            <button className="text-xl md:text-2xl font-bold hover:cursor-pointer hover:underline">Why us</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;