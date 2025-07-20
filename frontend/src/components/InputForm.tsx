import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>

function InputForm(props: Props) {
    return (
        <input
        {...props}
        className="bg-amber-300"
            />
    );
}

export default InputForm;