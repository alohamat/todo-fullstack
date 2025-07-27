import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>

function InputForm(props: Props) {
    return (
        <input
        {...props}
        className="bg-amber-300 rounded-2xl p-1 focus:outline-none focus:ring-4 focus:ring-amber-500 transition ease-in-out min-w-[65%]"
            />
    );
}

export default InputForm;