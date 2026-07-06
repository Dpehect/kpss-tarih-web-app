import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  variant?: "primary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass = {
  primary: "btn-primary",
  gold: "btn-gold",
  ghost: "btn-ghost"
};

const sizeClass = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "",
  lg: "min-h-14 px-7 py-4 text-base"
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(variantClass[variant], sizeClass[size], className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(variantClass[variant], sizeClass[size], className)} {...props}>
      {children}
    </a>
  );
}
