import type { HTMLAttributes } from "react";

function DivForm(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="flex items-center gap-2 w-full flex-1">
      {props.children}
    </div>
  );
}

export default DivForm;
