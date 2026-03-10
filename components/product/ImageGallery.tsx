"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[580px] scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-200 ${
              i === activeIndex
                ? "border-navy"
                : "border-transparent hover:border-gold/60"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-ivory-dark cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[activeIndex]}
            alt={`${productName} main view`}
            fill
            priority
            className={`object-cover transition-transform duration-200 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : {}
            }
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoom hint */}
          {!isZoomed && (
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 flex items-center gap-1.5 text-xs font-inter text-charcoal/70">
              <ZoomIn size={13} />
              Hover to zoom
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
