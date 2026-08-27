import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "outline-dark" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
}

interface AnchorButtonProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
}

interface ActionButtonProps extends BaseProps {
  onClick: () => void;
  type?: "button" | "submit";
  to?: never;
  href?: never;
}

type ButtonProps = LinkButtonProps | AnchorButtonProps | ActionButtonProps;

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  "outline-dark": "btn-outline--on-dark",
  ghost: "btn-ghost",
};

export default function Button({ children, variant = "primary", className = "", ...rest }: ButtonProps) {
  const classes = `btn ${variantClass[variant]} ${className}`.trim();

  if ("to" in rest && rest.to) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ("href" in rest && rest.href) {
    const isExternal = rest.href.startsWith("http");
    return (
      <a
        href={rest.href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = "button" } = rest as ActionButtonProps;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
