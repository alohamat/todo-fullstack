type NewTaskButtonProps = {
  clickTask?: () => void;
  clickNotes?: () => void;
}

function NewTaskButton({ clickTask, clickNotes }: NewTaskButtonProps) {
    return (
         <div
          className="flex border-1 border-gray-500 bg-amber-300 py-4 gap-4 h-[5vh] w-full justify-between items-center transition duration-200 rounded-r-xl p-1"
          >
          <button className="flex gap-2 items-center hover:cursor-pointer"
          onClick={clickTask}>
          <img
            src="src/assets/plus.svg"
            alt="+"
            className="size-5 md:size-6"
            />
          <p className="text-sm md:text-xl">Add new task</p>
            </button>
             <button
            onClick={clickNotes}
            className=" bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md shadow-md hover:cursor-pointer mr-4"
          >
            Notes 📝
          </button>
        </div>
    )   
}

export default NewTaskButton;