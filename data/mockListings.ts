/**
 * Mock listing data — replace with Supabase query:
 *   supabase.from('listings').select('*, seller:users(*)')
 *
 * The Listing type maps 1-to-1 with the planned `listings` table schema.
 */
import { Listing } from '../types/listing';

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Zara Linen Wrap Dress',
    description:
      'Beautiful linen wrap dress from Zara. Worn twice — in excellent condition. Perfect for brunches or casual evenings. Colour is off-white with subtle beige tones.',
    category: 'women',
    subcategory: 'Dresses',
    brand: 'Zara',
    size: 'S',
    condition: 'Like new',
    price: 120,
    emirate: 'Dubai',
    area: 'Jumeirah',
    photos: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    ],
    sellerId: 'u1',
    status: 'active',
    delivery: ['Buyer collects', 'To be agreed in chat'],
    createdAt: '2024-06-10T09:00:00Z',
    isFeatured: true,
  },
  {
    id: 'l2',
    title: 'Nike Air Force 1 White',
    description:
      'Classic Nike Air Force 1 in white. Size UK 8 / US 9. Worn a handful of times — still very clean. Minor sole scuffs visible in photos.',
    category: 'shoes',
    subcategory: 'Sneakers',
    brand: 'Nike',
    size: 'UK 8',
    condition: 'Good',
    price: 250,
    emirate: 'Abu Dhabi',
    area: 'Khalidiyah',
    photos: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    ],
    sellerId: 'u4',
    status: 'active',
    delivery: ['Buyer collects', 'Courier arranged by buyer'],
    createdAt: '2024-06-09T14:30:00Z',
  },
  {
    id: 'l3',
    title: 'Mango Oversized Blazer',
    description:
      'Mango tailored oversized blazer in camel. Never worn — removed tags after buying. Size M but fits oversized on S too. Structured shoulders.',
    category: 'women',
    subcategory: 'Outerwear',
    brand: 'Mango',
    size: 'M',
    condition: 'New without tags',
    price: 180,
    emirate: 'Dubai',
    area: 'Downtown',
    photos: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    ],
    sellerId: 'u1',
    status: 'active',
    delivery: ['Buyer collects', 'Seller can deliver'],
    createdAt: '2024-06-08T11:00:00Z',
    isFeatured: true,
  },
  {
    id: 'l4',
    title: 'Hand-embroidered Black Abaya',
    description:
      'Stunning black abaya with gold hand embroidery on the sleeves and hem. Lightweight crepe fabric — perfect for events and everyday modest dressing. Size fits 160–170cm.',
    category: 'modestwear',
    subcategory: 'Abayas',
    brand: 'Local boutique',
    size: 'One size',
    condition: 'Like new',
    price: 300,
    emirate: 'Sharjah',
    area: 'Al Nahda',
    photos: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
      'https://images.unsplash.com/photo-1608731267464-c0c889c2ff92?w=600&q=80',
    ],
    sellerId: 'u3',
    status: 'active',
    delivery: ['Buyer collects', 'To be agreed in chat'],
    createdAt: '2024-06-07T16:45:00Z',
    isFeatured: true,
  },
  {
    id: 'l5',
    title: 'Coach Tabby Shoulder Bag — Tan',
    description:
      'Coach Tabby 26 in tan pebbled leather. Comes with dust bag and original box. Purchased from Coach boutique in Dubai Mall. Minor wear on the base corners.',
    category: 'bags',
    subcategory: 'Shoulder bags',
    brand: 'Coach',
    size: 'One size',
    condition: 'Good',
    price: 650,
    emirate: 'Dubai',
    area: 'Business Bay',
    photos: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    sellerId: 'u1',
    status: 'reserved',
    delivery: ['Buyer collects'],
    createdAt: '2024-06-06T10:00:00Z',
  },
  {
    id: 'l6',
    title: 'Embellished Evening Dress — Emerald',
    description:
      'Stunning floor-length gown in emerald green with crystal bodice embellishment. Purchased for a wedding, worn once. Brand is a Dubai-based designer. Size 36 (EU).',
    category: 'occasionwear',
    subcategory: 'Evening dresses',
    brand: 'REEM Boutique',
    size: 'EU 36',
    condition: 'New with tags',
    price: 450,
    emirate: 'Abu Dhabi',
    area: 'Al Reem Island',
    photos: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    ],
    sellerId: 'u2',
    status: 'active',
    delivery: ['Buyer collects', 'Courier arranged by buyer'],
    createdAt: '2024-06-05T13:00:00Z',
    isFeatured: true,
  },
  {
    id: 'l7',
    title: 'Massimo Dutti Slim Chinos',
    description:
      'Massimo Dutti slim-fit chinos in dark navy. Size 32/32. Worn a few times — great condition. Classic wardrobe staple.',
    category: 'men',
    subcategory: 'Trousers',
    brand: 'Massimo Dutti',
    size: '32/32',
    condition: 'Good',
    price: 160,
    emirate: 'Dubai',
    area: 'DIFC',
    photos: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    ],
    sellerId: 'u4',
    status: 'active',
    delivery: ['Buyer collects', 'To be agreed in chat'],
    createdAt: '2024-06-04T09:30:00Z',
  },
  {
    id: 'l8',
    title: 'Versace La Medusa Mini Clutch — Black',
    description:
      'Authentic Versace La Medusa mini clutch in black with gold hardware. Comes with authenticity card, dust bag, and box. Purchased from Versace boutique in Mall of the Emirates.',
    category: 'designer',
    subcategory: 'Bags',
    brand: 'Versace',
    size: 'One size',
    condition: 'Like new',
    price: 900,
    emirate: 'Abu Dhabi',
    area: 'Saadiyat Island',
    photos: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    ],
    sellerId: 'u2',
    status: 'active',
    delivery: ['Buyer collects', 'Courier arranged by seller'],
    createdAt: '2024-06-03T15:00:00Z',
    isFeatured: true,
  },
];

export const getListingById = (id: string): Listing | undefined =>
  MOCK_LISTINGS.find((l) => l.id === id);

export const getListingsBySeller = (sellerId: string): Listing[] =>
  MOCK_LISTINGS.filter((l) => l.sellerId === sellerId);
