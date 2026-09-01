import type { ReactNode } from "react";

type HeadingVariant = "h1" | "h2" | "h3" | "eyebrow";

export type HeadingProps = {
  variant: HeadingVariant;
  children: ReactNode;
  className?: string;
  id?: string;
};

const styles: Record<HeadingVariant, string> = {
  h1: "font-inter font-black text-[64px] md:text-[116px] leading-[0.92] md:leading-[0.88] text-zinc-50",
  h2: "font-inter font-black text-3xl md:text-[42px] leading-none text-zinc-50",
  h3: "font-jp font-bold text-xl md:text-2xl leading-tight text-zinc-50",
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
