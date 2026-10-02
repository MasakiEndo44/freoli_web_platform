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
      className={`w-full min-w-0 overflow-hidden ${className}`.trim()}
      {...rest}
    >
      <div className="mx-auto w-full max-w-6xl min-w-0 px-3 py-16 sm:px-4 md:px-8 md:py-24">
        {children}
      </div>
    </section>
  );
}
