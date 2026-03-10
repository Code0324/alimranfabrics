"use client";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-inter text-sm font-medium text-charcoal uppercase tracking-wide">
          Size: <span className="text-navy font-semibold">{selectedSize}</span>
        </span>
        <button className="font-inter text-xs text-charcoal/50 hover:text-gold transition-colors underline underline-offset-2">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`min-w-[2.75rem] h-10 px-3 font-inter text-sm font-medium border transition-all duration-200
              ${selectedSize === size
                ? "border-navy bg-navy text-ivory"
                : "border-charcoal/20 text-charcoal hover:border-gold hover:text-gold"
              }`}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="font-inter text-xs text-charcoal/50 mt-3">
        Need a custom size?{" "}
        <a href="/contact" className="text-gold hover:underline">Contact us</a>
        {" "}for tailored orders.
      </p>
    </div>
  );
}
