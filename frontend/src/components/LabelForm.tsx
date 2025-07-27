import type { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

function LabelForm({ children, className, ...props }: Props) {
    return (
        <label
        {...props}
        className="bg-amber-300 rounded-2xl p-2 w-[35%] font-medium flex gap-1 justify-center"
        >
            {children}
        </label>
    )
}

export default LabelForm;