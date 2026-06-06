import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb"
      className="flex items-center gap-1.5 flex-wrap font-dm-sans text-[11px] text-charcoal/40 uppercase tracking-[0.1em]">
      <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={11} className="text-charcoal/25" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-charcoal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
