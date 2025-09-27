import Plus from "../assets/plus.png"

type NewTaskButtonProps = {
  clickTask?: () => void;
  clickNotes?: () => void;
};

function NewTaskButton({ clickTask, clickNotes }: NewTaskButtonProps) {
  return (
    <div className="flex py-4 gap-4 h-[5vh] w-full justify-between items-center transition duration-200 p-1">
      <div className="rounded-2xl bg-amber-300 px-2">
        <button
          className="flex gap-2 items-center hover:cursor-pointer"
          onClick={clickTask}
        >
          <img src={Plus} alt="+" className="h-9"/>
          <p className="text-sm md:text-xl text-white font-bold">Add new task</p>
        </button>
      </div>
      <button
        onClick={clickNotes}
        className=" bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md shadow-md hover:cursor-pointer mr-4"
      >
        Notes 📝
      </button>
    </div>
  );
}

export default NewTaskButton;
