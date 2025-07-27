import { useNavigate } from "react-router-dom";

type NavbarProps = {
  isLoggedIn: boolean;
  centerText?: string;
};

function Navbar({ isLoggedIn, centerText }: NavbarProps) {

  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/register');
  };

  return (
    <header className="sticky top-0 flex items-center gap-4 bg-zinc-300 w-screen p-4 h-20 justify-between">
      <div className="flex items-center gap-4">
        <img src="src/assets/todocheck.png" alt="icon" className="size-7 md:size-10" />
        <h1 className="text-sm md:text-2xl  font-bold">To-do</h1>
      </div>

      <h1 className="text-2xl font-bold overflow-hidden hidden sm:block">{centerText}</h1>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <button className="text-sm md:text-2xl font-bold mr-4 hover:cursor-pointer hover:underline">Dashboard</button>
            <button className="text-sm md:text-2xl font-bold hover:cursor-pointer hover:underline">Logout</button>
          </>
        ) : (
          <>
            <button className="text-sm md:text-2xl font-bold mr-4 hover:cursor-pointer hover:underline" onClick={goLogin}>Login</button>
            <button className="text-sm md:text-2xl font-bold hover:cursor-pointer hover:underline">Why us</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;