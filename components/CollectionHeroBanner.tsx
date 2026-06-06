import Image from "next/image";

export interface BannerLine {
  text:   string;
  cls:    string;
  style?: React.CSSProperties;
}

interface CollectionHeroBannerProps {
  image:     string;
  lines:     BannerLine[];
  textSide?: "left" | "right";
  alt?:      string;
}

export default function CollectionHeroBanner({
  image,
  lines,
  textSide = "left",
  alt = "Collection",
}: CollectionHeroBannerProps) {
  return (
    <div className="relative h-[35vh] md:h-[45vh] w-full overflow-hidden bg-black">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
      {textSide === "left"  && <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />}
      {textSide === "right" && <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />}

      {/* Text + CTA */}
      <div
        className={`absolute bottom-0 z-10 pb-8 md:pb-12 ${
          textSide === "right"
            ? "right-0 pr-8 md:pr-16 text-right"
            : "left-0 pl-8 md:pl-16"
        }`}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`animate-hero-line ${line.cls}`}
            style={{ animationDelay: `${i * 0.14}s`, ...(line.style ?? {}) }}
          >
            {line.text}
          </div>
        ))}

        {/* SHOP NOW button */}
        <div
          className="animate-hero-line mt-4"
          style={{ animationDelay: `${lines.length * 0.14}s` }}
        >
          <a
            href="#products"
            onClick={(e) => e.stopPropagation()}
            className="inline-block font-dm-sans text-[11px] uppercase tracking-[0.2em]
                       bg-white text-[#1A1A1A] px-8 py-3
                       hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
