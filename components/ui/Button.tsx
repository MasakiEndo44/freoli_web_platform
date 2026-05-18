import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

type CommonProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] rounded-none font-inter font-bold text-xs md:text-sm tracking-[0.06em] px-6 py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan-400 text-black hover:bg-cyan-500",
  secondary:
    "border border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10",
  ghost: "bg-transparent text-zinc-50 hover:bg-zinc-900",
  link: "bg-transparent text-cyan-400 hover:text-cyan-500 underline-offset-4 hover:underline px-2",
};

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    loading = false,
    className = "",
    children,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} aria-busy={loading || undefined} {...anchorRest}>
        {loading ? <Spinner /> : null}
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? "button"}
      className={classes}
      aria-busy={loading || undefined}
      disabled={buttonRest.disabled || loading}
      {...buttonRest}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}
