import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong hover:-translate-y-px active:translate-y-0 shadow-sm",
  secondary:
    "border border-line bg-card text-ink hover:border-faint hover:bg-card-2",
  ghost: "text-muted hover:text-ink hover:bg-card-2",
};

interface CommonProps {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/** Botón real para acciones y enlace estilizado para navegación. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(
    base,
    variants[variant],
    size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchor} href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonRest} className={classes}>
      {children}
    </button>
  );
}
