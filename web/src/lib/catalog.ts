import type { Condition, Emirate } from "./types";

export const EMIRATES: Emirate[] = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

export const NEIGHBORHOODS: Record<Emirate, string[]> = {
  Dubai: [
    "Jumeirah",
    "Dubai Marina",
    "Downtown",
    "Al Barsha",
    "Deira",
    "Business Bay",
    "JVC",
    "Mirdif",
  ],
  "Abu Dhabi": ["Al Reem Island", "Khalifa City", "Corniche", "Yas Island", "Al Khalidiyah"],
  Sharjah: ["Al Majaz", "Al Nahda", "Muwaileh", "Al Khan"],
  Ajman: ["Al Nuaimiya", "Ajman Corniche", "Al Rashidiya"],
  "Ras Al Khaimah": ["Al Nakheel", "Al Hamra", "Mina Al Arab"],
  Fujairah: ["Fujairah City", "Dibba"],
  "Umm Al Quwain": ["UAQ City", "Al Salamah"],
};

export interface Category {
  slug: string;
  label: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "women",
    label: "Women",
    subcategories: ["Dresses", "Tops", "Trousers & Jeans", "Skirts", "Outerwear", "Activewear"],
  },
  {
    slug: "men",
    label: "Men",
    subcategories: ["T-shirts & Polos", "Shirts", "Trousers & Jeans", "Outerwear", "Activewear"],
  },
  {
    slug: "modest-wear",
    label: "Modest Wear",
    subcategories: ["Abayas", "Kanduras", "Hijabs & Shaylas", "Jalabiyas", "Modest Dresses"],
  },
  {
    slug: "kids",
    label: "Kids",
    subcategories: ["Girls", "Boys", "Baby", "Shoes"],
  },
  {
    slug: "bags",
    label: "Bags",
    subcategories: ["Handbags", "Crossbody", "Totes", "Backpacks", "Clutches"],
  },
  {
    slug: "shoes",
    label: "Shoes",
    subcategories: ["Sneakers", "Heels", "Sandals", "Boots", "Loafers"],
  },
  {
    slug: "accessories",
    label: "Accessories",
    subcategories: ["Watches", "Sunglasses", "Jewellery", "Belts", "Scarves"],
  },
  {
    slug: "designer",
    label: "Designer",
    subcategories: ["Bags", "Shoes", "Ready-to-wear", "Watches", "Sunglasses"],
  },
];

export const CONDITIONS: Condition[] = [
  "New with tags",
  "New without tags",
  "Very good",
  "Good",
  "Fair",
];

export const SIZES = [
  "XXS", "XS", "S", "M", "L", "XL", "XXL",
  "One size",
  "EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45",
  "50", "52", "54", "56", "58",
];

export const BRANDS = [
  "Zara", "H&M", "Nike", "Adidas", "Mango", "Massimo Dutti", "COS", "Shein",
  "Louis Vuitton", "Gucci", "Chanel", "Dior", "Prada", "Coach", "Michael Kors",
  "Rolex", "Cartier", "Ray-Ban", "Levi's", "Tommy Hilfiger", "Lacoste",
  "New Balance", "Puma", "The Giving Movement", "Bouguessa", "Hessa Falasi",
  "No brand",
];

export const COLORS = [
  "Black", "White", "Beige", "Brown", "Grey", "Navy", "Blue", "Green",
  "Red", "Pink", "Purple", "Yellow", "Orange", "Gold", "Silver", "Multicolour",
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const CONDITION_STYLES: Record<Condition, string> = {
  "New with tags": "bg-success-100 text-success-600",
  "New without tags": "bg-teal-100 text-teal-800",
  "Very good": "bg-teal-50 text-teal-700",
  Good: "bg-sand-100 text-ink-700",
  Fair: "bg-sand-100 text-ink-500",
};
