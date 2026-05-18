import type { ReactNode } from "react";

type HeadingVariant = "h1" | "h2" | "h3" | "eyebrow";

export type HeadingProps = {
  variant: HeadingVariant;
  children: ReactNode;
  className?: string;
  id?: string;
};

const styles: Record<HeadingVariant, string> = {
  h1: "font-inter font-extrabold text-[64px] md:text-[116px] tracking-[-0.03em] md:tracking-[-0.036em] leading-[0.92] md:leading-[0.88] text-zinc-50",
  h2: "font-jp font-bold text-2xl md:text-4xl text-zinc-50",
  h3: "font-jp font-semibold text-xl md:text-2xl text-zinc-50",
  eyebrow:
    "font-inter font-semibold text-[9px] tracking-[0.28em] text-zinc-400 uppercase",
};

export function Heading({
  variant,
  children,
  className = "",
  id,
}: HeadingProps) {
  const merged = `${styles[variant]} ${className}`.trim();

  if (variant === "h1") {
    return (
      <h1 id={id} className={merged}>
        {children}
      </h1>
    );
  }
  if (variant === "h2") {
    return (
      <h2 id={id} className={merged}>
        {children}
      </h2>
    );
  }
  if (variant === "h3") {
    return (
      <h3 id={id} className={merged}>
        {children}
      </h3>
    );
  }
  return (
    <span id={id} className={merged}>
      {children}
    </span>
  );
}
