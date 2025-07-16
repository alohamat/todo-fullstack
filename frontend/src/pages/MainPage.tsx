function MainPage() {
  return (
    <div className="bg-zinc-800 min-h-screen min-w-screen">
      <header className="sticky top-0 flex items-center gap-4 bg-zinc-300 w-screen p-4 h-20">
        <div className="flex items-center gap-4">
          <img src="src/assets/todocheck.png" alt="icon" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">To-do</h1>
        </div>

        <div className="flex items-center ml-auto">
          <h1 className="text-2xl font-bold">Why us</h1>
        </div>
      </header>
      
    </div>
  );
}

export default MainPage;
