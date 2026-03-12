/**
 * Local product catalogue — 20 products per major collection slug.
 * Used as a fallback when the backend returns 0 results for a slug.
 * Brands: Khaadi · J. (Junaid Jamshed) · Bin Saeed · Tawakkal · MTJ · Saya · Nishat · Salitex/Salina
 * Stock year: 2026
 */

import type { BackendProduct } from "@/lib/api";

// ─── Unsplash image pools ────────────────────────────────────────────────────

const W = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80`;

// Women fashion
const wImg = [
  W("1490481651871-ab68de25d43d"), W("1567401893414-76b7b1e5a7a5"),
  W("1583391733956-3750e0ff4e8b"), W("1509631179647-0177331693ae"),
  W("1585771724684-38269d6639fd"), W("1594938298603-c8148c4b984b"),
  W("1617019114583-affb34d1b3cd"), W("1602810318383-e386cc2a3ccf"),
  W("1537832816519-689ad163239b"), W("1571609860754-b58e41c1cccb"),
  W("1558171813-0ebd2dc6d440"),   W("1512235248509-d6b1f32e8e23"),
  W("1551232864-3f0890e580d9"),   W("1485968579580-b6d095142e6e"),
  W("1558769132-cb1aea458c5e"),   W("1519086519702-b26e15b60b50"),
  W("1620122830785-8d731f77d965"), W("1532453288792-d49840d29b04"),
  W("1621007947382-bb3c3994e3fb"), W("1539109136881-3be0616acf4b"),
];

// Men fashion
const mImg = [
  W("1507003211169-0a1dd7228f2d"), W("1519085360753-af0119f7cbe7"),
  W("1512418490979-92798cec1380"), W("1506794778202-cad84cf45f1d"),
  W("1500648767791-00dcc994a43e"), W("1552058544-f2b08422138a"),
  W("1490481651871-ab68de25d43d"), W("1602810318383-e386cc2a3ccf"),
  W("1617019114583-affb34d1b3cd"), W("1583391733956-3750e0ff4e8b"),
];

// Kids
const kImg = [
  W("1522771930-78848d9293e8"), W("1533483595632-c5f0e57a1936"),
  W("1558769132-cb1aea458c5e"), W("1585771724684-38269d6639fd"),
  W("1509631179647-0177331693ae"), W("1490481651871-ab68de25d43d"),
];

function wi(i: number) { return [wImg[i % wImg.length]]; }
function mi(i: number) { return [mImg[i % mImg.length]]; }
function ki(i: number) { return [kImg[i % kImg.length]]; }

// ─── Helper ──────────────────────────────────────────────────────────────────

let _id = 1000;
function p(
  name: string,
  brand: string,
  brandSlug: string,
  categorySlug: string,
  category: string,
  fabric: string,
  price: number,
  images: string[],
  description: string,
  opts: Partial<BackendProduct> = {}
): BackendProduct {
  _id++;
  return {
    id: `local-${_id}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description,
    price,
    originalPrice: opts.originalPrice ?? null,
    images,
    category,
    categorySlug,
    brand,
    brandSlug,
    fabric,
    stock: 20,
    stockStatus: "in_stock",
    isFeatured: opts.isFeatured ?? false,
    isBestSeller: opts.isBestSeller ?? false,
    isNew: opts.isNew ?? true,
    isLimitedEdition: opts.isLimitedEdition ?? false,
    discountPercentage: opts.discountPercentage ?? 0,
    tags: opts.tags ?? `${categorySlug},2026`,
  };
}

// ─── STITCHED (women's stitched suits) ───────────────────────────────────────

export const stitchedProducts: BackendProduct[] = [
  p("Khaadi Embroidered Stitched 3-Piece Lawn 2026","Khaadi","khaadi","stitched","Women","Lawn",89,wi(0),"Vibrant embroidered lawn kurta with printed dupatta and trouser. Ready to wear, fully stitched.",{isNew:true,isBestSeller:true}),
  p("Khaadi Printed Stitched Kurta Single 2026","Khaadi","khaadi","stitched","Women","Lawn",52,wi(1),"Single-piece digital printed lawn kurta, perfect for casual everyday wear.",{isNew:true}),
  p("J. Junaid Jamshed Stitched Lawn 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","stitched","Women","Lawn",95,wi(2),"Classic floral lawn suit with embroidered neckline and contrast dupatta.",{isNew:true,isBestSeller:true}),
  p("J. Stitched Cambric Kurta 2026","J. Junaid Jamshed","j-junaid-jamshed","stitched","Women","Cambric",65,wi(3),"Soft cambric stitched kurta with intricate thread work on sleeves and hem.",{isNew:true}),
  p("Bin Saeed Stitched Fancy Suit 2026","Bin Saeed","bin-saeed","stitched","Women","Chiffon",112,wi(4),"Luxurious chiffon stitched 3-piece with heavy embroidered borders.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Lawn Stitched 2-Piece 2026","Bin Saeed","bin-saeed","stitched","Women","Lawn",72,wi(5),"Fresh floral lawn stitched 2-piece — kurta and trouser.",{isNew:true}),
  p("Tawakkal Stitched Georgette Suit 2026","Tawakkal","tawakkal","stitched","Women","Georgette",98,wi(6),"Elegant georgette stitched suit with zari embroidery on neck and cuffs.",{isNew:true}),
  p("Tawakkal Digital Printed Stitched 3-Piece 2026","Tawakkal","tawakkal","stitched","Women","Lawn",79,wi(7),"Bold digital printed lawn suit — stitched and ready to wear.",{isNew:true}),
  p("MTJ Stitched Linen Suit 2026","MTJ","mtj","stitched","Women","Linen",86,wi(8),"Soft textured linen stitched suit with subtle print and embroidered details.",{isNew:true}),
  p("MTJ Khaddar Stitched Winter Suit 2026","MTJ","mtj","stitched","Women","Khaddar",105,wi(9),"Warm khaddar stitched 3-piece with heavy shawl. Winter 2026 collection.",{isNew:true,isBestSeller:true}),
  p("Saya Stitched Lawn Suit 2026","Saya","saya","stitched","Women","Lawn",68,wi(10),"Bright and cheerful lawn stitched suit for the everyday modern woman.",{isNew:true}),
  p("Saya Cambric Stitched 3-Piece 2026","Saya","saya","stitched","Women","Cambric",78,wi(11),"Soft cambric stitched 3-piece with digital print dupatta.",{isNew:true}),
  p("Nishat Linen Stitched Suit 2026","Nishat","nishat","stitched","Women","Linen",92,wi(12),"Premium linen stitched suit from Nishat 2026 premium collection.",{isNew:true,isBestSeller:true}),
  p("Nishat Printed Lawn Stitched 2026","Nishat","nishat","stitched","Women","Lawn",62,wi(13),"Floral printed lawn stitched suit — vibrant hues for everyday elegance.",{isNew:true}),
  p("Salina Stitched Karandi Suit 2026","Salina","salina","stitched","Women","Karandi",118,wi(14),"Rich karandi stitched suit with woven motifs and embellished dupatta.",{isNew:true}),
  p("Salina Stitched Organza 3-Piece 2026","Salina","salina","stitched","Women","Organza",135,wi(15),"Ethereal organza stitched 3-piece from Salina Luxury 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Pret Stitched Khaddar 2026","Khaadi","khaadi","stitched","Women","Khaddar",88,wi(16),"Cosy khaddar pret suit with embroidered patch pockets and side slits.",{isNew:true}),
  p("J. Formal Stitched Jacquard 2026","J. Junaid Jamshed","j-junaid-jamshed","stitched","Women","Jacquard",148,wi(17),"Elegant jacquard stitched formal suit for wedding events.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Cotton Net Stitched 2026","Bin Saeed","bin-saeed","stitched","Women","Cotton Net",128,wi(18),"Graceful cotton net stitched 3-piece with embroidered bodice.",{isNew:true}),
  p("Tawakkal Velvet Stitched Winter 2026","Tawakkal","tawakkal","stitched","Women","Velvet",165,wi(19),"Rich velvet stitched kurta paired with organza dupatta for winter festivities.",{isNew:true,isBestSeller:true}),
];

// ─── UNSTITCHED ───────────────────────────────────────────────────────────────

export const unstitchedProducts: BackendProduct[] = [
  p("Khaadi Unstitched Lawn 3-Piece 2026","Khaadi","khaadi","unstitched","Women","Lawn",55,wi(2),"Fresh lawn unstitched 3-piece — fabric for kurta, trouser, and dupatta.",{isNew:true,isBestSeller:true}),
  p("Khaadi Khaddar Unstitched 3-Piece 2026","Khaadi","khaadi","unstitched","Women","Khaddar",72,wi(3),"Warm khaddar unstitched 3-piece. Winter 2026.",{isNew:true}),
  p("J. Unstitched Lawn 2-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","unstitched","Women","Lawn",48,wi(4),"Classic printed lawn 2-piece unstitched — shirt and dupatta fabric.",{isNew:true}),
  p("J. Unstitched Embroidered Chiffon 2026","J. Junaid Jamshed","j-junaid-jamshed","unstitched","Women","Chiffon",118,wi(5),"Luxurious embroidered chiffon unstitched 3-piece from J. Luxury 2026.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Unstitched Lawn 3-Piece 2026","Bin Saeed","bin-saeed","unstitched","Women","Lawn",58,wi(6),"Vibrant digital printed lawn unstitched 3-piece.",{isNew:true}),
  p("Bin Saeed Unstitched Karandi 2026","Bin Saeed","bin-saeed","unstitched","Women","Karandi",95,wi(7),"Rich karandi unstitched with woven self-design. Perfect for winter tailoring.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Unstitched Cambric 3-Piece 2026","Tawakkal","tawakkal","unstitched","Women","Cambric",65,wi(8),"Soft cambric unstitched 3-piece with digital print and embroidered patch.",{isNew:true}),
  p("Tawakkal Unstitched Velvet 2-Piece 2026","Tawakkal","tawakkal","unstitched","Women","Velvet",145,wi(9),"Luxe velvet unstitched 2-piece from Tawakkal Winter Luxe 2026.",{isNew:true,isBestSeller:true}),
  p("MTJ Unstitched Linen 3-Piece 2026","MTJ","mtj","unstitched","Women","Linen",68,wi(10),"Lightweight linen unstitched 3-piece for easy tailoring.",{isNew:true}),
  p("MTJ Unstitched Jacquard 2-Piece 2026","MTJ","mtj","unstitched","Women","Jacquard",112,wi(11),"Premium jacquard unstitched 2-piece for formal occasions.",{isNew:true,isBestSeller:true}),
  p("Saya Unstitched Lawn 3-Piece 2026","Saya","saya","unstitched","Women","Lawn",52,wi(12),"Cheerful floral lawn unstitched 3-piece. Easy tailoring.",{isNew:true}),
  p("Saya Unstitched Khaddar 2026","Saya","saya","unstitched","Women","Khaddar",78,wi(13),"Cosy khaddar unstitched 3-piece for winter tailoring.",{isNew:true}),
  p("Nishat Unstitched Lawn 3-Piece 2026","Nishat","nishat","unstitched","Women","Lawn",62,wi(14),"Nishat's iconic printed lawn unstitched 3-piece 2026.",{isNew:true,isBestSeller:true}),
  p("Nishat Unstitched Karandi Shawl 2026","Nishat","nishat","unstitched","Women","Karandi",108,wi(15),"Nishat Karandi with premium shawl — unstitched 3-piece.",{isNew:true}),
  p("Salina Unstitched Chiffon 3-Piece 2026","Salina","salina","unstitched","Women","Chiffon",128,wi(16),"Elegant chiffon unstitched 3-piece. Lightweight and flowy.",{isNew:true,isBestSeller:true}),
  p("Salina Unstitched Net 2-Piece 2026","Salina","salina","unstitched","Women","Net",142,wi(17),"Intricate net unstitched 2-piece for formal events.",{isNew:true}),
  p("Khaadi Cotton Unstitched 2026","Khaadi","khaadi","unstitched","Women","Cotton",44,wi(18),"Breathable cotton unstitched 2-piece for easy everyday stitching.",{isNew:true}),
  p("J. Linen Unstitched 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","unstitched","Women","Linen",72,wi(19),"Soft linen unstitched 3-piece with thread-work detailing.",{isNew:true}),
  p("Bin Saeed Silk Blend Unstitched 2026","Bin Saeed","bin-saeed","unstitched","Women","Silk Blend",155,wi(0),"Opulent silk blend unstitched 2-piece from Bin Saeed Luxury 2026.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Georgette Unstitched 3-Piece 2026","Tawakkal","tawakkal","unstitched","Women","Georgette",98,wi(1),"Flowing georgette unstitched 3-piece with embroidered borders.",{isNew:true}),
];

// ─── EMBROIDERED ─────────────────────────────────────────────────────────────

export const embroideredProducts: BackendProduct[] = [
  p("Khaadi Embroidered Chiffon Suit 2026","Khaadi","khaadi","embroidered","Women","Chiffon",145,wi(0),"Intricate hand-embroidered chiffon suit — signature Khaadi craftsmanship.",{isNew:true,isBestSeller:true}),
  p("Khaadi Embroidered Lawn Kurta 2026","Khaadi","khaadi","embroidered","Women","Lawn",88,wi(1),"Floral embroidered lawn kurta with mirror-work collar detailing.",{isNew:true}),
  p("J. Embroidered Net 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","embroidered","Women","Net",198,wi(2),"Heavily embroidered net 3-piece. Perfect for weddings and formal events.",{isNew:true,isBestSeller:true}),
  p("J. Embroidered Khaddar Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","embroidered","Women","Khaddar",112,wi(3),"Thread-embroidered khaddar suit with wool shawl for winter.",{isNew:true}),
  p("Bin Saeed Embroidered Organza 2026","Bin Saeed","bin-saeed","embroidered","Women","Organza",225,wi(4),"Royal organza 3-piece with resham and zardozi embroidery.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Embroidered Silk 2-Piece 2026","Bin Saeed","bin-saeed","embroidered","Women","Silk",185,wi(5),"Pure silk 2-piece with delicate embroidered borders.",{isNew:true}),
  p("Tawakkal Embroidered Velvet Suit 2026","Tawakkal","tawakkal","embroidered","Women","Velvet",172,wi(6),"Luxurious velvet with heavy embroidery and sequin accents.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Embroidered Georgette 2026","Tawakkal","tawakkal","embroidered","Women","Georgette",138,wi(7),"Flowing georgette with fine embroidered neckline and cuffs.",{isNew:true}),
  p("MTJ Embroidered Lawn 3-Piece 2026","MTJ","mtj","embroidered","Women","Lawn",95,wi(8),"Beautiful lawn 3-piece with contrast embroidered patch on kurta.",{isNew:true,isBestSeller:true}),
  p("MTJ Embroidered Cotton Net 2026","MTJ","mtj","embroidered","Women","Cotton Net",158,wi(9),"Delicate cotton net with trellis embroidery from MTJ Luxury.",{isNew:true}),
  p("Saya Embroidered Lawn Suit 2026","Saya","saya","embroidered","Women","Lawn",78,wi(10),"Contemporary floral embroidery on crisp lawn fabric.",{isNew:true}),
  p("Saya Embroidered Jacquard 2-Piece 2026","Saya","saya","embroidered","Women","Jacquard",142,wi(11),"Jacquard 2-piece with resham embroidery on neckline and hem.",{isNew:true,isBestSeller:true}),
  p("Nishat Embroidered Lawn 3-Piece 2026","Nishat","nishat","embroidered","Women","Lawn",105,wi(12),"Nishat's signature embroidered lawn — intricate threadwork throughout.",{isNew:true,isBestSeller:true}),
  p("Nishat Embroidered Chiffon Suit 2026","Nishat","nishat","embroidered","Women","Chiffon",165,wi(13),"Semi-formal chiffon with embroidered motifs from Nishat Luxury.",{isNew:true}),
  p("Salina Embroidered Net 3-Piece 2026","Salina","salina","embroidered","Women","Net",235,wi(14),"Grand embroidered net 3-piece from Salina Bridal Pret 2026.",{isNew:true,isBestSeller:true}),
  p("Salina Embroidered Raw Silk 2026","Salina","salina","embroidered","Women","Raw Silk",195,wi(15),"Raw silk 2-piece with zardozi and dabka hand embroidery.",{isNew:true}),
  p("Khaadi Embroidered Karandi Suit 2026","Khaadi","khaadi","embroidered","Women","Karandi",118,wi(16),"Winter karandi with bold embroidered yoke and hemline.",{isNew:true}),
  p("J. Bridal Embroidered Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","embroidered","Women","Raw Silk",285,wi(17),"Statement bridal embroidered 3-piece from J. Wedding Edit 2026.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Embroidered Khaddar 2026","Bin Saeed","bin-saeed","embroidered","Women","Khaddar",108,wi(18),"Rich khaddar with hand-guided machine embroidery for winter.",{isNew:true}),
  p("Tawakkal Embroidered Chiffon Lawn 2026","Tawakkal","tawakkal","embroidered","Women","Chiffon",148,wi(19),"Chiffon-on-lawn embroidered 3-piece for festive occasions.",{isNew:true,isBestSeller:true}),
];

// ─── PRINTED ─────────────────────────────────────────────────────────────────

export const printedProducts: BackendProduct[] = [
  p("Khaadi Printed Lawn 3-Piece 2026","Khaadi","khaadi","printed","Women","Lawn",55,wi(4),"Bold digital floral print lawn 3-piece — Khaadi Summer 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Printed Cambric Suit 2026","Khaadi","khaadi","printed","Women","Cambric",62,wi(5),"Geometric printed cambric 2-piece for everyday casual wear.",{isNew:true}),
  p("J. Printed Lawn 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","printed","Women","Lawn",58,wi(6),"J. Pret printed lawn 3-piece with screen-printed dupatta.",{isNew:true,isBestSeller:true}),
  p("J. Printed Cotton Kurta 2026","J. Junaid Jamshed","j-junaid-jamshed","printed","Women","Cotton",45,wi(7),"Breathable cotton printed kurta for casual daily wear.",{isNew:true}),
  p("Bin Saeed Printed Lawn 2026","Bin Saeed","bin-saeed","printed","Women","Lawn",52,wi(8),"Soft digital printed lawn 3-piece from Bin Saeed Summer 2026.",{isNew:true}),
  p("Bin Saeed Printed Karandi 2026","Bin Saeed","bin-saeed","printed","Women","Karandi",82,wi(9),"Abstract printed karandi suit for winter — rich and warm.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Printed Lawn 3-Piece 2026","Tawakkal","tawakkal","printed","Women","Lawn",58,wi(10),"Vibrant tropical print lawn 3-piece from Tawakkal Summer.",{isNew:true}),
  p("Tawakkal Printed Linen Suit 2026","Tawakkal","tawakkal","printed","Women","Linen",72,wi(11),"Textured linen with all-over abstract print — autumn ready.",{isNew:true}),
  p("MTJ Printed Lawn 2026","MTJ","mtj","printed","Women","Lawn",48,wi(12),"MTJ floral printed lawn 3-piece — light, breezy, and stylish.",{isNew:true,isBestSeller:true}),
  p("MTJ Printed Khaddar 2026","MTJ","mtj","printed","Women","Khaddar",78,wi(13),"Block printed khaddar 3-piece for winter everyday wear.",{isNew:true}),
  p("Saya Printed Lawn Suit 2026","Saya","saya","printed","Women","Lawn",46,wi(14),"Bright paisley printed lawn 3-piece — fresh summer colours.",{isNew:true}),
  p("Saya Printed Silk Kurta 2026","Saya","saya","printed","Women","Silk",95,wi(15),"Soft silk printed kurta with floral motifs in rich pastels.",{isNew:true,isBestSeller:true}),
  p("Nishat Printed Lawn 3-Piece 2026","Nishat","nishat","printed","Women","Lawn",60,wi(16),"Nishat classic printed lawn 3-piece. Summer Luxe 2026.",{isNew:true,isBestSeller:true}),
  p("Nishat Printed Cotton Suit 2026","Nishat","nishat","printed","Women","Cotton",52,wi(17),"All-over geometric print cotton suit for casual days.",{isNew:true}),
  p("Salina Printed Chiffon 2026","Salina","salina","printed","Women","Chiffon",88,wi(18),"Lightweight chiffon with delicate printed border and dupatta.",{isNew:true,isBestSeller:true}),
  p("Salina Printed Khaddar Suit 2026","Salina","salina","printed","Women","Khaddar",85,wi(19),"Salina winter printed khaddar — warm tones and traditional motifs.",{isNew:true}),
  p("Khaadi Digital Print Cotton 2026","Khaadi","khaadi","printed","Women","Cotton",42,wi(0),"Fine cotton with bold digital print. Easy and comfortable fit.",{isNew:true}),
  p("J. Screen Printed Lawn 2026","J. Junaid Jamshed","j-junaid-jamshed","printed","Women","Lawn",56,wi(1),"Screen-printed lawn single piece — modern floral in summer tones.",{isNew:true}),
  p("Bin Saeed Printed Silk Blend 2026","Bin Saeed","bin-saeed","printed","Women","Silk Blend",112,wi(2),"Silk blend with dupatta print from Bin Saeed Festive 2026.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Ajrak Printed Lawn 2026","Tawakkal","tawakkal","printed","Women","Lawn",54,wi(3),"Heritage ajrak block print on premium lawn fabric.",{isNew:true}),
];

// ─── FORMAL / LUXURY ─────────────────────────────────────────────────────────

export const formalProducts: BackendProduct[] = [
  p("Khaadi Formal Embroidered Chiffon 2026","Khaadi","khaadi","formal","Women","Chiffon",175,wi(0),"Exquisite embroidered chiffon formal 3-piece. Khaadi Luxe 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Formal Velvet Suit 2026","Khaadi","khaadi","formal","Women","Velvet",195,wi(1),"Rich velvet formal suit with hand-crafted embroidery.",{isNew:true}),
  p("J. Formal Net Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","formal","Women","Net",215,wi(2),"J. Formal Collection — embroidered net 3-piece for weddings.",{isNew:true,isBestSeller:true}),
  p("J. Luxury Silk Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","formal","Women","Silk",248,wi(3),"Pure silk formal suit with dabka embroidery from J. Luxury.",{isNew:true}),
  p("Bin Saeed Formal Raw Silk 2026","Bin Saeed","bin-saeed","formal","Women","Raw Silk",228,wi(4),"Raw silk formal 2-piece with resham thread work.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Luxury Organza 3-Piece 2026","Bin Saeed","bin-saeed","formal","Women","Organza",265,wi(5),"Grand organza 3-piece from Bin Saeed Bridal Pret 2026.",{isNew:true}),
  p("Tawakkal Formal Jacquard Suit 2026","Tawakkal","tawakkal","formal","Women","Jacquard",185,wi(6),"Woven jacquard formal suit with embroidered border.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Luxury Velvet 3-Piece 2026","Tawakkal","tawakkal","formal","Women","Velvet",218,wi(7),"Opulent velvet formal 3-piece with gold thread embroidery.",{isNew:true}),
  p("MTJ Formal Net Suit 2026","MTJ","mtj","formal","Women","Net",178,wi(8),"Delicate net formal 3-piece with intricate thread embroidery.",{isNew:true,isBestSeller:true}),
  p("MTJ Luxury Silk Blend 2026","MTJ","mtj","formal","Women","Silk Blend",198,wi(9),"Silk blend formal suit from MTJ Premium 2026.",{isNew:true}),
  p("Saya Formal Embroidered Net 2026","Saya","saya","formal","Women","Net",188,wi(10),"Statement embroidered net formal 3-piece for festive evenings.",{isNew:true,isBestSeller:true}),
  p("Saya Luxury Organza 2026","Saya","saya","formal","Women","Organza",245,wi(11),"Lightweight organza with zardozi work — Saya Bridal Pret 2026.",{isNew:true}),
  p("Nishat Formal Embroidered Lawn 2026","Nishat","nishat","formal","Women","Lawn",142,wi(12),"Nishat's semi-formal heavily embroidered lawn. Event-ready.",{isNew:true,isBestSeller:true}),
  p("Nishat Luxury Karandi 3-Piece 2026","Nishat","nishat","formal","Women","Karandi",165,wi(13),"Premium karandi formal 3-piece with embroidered yoke.",{isNew:true}),
  p("Salina Bridal Pret Suit 2026","Salina","salina","formal","Women","Raw Silk",295,wi(14),"Grand bridal pret raw silk suit from Salina Bridal Couture.",{isNew:true,isBestSeller:true}),
  p("Salina Luxury Chiffon 3-Piece 2026","Salina","salina","formal","Women","Chiffon",235,wi(15),"Flowing chiffon formal 3-piece with hand-crafted embroidery.",{isNew:true}),
  p("Khaadi Luxury Velvet 2-Piece 2026","Khaadi","khaadi","formal","Women","Velvet",212,wi(16),"Deep velvet 2-piece with gold and silver embroidery.",{isNew:true}),
  p("J. Wedding Embroidered Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","formal","Women","Net",268,wi(17),"J. Wedding Edit — embroidered net 3-piece in ivory and gold.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Luxury Jacquard 2026","Bin Saeed","bin-saeed","formal","Women","Jacquard",175,wi(18),"Rich jacquard formal suit with contrast embroidered dupatta.",{isNew:true}),
  p("Tawakkal Bridal Net 3-Piece 2026","Tawakkal","tawakkal","formal","Women","Net",258,wi(19),"Heavy embroidered bridal net 3-piece — grandeur redefined.",{isNew:true,isBestSeller:true}),
];

// ─── LAWN ─────────────────────────────────────────────────────────────────────

export const lawnProducts: BackendProduct[] = [
  p("Khaadi Summer Lawn 3-Piece 2026","Khaadi","khaadi","lawn","Women","Lawn",55,wi(3),"Fresh floral lawn 3-piece — signature Khaadi Summer 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Embroidered Lawn 3-Piece 2026","Khaadi","khaadi","lawn","Women","Lawn",78,wi(4),"Embroidered lawn 3-piece with screen-print chiffon dupatta.",{isNew:true}),
  p("J. Lawn Premium 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","lawn","Women","Lawn",62,wi(5),"J. Pret lawn with exquisite embroidered patch and chiffon dupatta.",{isNew:true,isBestSeller:true}),
  p("J. Lawn 2-Piece Printed 2026","J. Junaid Jamshed","j-junaid-jamshed","lawn","Women","Lawn",46,wi(6),"Digital printed lawn 2-piece — shirt and printed dupatta.",{isNew:true}),
  p("Bin Saeed Lawn 3-Piece 2026","Bin Saeed","bin-saeed","lawn","Women","Lawn",58,wi(7),"Vibrant printed lawn 3-piece from Bin Saeed Summer 2026.",{isNew:true}),
  p("Bin Saeed Embroidered Lawn 2026","Bin Saeed","bin-saeed","lawn","Women","Lawn",88,wi(8),"Premium embroidered lawn 3-piece with tissue dupatta.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Lawn Floral 3-Piece 2026","Tawakkal","tawakkal","lawn","Women","Lawn",52,wi(9),"Tropical floral printed lawn — Tawakkal Summer 2026.",{isNew:true}),
  p("Tawakkal Embroidered Lawn 2026","Tawakkal","tawakkal","lawn","Women","Lawn",75,wi(10),"Embroidered neckline lawn 3-piece from Tawakkal.",{isNew:true}),
  p("MTJ Lawn 3-Piece 2026","MTJ","mtj","lawn","Women","Lawn",48,wi(11),"Light and breezy MTJ printed lawn 3-piece. Summer staple.",{isNew:true,isBestSeller:true}),
  p("MTJ Embroidered Lawn Suit 2026","MTJ","mtj","lawn","Women","Lawn",82,wi(12),"Embroidered corner patch lawn 3-piece — MTJ Summer Luxe.",{isNew:true}),
  p("Saya Lawn Printed 3-Piece 2026","Saya","saya","lawn","Women","Lawn",46,wi(13),"Bright and cheerful printed lawn. Saya Summer 2026.",{isNew:true}),
  p("Saya Embroidered Lawn 2026","Saya","saya","lawn","Women","Lawn",72,wi(14),"Saya embroidered lawn — intricate neckline work.",{isNew:true,isBestSeller:true}),
  p("Nishat Lawn 3-Piece 2026","Nishat","nishat","lawn","Women","Lawn",60,wi(15),"Nishat iconic floral lawn 3-piece. Summer Luxe 2026.",{isNew:true,isBestSeller:true}),
  p("Nishat Embroidered Lawn 2026","Nishat","nishat","lawn","Women","Lawn",92,wi(16),"Nishat heavily embroidered premium lawn 3-piece.",{isNew:true}),
  p("Salina Lawn 3-Piece 2026","Salina","salina","lawn","Women","Lawn",56,wi(17),"Contemporary digital print lawn from Salina Summer 2026.",{isNew:true,isBestSeller:true}),
  p("Salina Embroidered Lawn 2026","Salina","salina","lawn","Women","Lawn",82,wi(18),"Salina hand-embroidered lawn with organza dupatta.",{isNew:true}),
  p("Khaadi Lawn Single Piece 2026","Khaadi","khaadi","lawn","Women","Lawn",38,wi(19),"Single piece printed lawn kurta — casual everyday wear.",{isNew:true}),
  p("J. Classic Lawn 2026","J. Junaid Jamshed","j-junaid-jamshed","lawn","Women","Lawn",55,wi(0),"J. heritage floral print on premium lawn fabric.",{isNew:true}),
  p("Bin Saeed Digital Lawn 2026","Bin Saeed","bin-saeed","lawn","Women","Lawn",50,wi(1),"All-over digital print premium lawn 3-piece.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Geo Print Lawn 2026","Tawakkal","tawakkal","lawn","Women","Lawn",54,wi(2),"Geometric digital print lawn 3-piece — modern and fresh.",{isNew:true}),
];

// ─── MEN ─────────────────────────────────────────────────────────────────────

export const menProducts: BackendProduct[] = [
  p("Khaadi Men Stitched Kurta 2026","Khaadi","khaadi","men","Men","Lawn",65,mi(0),"Relaxed fit printed lawn kurta — Khaadi Men Summer 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Men Unstitched Shalwar Kameez 2026","Khaadi","khaadi","men","Men","Lawn",45,mi(1),"Printed lawn fabric set for men — unstitched for custom tailoring.",{isNew:true}),
  p("J. Men Formal Shalwar Kameez 2026","J. Junaid Jamshed","j-junaid-jamshed","men","Men","Linen",88,mi(2),"J. Men Formal — premium linen stitched shalwar kameez.",{isNew:true,isBestSeller:true}),
  p("J. Men Embroidered Kurta 2026","J. Junaid Jamshed","j-junaid-jamshed","men","Men","Cotton",72,mi(3),"Embroidered cotton kurta for festive occasions.",{isNew:true}),
  p("Bin Saeed Men Wash&Wear 2026","Bin Saeed","bin-saeed","men","Men","Wash & Wear",58,mi(4),"Classic wash & wear shalwar kameez — formal and comfortable.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Men Khaddar Suit 2026","Bin Saeed","bin-saeed","men","Men","Khaddar",92,mi(5),"Warm khaddar shalwar kameez — Bin Saeed Men Winter 2026.",{isNew:true}),
  p("Tawakkal Men Jacquard Waistcoat Set 2026","Tawakkal","tawakkal","men","Men","Jacquard",128,mi(6),"3-piece waistcoat set with jacquard fabric — formal celebrations.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Men Linen Kurta 2026","Tawakkal","tawakkal","men","Men","Linen",62,mi(7),"Lightweight linen stitched kurta — perfect for summer.",{isNew:true}),
  p("MTJ Men Shalwar Kameez 2026","MTJ","mtj","men","Men","Blended",55,mi(8),"MTJ signature blended fabric shalwar kameez. Everyday elegance.",{isNew:true,isBestSeller:true}),
  p("MTJ Men Embroidered Kurta 2026","MTJ","mtj","men","Men","Cotton",68,mi(9),"Embroidered collar and cuffs cotton kurta for celebrations.",{isNew:true}),
  p("Saya Men Classic Shalwar Kameez 2026","Saya","saya","men","Men","Lawn",48,mi(0),"Fresh Saya lawn shalwar kameez for everyday wear.",{isNew:true}),
  p("Saya Men Khaddar Suit 2026","Saya","saya","men","Men","Khaddar",85,mi(1),"Rich khaddar stitched suit — Saya Men Winter 2026.",{isNew:true,isBestSeller:true}),
  p("Nishat Men Linen Kurta 2026","Nishat","nishat","men","Men","Linen",72,mi(2),"Nishat Men premium linen kurta with embroidered neckline.",{isNew:true,isBestSeller:true}),
  p("Nishat Men Wash&Wear 2026","Nishat","nishat","men","Men","Wash & Wear",62,mi(3),"Nishat classic wash & wear shalwar kameez — timeless.",{isNew:true}),
  p("Salina Men Sherwani Set 2026","Salina","salina","men","Men","Silk Blend",185,mi(4),"Grand silk blend sherwani set for weddings — Salina Men.",{isNew:true,isBestSeller:true}),
  p("Salina Men Embroidered Waistcoat 2026","Salina","salina","men","Men","Blended",95,mi(5),"Embroidered waistcoat shalwar kameez set for formal events.",{isNew:true}),
  p("Khaadi Men Pret Kurta 2026","Khaadi","khaadi","men","Men","Cotton",52,mi(6),"Solid cotton kurta — Khaadi Men Pret 2026 essentials.",{isNew:true}),
  p("J. Men Formal Waistcoat 2026","J. Junaid Jamshed","j-junaid-jamshed","men","Men","Blended",115,mi(7),"3-piece formal waistcoat set — J. Men Luxury 2026.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Men Lawn Kurta 2026","Bin Saeed","bin-saeed","men","Men","Lawn",45,mi(8),"Printed lawn stitched kurta — light and breathable.",{isNew:true}),
  p("Tawakkal Men Velvet Sherwani 2026","Tawakkal","tawakkal","men","Men","Velvet",198,mi(9),"Luxurious velvet sherwani for baraat and formal occasions.",{isNew:true,isBestSeller:true}),
];

// ─── WOMEN (general) ─────────────────────────────────────────────────────────

export const womenProducts: BackendProduct[] = [
  ...stitchedProducts.slice(0,6),
  ...unstitchedProducts.slice(0,4),
  ...embroideredProducts.slice(0,4),
  ...printedProducts.slice(0,4),
  ...formalProducts.slice(0,2),
];

// ─── KIDS ─────────────────────────────────────────────────────────────────────

export const kidsProducts: BackendProduct[] = [
  p("Khaadi Kids Printed Frock 2026","Khaadi","khaadi","kids","Kids","Lawn",32,ki(0),"Bright floral printed lawn frock — Khaadi Kids 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Kids Kurta Pajama Set 2026","Khaadi","khaadi","kids","Kids","Cotton",38,ki(1),"Soft cotton kurta pajama set for boys. Everyday comfort.",{isNew:true}),
  p("J. Kids Embroidered Frock 2026","J. Junaid Jamshed","j-junaid-jamshed","kids","Kids","Lawn",42,ki(2),"Festive embroidered lawn frock for girls.",{isNew:true,isBestSeller:true}),
  p("J. Kids Shalwar Kameez 2026","J. Junaid Jamshed","j-junaid-jamshed","kids","Kids","Cotton",35,ki(3),"Classic cotton kurta shalwar for boys — smart and comfortable.",{isNew:true}),
  p("Bin Saeed Kids Lawn Suit 2026","Bin Saeed","bin-saeed","kids","Kids","Lawn",30,ki(4),"Printed lawn suit for girls — bright colours for festive days.",{isNew:true}),
  p("Bin Saeed Kids Waistcoat Set 2026","Bin Saeed","bin-saeed","kids","Kids","Blended",48,ki(5),"3-piece waistcoat shalwar kameez for boys — special occasions.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Kids Embroidered Frock 2026","Tawakkal","tawakkal","kids","Kids","Chiffon",55,ki(0),"Embroidered chiffon frock for girls — wedding season.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Kids Casual Kurta 2026","Tawakkal","tawakkal","kids","Kids","Cotton",28,ki(1),"Casual printed cotton kurta for boys. Everyday wear.",{isNew:true}),
  p("MTJ Kids Cotton Frock 2026","MTJ","mtj","kids","Kids","Cotton",26,ki(2),"Soft cotton printed frock for girls.",{isNew:true}),
  p("MTJ Kids Eid Suit 2026","MTJ","mtj","kids","Kids","Lawn",44,ki(3),"Eid special embroidered kurta shalwar — boys edition.",{isNew:true,isBestSeller:true}),
  p("Saya Kids Frilled Frock 2026","Saya","saya","kids","Kids","Net",58,ki(4),"Frilled net frock for girls — weddings and parties.",{isNew:true}),
  p("Saya Kids Printed Suit 2026","Saya","saya","kids","Kids","Lawn",32,ki(5),"Bright printed lawn suit for everyday casual wear.",{isNew:true}),
  p("Nishat Kids Embroidered Suit 2026","Nishat","nishat","kids","Kids","Lawn",48,ki(0),"Nishat kids embroidered lawn suit for festive occasions.",{isNew:true,isBestSeller:true}),
  p("Nishat Kids Casual Kurta 2026","Nishat","nishat","kids","Kids","Cotton",25,ki(1),"Simple cotton printed kurta — school and play.",{isNew:true}),
  p("Salina Kids Bridal Frock 2026","Salina","salina","kids","Kids","Net",72,ki(2),"Grand embroidered bridal frock for girls — Salina Kids.",{isNew:true,isBestSeller:true}),
  p("Salina Kids Cotton Shalwar Kameez 2026","Salina","salina","kids","Kids","Cotton",34,ki(3),"Classic white cotton shalwar kameez for boys.",{isNew:true}),
  p("Khaadi Boys Pret Kurta 2026","Khaadi","khaadi","kids","Kids","Cotton",30,ki(4),"Khaadi pret printed kurta for boys. Light and comfortable.",{isNew:true}),
  p("J. Girls Lawn Suit 2026","J. Junaid Jamshed","j-junaid-jamshed","kids","Kids","Lawn",36,ki(5),"Floral printed lawn suit for girls — J. Kids 2026.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Girls Embroidered Suit 2026","Bin Saeed","bin-saeed","kids","Kids","Chiffon",62,ki(0),"Embroidered chiffon 2-piece for girls — special events.",{isNew:true}),
  p("Tawakkal Boys Khaddar Suit 2026","Tawakkal","tawakkal","kids","Kids","Khaddar",42,ki(1),"Warm khaddar shalwar kameez for boys. Winter 2026.",{isNew:true}),
];

// ─── KHADDAR (winter) ─────────────────────────────────────────────────────────

export const khaddarProducts: BackendProduct[] = [
  p("Khaadi Khaddar Suit 3-Piece 2026","Khaadi","khaadi","khaddar","Women","Khaddar",88,wi(6),"Cosy khaddar 3-piece with printed shawl. Khaadi Winter 2026.",{isNew:true,isBestSeller:true}),
  p("Khaadi Khaddar Embroidered 2026","Khaadi","khaadi","khaddar","Women","Khaddar",108,wi(7),"Heavy embroidered khaddar suit with wool shawl.",{isNew:true}),
  p("J. Khaddar 3-Piece 2026","J. Junaid Jamshed","j-junaid-jamshed","khaddar","Women","Khaddar",92,wi(8),"J. classic printed khaddar 3-piece — winter warmth.",{isNew:true,isBestSeller:true}),
  p("J. Embroidered Khaddar 2026","J. Junaid Jamshed","j-junaid-jamshed","khaddar","Women","Khaddar",118,wi(9),"Embroidered khaddar with wool shawl. J. Winter Luxe.",{isNew:true}),
  p("Bin Saeed Khaddar Suit 2026","Bin Saeed","bin-saeed","khaddar","Women","Khaddar",85,wi(10),"Bin Saeed printed khaddar 3-piece with warm dupatta.",{isNew:true}),
  p("Bin Saeed Embroidered Khaddar 2026","Bin Saeed","bin-saeed","khaddar","Women","Khaddar",105,wi(11),"Rich embroidered khaddar with shawl — Bin Saeed Winter.",{isNew:true,isBestSeller:true}),
  p("Tawakkal Khaddar 3-Piece 2026","Tawakkal","tawakkal","khaddar","Women","Khaddar",78,wi(12),"Traditional printed khaddar suit for cosy winter days.",{isNew:true}),
  p("Tawakkal Embroidered Khaddar 2026","Tawakkal","tawakkal","khaddar","Women","Khaddar",112,wi(13),"Embroidered khaddar 3-piece with wool shawl.",{isNew:true,isBestSeller:true}),
  p("MTJ Khaddar Suit 2026","MTJ","mtj","khaddar","Women","Khaddar",75,wi(14),"Soft MTJ khaddar with digital print. Winter 2026.",{isNew:true}),
  p("MTJ Embroidered Khaddar 2026","MTJ","mtj","khaddar","Women","Khaddar",98,wi(15),"MTJ embroidered khaddar 3-piece — heritage winter collection.",{isNew:true}),
  p("Saya Khaddar Winter Suit 2026","Saya","saya","khaddar","Women","Khaddar",72,wi(16),"Saya warm khaddar 3-piece in rich autumn tones.",{isNew:true,isBestSeller:true}),
  p("Saya Embroidered Khaddar 2026","Saya","saya","khaddar","Women","Khaddar",95,wi(17),"Embroidered khaddar with dupatta — Saya Winter Pret.",{isNew:true}),
  p("Nishat Khaddar 3-Piece 2026","Nishat","nishat","khaddar","Women","Khaddar",88,wi(18),"Nishat iconic khaddar 3-piece. Winter Luxe 2026.",{isNew:true,isBestSeller:true}),
  p("Nishat Embroidered Khaddar 2026","Nishat","nishat","khaddar","Women","Khaddar",118,wi(19),"Nishat heavily embroidered khaddar with wool shawl.",{isNew:true}),
  p("Salina Velvet Khaddar Suit 2026","Salina","salina","khaddar","Women","Khaddar",142,wi(0),"Velvet panel khaddar suit — Salina Winter Luxury.",{isNew:true,isBestSeller:true}),
  p("Salina Khaddar Embroidered 2026","Salina","salina","khaddar","Women","Khaddar",128,wi(1),"Salina hand-embroidered khaddar 3-piece with pashmina shawl.",{isNew:true}),
  p("Khaadi Karandi Suit 2026","Khaadi","khaadi","khaddar","Women","Karandi",95,wi(2),"Premium karandi 3-piece — warm and luxurious.",{isNew:true}),
  p("J. Karandi Winter 2026","J. Junaid Jamshed","j-junaid-jamshed","khaddar","Women","Karandi",108,wi(3),"Woven karandi with lace border — J. Winter Premium.",{isNew:true,isBestSeller:true}),
  p("Bin Saeed Velvet Khaddar 2026","Bin Saeed","bin-saeed","khaddar","Women","Velvet",155,wi(4),"Velvet khaddar formal winter suit — Bin Saeed Luxe.",{isNew:true}),
  p("Tawakkal Linen Khaddar 2026","Tawakkal","tawakkal","khaddar","Women","Linen",82,wi(5),"Soft linen-khaddar blend 3-piece. Autumn-winter ready.",{isNew:true,isBestSeller:true}),
];

// ─── Master lookup ────────────────────────────────────────────────────────────

const catalogMap: Record<string, BackendProduct[]> = {
  stitched:       stitchedProducts,
  unstitched:     unstitchedProducts,
  embroidered:    embroideredProducts,
  printed:        printedProducts,
  formal:         formalProducts,
  luxury:         formalProducts,
  lawn:           lawnProducts,
  khaddar:        khaddarProducts,
  men:            menProducts,
  kids:           kidsProducts,
  women:          womenProducts,
  // sub-category aliases
  "ready-to-wear": stitchedProducts,
  jacquard:       formalProducts,
  bridal:         formalProducts,
  casual:         printedProducts,
  cotton:         printedProducts,
  chiffon:        embroideredProducts,
  chickenkar:     embroideredProducts,
  "men-formal":   menProducts,
  "shalwar-kameez": menProducts,
  sherwani:       menProducts,
  waistcoat:      menProducts,
  girls:          kidsProducts,
  boys:           kidsProducts,
  // brand slugs
  mtj:            menProducts,
  "bin-saeed":    unstitchedProducts,
  khaadi:         womenProducts,
  salina:         lawnProducts,
  nishat:         embroideredProducts,
  "j-junaid":     menProducts,
  sapphire:       womenProducts,
  tawakkal:       formalProducts,
};

/** Return local products for a slug, or [] if slug not covered. */
export function getLocalProducts(slug: string): BackendProduct[] {
  return catalogMap[slug] ?? [];
}
