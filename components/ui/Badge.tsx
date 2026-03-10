interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "bestseller" | "sale" | "featured";
  className?: string;
}

const variants = {
  new: "bg-navy text-ivory",
  bestseller: "bg-gold text-charcoal",
  sale: "bg-red-600 text-white",
  featured: "bg-charcoal text-ivory",
};

export default function Badge({ children, variant = "new", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-inter font-semibold px-2 py-0.5 uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
