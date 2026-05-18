import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "hoverable" | "featured";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  children: ReactNode;
};

const base =
  "bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-md px-6 py-5";

const variants: Record<CardVariant, string> = {
  default: "",
  hoverable:
    "hover:border-cyan-400 transition-colors duration-200",
  featured:
    "border-l-2 border-l-cyan-400 shadow-[-2px_0_12px_rgba(34,211,238,0.2)]",
};

export function Card({
  variant = "default",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div className={`${base} ${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
