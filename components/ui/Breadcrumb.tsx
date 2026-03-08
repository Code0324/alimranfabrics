import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-inter text-xs text-charcoal/50">
      <Link href="/" className="hover:text-emerald transition-colors flex items-center gap-1">
        <Home size={12} />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} className="text-charcoal/30" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-emerald transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
