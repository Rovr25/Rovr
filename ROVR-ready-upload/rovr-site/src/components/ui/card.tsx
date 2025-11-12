
import * as React from "react";

export function Card({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={["rounded-2xl border border-white/15 bg-black/50", className].join(" ")}>{children}</div>;
}
export function CardHeader({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={["p-5", className].join(" ")}>{children}</div>;
}
export function CardTitle({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={["text-lg font-bold", className].join(" ")}>{children}</h3>;
}
export function CardContent({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={["p-5", className].join(" ")}>{children}</div>;
}
