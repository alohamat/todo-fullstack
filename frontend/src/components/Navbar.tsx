type NavbarProps = {
  isLoggedIn: boolean;
};

function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <header className="sticky top-0 flex items-center gap-4 bg-zinc-300 w-screen p-4 h-20">
      <div className="flex items-center gap-4">
        <img src="src/assets/todocheck.png" alt="icon" className="w-10 h-10" />
        <h1 className="text-2xl font-bold">To-do</h1>
      </div>

      <div className="flex items-center ml-auto">
        {isLoggedIn ? (
          <>
            <button className="text-2xl font-bold mr-4 hover:cursor-pointer">Dashboard</button>
            <button className="text-2xl font-bold hover:cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <button className="text-2xl font-bold mr-4 hover:cursor-pointer">Login</button>
            <button className="text-2xl font-bold hover:cursor-pointer">Why us</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;