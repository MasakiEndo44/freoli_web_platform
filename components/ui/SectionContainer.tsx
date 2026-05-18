import type { HTMLAttributes, ReactNode } from "react";

export type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  children: ReactNode;
};

export function SectionContainer({
  id,
  className = "",
  children,
  ...rest
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
}
