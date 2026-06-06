"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed,   setIsZoomed]   = useState(false);
  const [zoomPos,    setZoomPos]    = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* ── Thumbnail strip ── */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[580px] scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-14 h-[72px] md:w-16 md:h-20 overflow-hidden
                        transition-all duration-150
                        ${i === activeIndex
                          ? "border border-[#1A1A1A]"
                          : "border border-[#E8E4DE] hover:border-[#aaa]"}`}
          >
            <Image
              src={img}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* ── Main image ── */}
      <div className="flex-1">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-[#F5F2ED] cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[activeIndex]}
            alt={`${productName} main view`}
            fill
            priority
            className={`object-cover transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
            style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
            sizes="(max-width: 768px) 100vw, 55vw"
          />

          {!isZoomed && (
            <p className="absolute bottom-3 right-3 font-dm-sans text-[10px] text-charcoal/40 uppercase tracking-[0.1em]">
              Hover to zoom
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
