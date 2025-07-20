import type { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

function LabelForm({ children, className, ...props }: Props) {
    return (
        <label
        {...props}
        className="bg-amber-300 rounded p-2"
        >
            {children}
        </label>
    )
}

export default LabelForm;