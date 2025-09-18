import { useState } from "react";

export default function Task({ text }: {text: string}) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer my-2 p-3 rounded-2xl bg-white w-screen mx-auto"
      onClick={() => setChecked(!checked)}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="mr-2"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          className={`fill-none stroke-[3] transition-colors duration-300 ${
            checked ? "stroke-green-500" : "stroke-gray-400"
          }`}
        />

        <path
          d="M4 12l6 6L20 6"
          fill="none"
          stroke={checked ? "green" : "transparent"}
          strokeWidth="3"
          strokeDasharray="24"
          strokeDashoffset={checked ? 0 : 24}
          style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease" }}
        />
      </svg>

      <span
        className={`transition-colors duration-300 ${
          checked ? "line-through text-gray-500" : "text-black"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
