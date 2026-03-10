import React from "react";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-ivory hover:bg-navy focus:ring-gold",
  gold:
    "text-charcoal hover:opacity-90 focus:ring-gold",
  outline:
    "border-2 border-gold text-gold hover:bg-navy hover:text-ivory focus:ring-gold",
  ghost:
    "text-charcoal hover:bg-ivory-dark focus:ring-charcoal",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const goldStyle =
    variant === "gold"
      ? { background: "linear-gradient(135deg, #C9A84C 0%, #D9BC74 50%, #A8882E 100%)" }
      : {};

  return (
    <button
      style={goldStyle}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-inter font-medium tracking-wide uppercase
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
