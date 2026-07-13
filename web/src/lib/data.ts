import type { Listing, Review, Seller } from "./types";

// Demo catalogue. In production these queries move to Supabase
// (see supabase/migrations/0001_init.sql — tables mirror these shapes).

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const SELLERS: Seller[] = [
  {
    id: "s1", name: "Layla Al Mansouri", handle: "laylascloset",
    bio: "Decluttering a very full Jumeirah wardrobe. Everything steamed and ready to wear. Meet-ups around Jumeirah or City Walk.",
    emirate: "Dubai", neighborhood: "Jumeirah", rating: 4.9, reviewCount: 128,
    salesCount: 214, verified: true, joined: "2025-01-14", followers: 1240, following: 180,
  },
  {
    id: "s2", name: "Omar Haddad", handle: "omar.streetwear",
    bio: "Sneakers and streetwear only. Prices are fair, lowballers get a polite no. Marina meet-ups after 6pm.",
    emirate: "Dubai", neighborhood: "Dubai Marina", rating: 4.7, reviewCount: 64,
    salesCount: 89, verified: true, joined: "2025-03-02", followers: 640, following: 92,
  },
  {
    id: "s3", name: "Fatima Al Zaabi", handle: "fatimas.finds",
    bio: "Abayas, jalabiyas and modest pieces — many worn once for occasions. Happy to send extra photos on request.",
    emirate: "Abu Dhabi", neighborhood: "Khalifa City", rating: 5.0, reviewCount: 87,
    salesCount: 132, verified: true, joined: "2024-11-20", followers: 2100, following: 45,
  },
  {
    id: "s4", name: "Priya Nair", handle: "priyapreloved",
    bio: "Mum of two clearing out kids' clothes and my own. Bundles welcome — the more you take, the better the price.",
    emirate: "Sharjah", neighborhood: "Al Nahda", rating: 4.8, reviewCount: 52,
    salesCount: 76, verified: false, joined: "2025-05-11", followers: 310, following: 220,
  },
  {
    id: "s5", name: "Sara Boutros", handle: "sara.luxury",
    bio: "Authenticated designer bags and accessories. Receipts or authentication cards included where noted. Serious buyers only.",
    emirate: "Dubai", neighborhood: "Downtown", rating: 4.9, reviewCount: 201,
    salesCount: 167, verified: true, joined: "2024-09-05", followers: 5400, following: 60,
  },
  {
    id: "s6", name: "Khalid Rahman", handle: "khalid.classics",
    bio: "Kanduras, watches and smart menswear. Most items barely worn. Collection from Al Majaz or delivery via courier.",
    emirate: "Sharjah", neighborhood: "Al Majaz", rating: 4.6, reviewCount: 38,
    salesCount: 41, verified: false, joined: "2025-06-18", followers: 150, following: 88,
  },
  {
    id: "s7", name: "Noor Al Shamsi", handle: "noorvintage",
    bio: "Vintage and Y2K pieces sourced from around the Gulf. One-of-a-kind items, no restocks, no holds.",
    emirate: "Ajman", neighborhood: "Ajman Corniche", rating: 4.8, reviewCount: 73,
    salesCount: 98, verified: true, joined: "2025-02-27", followers: 890, following: 310,
  },
  {
    id: "s8", name: "Dana Khoury", handle: "danakh",
    bio: "Activewear and everyday basics, all freshly laundered. RAK based, can meet in Dubai on weekends.",
    emirate: "Ras Al Khaimah", neighborhood: "Al Hamra", rating: 4.7, reviewCount: 29,
    salesCount: 33, verified: false, joined: "2025-08-09", followers: 120, following: 140,
  },
];

export const LISTINGS: Listing[] = [
  {
    id: "l1", title: "Zara satin slip midi dress", brand: "Zara", size: "S",
    description: "Champagne satin slip dress, worn once to a wedding at Address Downtown. Dry cleaned since. No marks, zip runs smoothly. Selling because it deserves more outings than I can give it.",
    condition: "Very good", color: "Beige", price: 85, originalPrice: 299,
    category: "women", subcategory: "Dresses", emirate: "Dubai", neighborhood: "Jumeirah",
    images: [IMG("photo-1595777457583-95e059d581b8"), IMG("photo-1515372039744-b8f02a3ae446")],
    sellerId: "s1", likes: 42, postedAt: "2026-07-10", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l2", title: "Nike Air Force 1 '07 — white", brand: "Nike", size: "EU 42",
    description: "Classic white AF1s, worn maybe ten times. Cleaned with sneaker wipes after every wear, no creasing on the left, light creasing on the right toe box. Box included.",
    condition: "Very good", color: "White", price: 220, originalPrice: 549,
    category: "shoes", subcategory: "Sneakers", emirate: "Dubai", neighborhood: "Dubai Marina",
    images: [IMG("photo-1549298916-b41d501d3772"), IMG("photo-1560343090-f0409e92791a")],
    sellerId: "s2", likes: 87, postedAt: "2026-07-11", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l3", title: "Black open abaya with gold embroidery", brand: "No brand",
    size: "54",
    description: "Elegant open abaya from a boutique in Al Wahda Mall. Delicate gold thread embroidery on the sleeves. Worn twice for Eid gatherings. Comes with the matching shayla.",
    condition: "Very good", color: "Black", price: 160, originalPrice: 450,
    category: "modest-wear", subcategory: "Abayas", emirate: "Abu Dhabi", neighborhood: "Khalifa City",
    images: [IMG("photo-1590073242678-70ee3fc28e8e")],
    sellerId: "s3", likes: 64, postedAt: "2026-07-09", openToOffers: false, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l4", title: "Louis Vuitton Neverfull MM — Damier Ebene", brand: "Louis Vuitton",
    size: "One size",
    description: "Authentic Neverfull MM in Damier Ebene with the beige interior. Purchased at LV Dubai Mall in 2023, receipt included. Light patina on handles, interior spotless. Comes with dustbag.",
    condition: "Very good", color: "Brown", price: 4200, originalPrice: 7700,
    category: "designer", subcategory: "Bags", emirate: "Dubai", neighborhood: "Downtown",
    images: [IMG("photo-1584917865442-de89df76afd3"), IMG("photo-1548036328-c9fa89d128fa")],
    sellerId: "s5", likes: 156, postedAt: "2026-07-08", openToOffers: true, status: "active",
    delivery: ["meetup"],
  },
  {
    id: "l5", title: "Levi's 501 straight jeans", brand: "Levi's", size: "M",
    description: "Mid-wash 501s, the classic straight cut. Hemmed to suit 5'6\"–5'9\". Softened nicely with wear but zero damage. Waist 32.",
    condition: "Good", color: "Blue", price: 95, originalPrice: 349,
    category: "men", subcategory: "Trousers & Jeans", emirate: "Sharjah", neighborhood: "Al Majaz",
    images: [IMG("photo-1542272604-787c3835535d")],
    sellerId: "s6", likes: 23, postedAt: "2026-07-12", openToOffers: true, status: "active",
    delivery: ["meetup", "cash-on-delivery"],
  },
  {
    id: "l6", title: "White premium kandura — worn once", brand: "No brand", size: "56",
    description: "Tailored kandura from a well-known Sharjah tailor, premium Japanese fabric. Worn once for a wedding. Freshly pressed, no marks at all. Length 58 inches.",
    condition: "New without tags", color: "White", price: 140, originalPrice: 380,
    category: "modest-wear", subcategory: "Kanduras", emirate: "Sharjah", neighborhood: "Al Majaz",
    images: [IMG("photo-1594938298603-c8148c4dae35")],
    sellerId: "s6", likes: 31, postedAt: "2026-07-07", openToOffers: false, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l7", title: "Mango wide-leg linen trousers", brand: "Mango", size: "M",
    description: "Oatmeal linen-blend wide legs — the summer staple. Bought this season, worn three times, too long for me even with heels. High waisted with side pockets.",
    condition: "Very good", color: "Beige", price: 70, originalPrice: 229,
    category: "women", subcategory: "Trousers & Jeans", emirate: "Dubai", neighborhood: "Jumeirah",
    images: [IMG("photo-1509551388413-e18d0ac5d495")],
    sellerId: "s1", likes: 18, postedAt: "2026-07-12", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l8", title: "Ray-Ban Wayfarer Classic", brand: "Ray-Ban", size: "One size",
    description: "Black Wayfarers with green G-15 lenses. No scratches on lenses, tiny scuff on the left temple tip (photographed). Case and cloth included.",
    condition: "Good", color: "Black", price: 260, originalPrice: 650,
    category: "accessories", subcategory: "Sunglasses", emirate: "Dubai", neighborhood: "Business Bay",
    images: [IMG("photo-1572635196237-14b3f281503f"), IMG("photo-1511499767150-a48a237f0083")],
    sellerId: "s5", likes: 44, postedAt: "2026-07-06", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l9", title: "Adidas Samba OG — black", brand: "Adidas", size: "EU 40",
    description: "The Sambas everyone is hunting for. Worn indoors a handful of times, soles basically new. Selling because I sized up. No box.",
    condition: "Very good", color: "Black", price: 310, originalPrice: 499,
    category: "shoes", subcategory: "Sneakers", emirate: "Dubai", neighborhood: "JVC",
    images: [IMG("photo-1595950653106-6c9ebd614d3a")],
    sellerId: "s2", likes: 92, postedAt: "2026-07-05", openToOffers: false, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l10", title: "Girls' party dress bundle (age 4-5)", brand: "H&M", size: "One size",
    description: "Three occasion dresses: one tulle, one floral cotton, one velvet. All H&M, all washed on gentle and worn once or twice each. Price is for the bundle.",
    condition: "Good", color: "Multicolour", price: 60, originalPrice: 240,
    category: "kids", subcategory: "Girls", emirate: "Sharjah", neighborhood: "Al Nahda",
    images: [IMG("photo-1518831959646-742c3a14ebf7")],
    sellerId: "s4", likes: 15, postedAt: "2026-07-11", openToOffers: true, status: "active",
    delivery: ["meetup", "cash-on-delivery"],
  },
  {
    id: "l11", title: "COS oversized wool coat", brand: "COS", size: "L",
    description: "Camel wool-blend coat for those two weeks of UAE winter and every European holiday. Heavy, drapes beautifully. Small repair inside the lining, invisible when worn.",
    condition: "Good", color: "Brown", price: 240, originalPrice: 890,
    category: "women", subcategory: "Outerwear", emirate: "Dubai", neighborhood: "Al Barsha",
    images: [IMG("photo-1539533018447-63fcce2678e3")],
    sellerId: "s1", likes: 37, postedAt: "2026-07-03", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l12", title: "Cartier Tank Must — small", brand: "Cartier", size: "One size",
    description: "Cartier Tank Must small model, quartz, 2024. Full set: box, papers, warranty card from Cartier Mall of the Emirates. Hairline scratches on the buckle only. Meet at a bank or mall for verification — happily.",
    condition: "Very good", color: "Gold", price: 9800, originalPrice: 13400,
    category: "designer", subcategory: "Watches", emirate: "Dubai", neighborhood: "Downtown",
    images: [IMG("photo-1524592094714-0f0654e20314"), IMG("photo-1523170335258-f5ed11844a49")],
    sellerId: "s5", likes: 203, postedAt: "2026-07-01", openToOffers: true, status: "active",
    delivery: ["meetup"],
  },
  {
    id: "l13", title: "Vintage 90s denim jacket", brand: "No brand", size: "L",
    description: "Proper vintage — boxy fit, faded in all the right places, brass buttons. Sourced from a Sharjah warehouse lot. Fits L or an oversized M. One of one.",
    condition: "Good", color: "Blue", price: 110, originalPrice: undefined,
    category: "women", subcategory: "Outerwear", emirate: "Ajman", neighborhood: "Ajman Corniche",
    images: [IMG("photo-1551537482-f2075a1d41f2")],
    sellerId: "s7", likes: 58, postedAt: "2026-07-10", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l14", title: "The Giving Movement leggings set", brand: "The Giving Movement", size: "S",
    description: "Sage green TGM set — leggings and sports bra. Softest fabric they make. Worn for pilates a few times, washed cold, zero pilling.",
    condition: "Very good", color: "Green", price: 180, originalPrice: 439,
    category: "women", subcategory: "Activewear", emirate: "Ras Al Khaimah", neighborhood: "Al Hamra",
    images: [IMG("photo-1506629082955-511b1aa562c8")],
    sellerId: "s8", likes: 29, postedAt: "2026-07-09", openToOffers: false, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l15", title: "Massimo Dutti leather loafers", brand: "Massimo Dutti", size: "EU 43",
    description: "Dark brown leather penny loafers. Resoled once by a proper cobbler in Deira — better than new underneath. Uppers have a gentle broken-in look.",
    condition: "Good", color: "Brown", price: 150, originalPrice: 499,
    category: "shoes", subcategory: "Loafers", emirate: "Sharjah", neighborhood: "Al Majaz",
    images: [IMG("photo-1614252235316-8c857d38b5f4")],
    sellerId: "s6", likes: 21, postedAt: "2026-07-08", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l16", title: "Emerald green jalabiya with beadwork", brand: "No brand", size: "52",
    description: "Stunning emerald jalabiya with hand-beaded neckline, bought for a henna night. Worn once for four hours. Beads all intact — checked every one.",
    condition: "New without tags", color: "Green", price: 220, originalPrice: 600,
    category: "modest-wear", subcategory: "Jalabiyas", emirate: "Abu Dhabi", neighborhood: "Al Reem Island",
    images: [IMG("photo-1469334031218-e382a71b716b")],
    sellerId: "s3", likes: 71, postedAt: "2026-07-06", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l17", title: "Coach Tabby shoulder bag 26", brand: "Coach", size: "One size",
    description: "Tabby 26 in ivory with brass hardware. The strap has never been used — still wrapped. Two faint pen dots inside, exterior immaculate. Dustbag included.",
    condition: "Very good", color: "White", price: 850, originalPrice: 1850,
    category: "bags", subcategory: "Handbags", emirate: "Dubai", neighborhood: "Downtown",
    images: [IMG("photo-1566150905458-1bf1fc113f0d")],
    sellerId: "s5", likes: 96, postedAt: "2026-07-11", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l18", title: "Uniqlo-style white oxford shirt", brand: "No brand", size: "L",
    description: "Crisp white oxford, tailored in Bur Dubai with mother-of-pearl buttons. Sharper than anything off the rack. Collar sits perfectly.",
    condition: "New without tags", color: "White", price: 55, originalPrice: 150,
    category: "men", subcategory: "Shirts", emirate: "Dubai", neighborhood: "Deira",
    images: [IMG("photo-1596755094514-f87e34085b2c")],
    sellerId: "s2", likes: 12, postedAt: "2026-07-12", openToOffers: true, status: "active",
    delivery: ["meetup", "cash-on-delivery"],
  },
  {
    id: "l19", title: "Baby onesie bundle 6-12m (8 pieces)", brand: "H&M", size: "One size",
    description: "Eight cotton onesies, neutral colours, all washed in non-bio. A couple have very light bobbling. Grown out of before half were worn properly.",
    condition: "Good", color: "Multicolour", price: 45, originalPrice: 200,
    category: "kids", subcategory: "Baby", emirate: "Sharjah", neighborhood: "Al Nahda",
    images: [IMG("photo-1522771930-78848d9293e8")],
    sellerId: "s4", likes: 9, postedAt: "2026-07-13", openToOffers: true, status: "active",
    delivery: ["meetup", "cash-on-delivery"],
  },
  {
    id: "l20", title: "Y2K baguette bag — lilac", brand: "No brand", size: "One size",
    description: "Proper 2000s baguette in lilac satin with a beaded handle. Found in a vintage lot from Kuwait. Small mark on the base, photographed honestly.",
    condition: "Good", color: "Purple", price: 75, originalPrice: undefined,
    category: "bags", subcategory: "Clutches", emirate: "Ajman", neighborhood: "Al Rashidiya",
    images: [IMG("photo-1584917865442-de89df76afd3")],
    sellerId: "s7", likes: 33, postedAt: "2026-07-12", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l21", title: "Tommy Hilfiger polo — navy", brand: "Tommy Hilfiger", size: "XL",
    description: "Classic fit navy polo, bought at Dubai Outlet Mall. Worn twice, then the gym happened. Flag logo intact, collar holds its shape.",
    condition: "Very good", color: "Navy", price: 65, originalPrice: 249,
    category: "men", subcategory: "T-shirts & Polos", emirate: "Dubai", neighborhood: "Mirdif",
    images: [IMG("photo-1586363104862-3a5e2ab60d99")],
    sellerId: "s6", likes: 14, postedAt: "2026-07-10", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l22", title: "Gucci Marmont card holder", brand: "Gucci", size: "One size",
    description: "Black leather GG Marmont card holder, authenticated. Corners show light wear, gold GG hardware perfect. Box included, no receipt.",
    condition: "Good", color: "Black", price: 720, originalPrice: 1500,
    category: "designer", subcategory: "Bags", emirate: "Dubai", neighborhood: "Downtown",
    images: [IMG("photo-1548036328-c9fa89d128fa")],
    sellerId: "s5", likes: 61, postedAt: "2026-07-04", openToOffers: false, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l23", title: "Chiffon shayla set — 3 neutrals", brand: "No brand", size: "One size",
    description: "Three premium chiffon shaylas in sand, taupe and off-white. Ironed and folded, no snags. From Al Wahda's best hijab shop.",
    condition: "Very good", color: "Beige", price: 50, originalPrice: 165,
    category: "modest-wear", subcategory: "Hijabs & Shaylas", emirate: "Abu Dhabi", neighborhood: "Al Khalidiyah",
    images: [IMG("photo-1601924994987-69e26d50dc26")],
    sellerId: "s3", likes: 27, postedAt: "2026-07-11", openToOffers: false, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l24", title: "New Balance 530 — silver", brand: "New Balance", size: "EU 38",
    description: "Silver 530s, the everyday pair everyone asks about. Some wear on the soles but tons of life left. Recently deep cleaned.",
    condition: "Good", color: "Silver", price: 170, originalPrice: 449,
    category: "shoes", subcategory: "Sneakers", emirate: "Ras Al Khaimah", neighborhood: "Al Nakheel",
    images: [IMG("photo-1539185441755-769473a23570")],
    sellerId: "s8", likes: 48, postedAt: "2026-07-07", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l25", title: "Bouguessa tailored shirt dress", brand: "Bouguessa", size: "M",
    description: "The UAE label everyone knows — clean-lined shirt dress in stone. Worn to one work event. Retail was AED 1,200; this is a genuine steal for the quality.",
    condition: "Very good", color: "Grey", price: 380, originalPrice: 1200,
    category: "women", subcategory: "Dresses", emirate: "Dubai", neighborhood: "Business Bay",
    images: [IMG("photo-1490481651871-ab68de25d43d")],
    sellerId: "s1", likes: 84, postedAt: "2026-07-05", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l26", title: "Boys' football kit bundle (age 7-8)", brand: "Adidas", size: "One size",
    description: "Two full kits and a pair of astro boots (EU 33). Grass stains washed out, boots cleaned. Ideal for the new school term.",
    condition: "Good", color: "Multicolour", price: 80, originalPrice: 320,
    category: "kids", subcategory: "Boys", emirate: "Sharjah", neighborhood: "Muwaileh",
    images: [IMG("photo-1517466787929-bc90951d0974")],
    sellerId: "s4", likes: 11, postedAt: "2026-07-09", openToOffers: true, status: "active",
    delivery: ["meetup", "cash-on-delivery"],
  },
  {
    id: "l27", title: "Gold-plated layered necklace set", brand: "No brand", size: "One size",
    description: "Three-layer necklace set from the Gold Souk area — plated, not solid. Worn a handful of times, no discolouration. Comes in original pouch.",
    condition: "Very good", color: "Gold", price: 40, originalPrice: 120,
    category: "accessories", subcategory: "Jewellery", emirate: "Ajman", neighborhood: "Al Nuaimiya",
    images: [IMG("photo-1599643478518-a784e5dc4c8f")],
    sellerId: "s7", likes: 19, postedAt: "2026-07-13", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l28", title: "Lacoste zip hoodie — grey marl", brand: "Lacoste", size: "L",
    description: "Grey marl zip-through with the croc on the chest. Perfect for freezing malls and evening walks on the Corniche. Washed inside out, like new.",
    condition: "Very good", color: "Grey", price: 130, originalPrice: 425,
    category: "men", subcategory: "Outerwear", emirate: "Abu Dhabi", neighborhood: "Corniche",
    images: [IMG("photo-1556821840-3a63f95609a7")],
    sellerId: "s6", likes: 26, postedAt: "2026-07-08", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l29", title: "Chanel-style tweed jacket (vintage)", brand: "No brand", size: "M",
    description: "Vintage cream tweed jacket, 80s cut with gold-tone buttons. Not Chanel, priced accordingly — but the tailoring is superb. Lining recently replaced.",
    condition: "Good", color: "White", price: 190, originalPrice: undefined,
    category: "women", subcategory: "Outerwear", emirate: "Ajman", neighborhood: "Ajman Corniche",
    images: [IMG("photo-1591047139829-d91aecb6caea")],
    sellerId: "s7", likes: 39, postedAt: "2026-07-06", openToOffers: true, status: "active",
    delivery: ["meetup", "courier"],
  },
  {
    id: "l30", title: "Nike Dri-FIT running tee", brand: "Nike", size: "M",
    description: "Black Dri-FIT tee, the breathable one. Bought two, only need one. Worn and washed twice. No smells, no fading, promise.",
    condition: "Very good", color: "Black", price: 35, originalPrice: 119,
    category: "men", subcategory: "Activewear", emirate: "Ras Al Khaimah", neighborhood: "Al Hamra",
    images: [IMG("photo-1521572163474-6864f9cf17ab")],
    sellerId: "s8", likes: 8, postedAt: "2026-07-13", openToOffers: true, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
  {
    id: "l31", title: "Prada nylon shoulder bag — re-edition", brand: "Prada", size: "One size",
    description: "Re-Edition 2005 in black nylon with the mini pouch. Authenticated at a Dubai resale boutique (certificate photo in listing). Hardware bright, nylon clean.",
    condition: "Very good", color: "Black", price: 2900, originalPrice: 5400,
    category: "designer", subcategory: "Bags", emirate: "Dubai", neighborhood: "Jumeirah",
    images: [IMG("photo-1553062407-98eeb64c6a62")],
    sellerId: "s5", likes: 112, postedAt: "2026-07-02", openToOffers: true, status: "reserved",
    delivery: ["meetup"],
  },
  {
    id: "l32", title: "Shein floral maxi — new with tags", brand: "Shein", size: "XL",
    description: "Ordered two sizes, keeping the other. Tags still on. Blue floral maxi with smocked back, lined skirt. Great for brunches and beach evenings.",
    condition: "New with tags", color: "Blue", price: 30, originalPrice: 89,
    category: "women", subcategory: "Dresses", emirate: "Sharjah", neighborhood: "Al Khan",
    images: [IMG("photo-1572804013309-59a88b7e92f1")],
    sellerId: "s4", likes: 16, postedAt: "2026-07-12", openToOffers: false, status: "active",
    delivery: ["meetup", "courier", "cash-on-delivery"],
  },
];

export const REVIEWS: Review[] = [
  { id: "r1", sellerId: "s1", reviewer: "Mariam K.", rating: 5, comment: "Dress was exactly as photographed, and Layla met me right on time at City Walk. Lovely experience.", date: "2026-07-01" },
  { id: "r2", sellerId: "s1", reviewer: "Jess T.", rating: 5, comment: "Fast replies, honest about a tiny mark I would never have noticed. Would buy again.", date: "2026-06-18" },
  { id: "r3", sellerId: "s1", reviewer: "Aisha B.", rating: 4, comment: "Great coat, slight delay on the meet-up but she kept me updated throughout.", date: "2026-05-30" },
  { id: "r4", sellerId: "s2", reviewer: "Danyal R.", rating: 5, comment: "Sneakers were cleaner than described. Legit seller, knows his stuff.", date: "2026-07-05" },
  { id: "r5", sellerId: "s2", reviewer: "Marco P.", rating: 4, comment: "Good price, easy meet-up at Marina Mall. Box was a bit crushed but shoes perfect.", date: "2026-06-22" },
  { id: "r6", sellerId: "s3", reviewer: "Hessa A.", rating: 5, comment: "The abaya is even more beautiful in person. Fatima included the shayla and a little note. So kind.", date: "2026-07-03" },
  { id: "r7", sellerId: "s3", reviewer: "Reem S.", rating: 5, comment: "Perfect condition, careful packaging, courier arrived next day to Dubai.", date: "2026-06-27" },
  { id: "r8", sellerId: "s5", reviewer: "Lina F.", rating: 5, comment: "Met at the bank, watch verified on the spot exactly as she offered. Total professional.", date: "2026-06-29" },
  { id: "r9", sellerId: "s5", reviewer: "Nadia H.", rating: 5, comment: "Bag came with receipt as promised. Priced fairly for the condition. Trustworthy.", date: "2026-06-10" },
  { id: "r10", sellerId: "s7", reviewer: "Yara M.", rating: 5, comment: "One-of-a-kind piece, exactly as described. Noor clearly loves what she does.", date: "2026-07-02" },
];

// ---------------------------------------------------------------------------
// Query helpers (swap internals for Supabase queries in production)
// ---------------------------------------------------------------------------

export function getListing(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export function getSeller(id: string): Seller | undefined {
  return SELLERS.find((s) => s.id === id);
}

export function listingsBySeller(sellerId: string): Listing[] {
  return LISTINGS.filter((l) => l.sellerId === sellerId);
}

export function reviewsForSeller(sellerId: string): Review[] {
  return REVIEWS.filter((r) => r.sellerId === sellerId);
}

export function similarListings(listing: Listing, count = 4): Listing[] {
  return LISTINGS.filter(
    (l) => l.id !== listing.id && (l.category === listing.category || l.brand === listing.brand)
  )
    .sort((a, b) => b.likes - a.likes)
    .slice(0, count);
}

export interface SearchFilters {
  q?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  size?: string;
  condition?: string;
  color?: string;
  emirate?: string;
  min?: number;
  max?: number;
  sort?: string;
}

export function searchListings(f: SearchFilters): Listing[] {
  let results = [...LISTINGS];
  const q = f.q?.trim().toLowerCase();
  if (q) {
    const terms = q.split(/\s+/);
    results = results.filter((l) => {
      const hay = `${l.title} ${l.brand} ${l.description} ${l.subcategory} ${l.color} ${l.emirate}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }
  if (f.category) results = results.filter((l) => l.category === f.category);
  if (f.subcategory) results = results.filter((l) => l.subcategory === f.subcategory);
  if (f.brand) results = results.filter((l) => l.brand === f.brand);
  if (f.size) results = results.filter((l) => l.size === f.size);
  if (f.condition) results = results.filter((l) => l.condition === f.condition);
  if (f.color) results = results.filter((l) => l.color === f.color);
  if (f.emirate) results = results.filter((l) => l.emirate === f.emirate);
  if (f.min !== undefined) results = results.filter((l) => l.price >= f.min!);
  if (f.max !== undefined) results = results.filter((l) => l.price <= f.max!);

  switch (f.sort) {
    case "newest":
      results.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
      break;
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    default:
      // relevance: likes as a simple engagement proxy
      results.sort((a, b) => b.likes - a.likes);
  }
  return results;
}

export function newestListings(count = 8): Listing[] {
  return [...LISTINGS]
    .filter((l) => l.status === "active")
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .slice(0, count);
}

export function trendingInEmirate(emirate: string, count = 8): Listing[] {
  return LISTINGS.filter((l) => l.emirate === emirate && l.status === "active")
    .sort((a, b) => b.likes - a.likes)
    .slice(0, count);
}

export function underPrice(max: number, count = 8): Listing[] {
  return LISTINGS.filter((l) => l.price <= max && l.status === "active")
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .slice(0, count);
}

export function designerPicks(count = 8): Listing[] {
  return LISTINGS.filter((l) => l.category === "designer")
    .sort((a, b) => b.likes - a.likes)
    .slice(0, count);
}
