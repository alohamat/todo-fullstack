type NewTaskButtonProps = {
  click?: () => void;
}

function NewTaskButton({ click }: NewTaskButtonProps) {
    return (
         <button
          type="button"
          className="flex border-1 border-gray-500 bg-amber-500 hover:bg-amber-600 py-4 gap-4 h-[5vh] w-[90%] self-center hover:cursor-pointer items-center transition duration-200 rounded-r-2xl"
          onClick={click}
        >
          <img
            src="src/assets/plus.svg"
            alt="+"
            className="size-5 md:size-6"
          />
          <p className="text-sm md:text-xl">Add new task</p>
        </button>
    )   
}

export default NewTaskButton;