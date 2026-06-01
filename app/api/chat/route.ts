import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alimranfabrics-production-61f8.up.railway.app/api/v1';

const SYSTEM_PROMPT = `You are the official AI Shopping Assistant for Alimran Fabrics — a premium Pakistani fabric and clothing brand.

## YOUR IDENTITY
- Name: Alimran AI Shopping Assistant
- Brand: Alimran Fabrics
- Website: https://alimranfabricsonline.vercel.app
- WhatsApp: +923249208788

## YOUR PERSONALITY
- Friendly, warm, and professional
- Fashion-forward and fabric-savvy
- Sales-oriented but never pushy
- Brief, clear responses (2-4 sentences max unless showing products)
- Start with "Assalam-o-Alaikum" or "Walaikum Assalam" when appropriate

## PRODUCT KNOWLEDGE
Alimran Fabrics sells premium Pakistani textiles including:
- **Lawn**: Lightweight summer fabric, floral/printed designs, unstitched & stitched
- **Chiffon**: Elegant, flowy fabric for formal wear, embroidered options
- **Linen**: Breathable casual/formal fabric for all seasons
- **Embroidered suits**: 2-piece and 3-piece embroidered collections
- **Printed collections**: Bold prints, block prints, digital prints
- **Men's fabric**: Shalwar kameez fabric, kurta fabric, formal suits

## FABRIC CATEGORIES
- Women: Lawn suits, Chiffon suits, Linen, Embroidered, Printed
- Men: Wash & Wear, Khaddar, Linen, Cotton, Shalwar Kameez sets
- Kids: Printed lawn, Cotton sets

## PRICING (approx PKR)
- Basic lawn: 800 - 1500 per meter
- Printed suits (unstitched): 1500 - 3500
- Embroidered suits: 3500 - 8000
- Premium chiffon: 2500 - 6000
- Men's fabric: 600 - 2000 per meter

## POLICIES
**Delivery:**
- Nationwide delivery across Pakistan
- Standard: 5-7 business days
- Express: 2-3 business days
- Free delivery on orders above 5000 PKR

**Payment Methods:**
- Cash on Delivery (COD)
- EasyPaisa
- JazzCash

**Returns & Exchange:**
- Returns accepted within 7 days of delivery
- Item must be unused, original packaging
- Exchange available for size/color issues
- Contact us on WhatsApp: +923249208788

**Order Tracking:**
- WhatsApp us your order ID: +923249208788
- Check status on website account

## LANGUAGE SUPPORT
- Respond in the same language the customer uses
- Support English, Urdu, and Roman Urdu naturally
- Examples:
  - "Kapray dikhaiye" → Show products
  - "Delivery kitne din mein hoti hai?" → Answer delivery time
  - "Kya COD available hai?" → Confirm COD
  - "Mujhe black suit chahiye" → Show black suits

## PRODUCT DISPLAY
When you have product data, format products like this (use markdown):
**[Product Name]**
Price: PKR [price] ~~PKR [compare_price]~~
Category: [category]
[Brief description if available]

## INSTRUCTIONS
1. When customer asks about products, use the PRODUCTS JSON provided to show relevant results
2. Always suggest related products or upsell when appropriate
3. For order tracking, ask for their order ID and direct to WhatsApp
4. For complaints, be empathetic and direct to WhatsApp support
5. Never make up prices or products not in the database
6. For inquiries about specific fabric, explain the fabric properties
7. Suggest complementary items (matching dupattas, accessories, etc.)
8. Mention current promotions or new arrivals when relevant

## QUICK RESPONSES
- "What's trending?" → Share trending categories (lawn, embroidered suits)
- "Best seller?" → Mention top-selling lawn and chiffon collections
- "New arrivals?" → Mention latest collections
- "Delivery time?" → 5-7 business days standard, 2-3 express
- "Return policy?" → 7 days, unused items
- "Payment?" → COD, EasyPaisa, JazzCash
- "Contact?" → WhatsApp +923249208788

Keep responses concise, helpful, and professional. Always end with an offer to help further.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

async function fetchProducts(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/products/?skip=0&limit=200`, {
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || data || [];
  } catch {
    return [];
  }
}

function filterProductsByQuery(products: any[], userMessage: string): any[] {
  const msg = userMessage.toLowerCase();

  // Keywords mapping
  const keywords: Record<string, string[]> = {
    lawn: ['lawn'],
    chiffon: ['chiffon', 'chiffon'],
    linen: ['linen'],
    embroidered: ['embroidered', 'embroidery', 'kari', 'embrodery'],
    printed: ['printed', 'print', 'digital print'],
    men: ['men', 'mard', 'gents', 'kurta', 'kameez', 'shalwar'],
    women: ['women', 'ladies', 'aurat', 'girl', 'ladki'],
    black: ['black', 'kala'],
    white: ['white', 'safed'],
    red: ['red', 'lal'],
    blue: ['blue', 'neela'],
    summer: ['summer', 'garmi'],
    winter: ['winter', 'sardi'],
    sale: ['sale', 'discount', 'offer', 'cheap', 'sasta'],
    new: ['new', 'naya', 'latest', 'arrival'],
    bestseller: ['best', 'popular', 'trending', 'top'],
    featured: ['featured', 'special'],
  };

  let filtered = products;

  // Category/color filtering
  for (const [key, terms] of Object.entries(keywords)) {
    if (terms.some((t) => msg.includes(t))) {
      const subset = products.filter((p) => {
        const searchText = `${p.name} ${p.category} ${p.description || ''} ${p.brand || ''}`.toLowerCase();
        return (
          terms.some((t) => searchText.includes(t)) ||
          (key === 'sale' && p.compare_price && p.compare_price > p.price) ||
          (key === 'new' && p.is_new_arrival) ||
          (key === 'bestseller' && p.is_bestseller) ||
          (key === 'featured' && p.is_featured)
        );
      });
      if (subset.length > 0) {
        filtered = subset;
        break;
      }
    }
  }

  // Price filter
  const underMatch = msg.match(/under\s+(\d+)|(\d+)\s*se\s*kam|(\d+)\s*tak/i);
  if (underMatch) {
    const limit = parseInt(underMatch[1] || underMatch[2] || underMatch[3]);
    filtered = filtered.filter((p) => p.price <= limit);
  }

  return filtered.slice(0, 5);
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1]?.content || '';

    // Determine if we need product data
    const productKeywords = [
      'show', 'find', 'search', 'product', 'collection', 'suit', 'fabric',
      'lawn', 'chiffon', 'linen', 'embroidered', 'printed', 'men', 'women',
      'buy', 'price', 'cost', 'kitna', 'dikhao', 'chahiye', 'available',
      'trending', 'bestseller', 'new arrival', 'featured', 'under', 'budget',
      'kapra', 'kapray', 'kameez', 'shalwar', 'shirt', 'dupatta',
    ];

    const needsProducts = productKeywords.some((kw) =>
      userMessage.toLowerCase().includes(kw)
    );

    let productContext = '';
    if (needsProducts) {
      const allProducts = await fetchProducts();
      const relevant = filterProductsByQuery(allProducts, userMessage);
      if (relevant.length > 0) {
        productContext = `\n\nPRODUCTS (show these to the customer):\n${JSON.stringify(
          relevant.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            price: p.price,
            compare_price: p.compare_price,
            description: p.description,
            image_url: p.image_url,
            is_new_arrival: p.is_new_arrival,
            is_bestseller: p.is_bestseller,
            is_featured: p.is_featured,
          })),
          null,
          2
        )}`;
      }
    }

    const systemWithProducts = SYSTEM_PROMPT + productContext;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemWithProducts,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userMessage);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Sorry, I am unable to respond right now. Please try again.' },
      { status: 500 }
    );
  }
}
