
import * as React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={["w-full rounded-md border border-white/20 bg-black/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30", className].join(" ")}
      {...props}
    />
  );
}
