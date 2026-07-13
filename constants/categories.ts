export interface Category {
  id: string;
  label: string;
  emoji: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'women',
    label: 'Women',
    emoji: '👗',
    subcategories: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Activewear', 'Swimwear'],
  },
  {
    id: 'men',
    label: 'Men',
    emoji: '👔',
    subcategories: ['T-shirts', 'Shirts', 'Trousers', 'Jackets', 'Activewear'],
  },
  {
    id: 'shoes',
    label: 'Shoes',
    emoji: '👟',
    subcategories: ['Sneakers', 'Heels', 'Flats', 'Boots', 'Sandals'],
  },
  {
    id: 'bags',
    label: 'Bags',
    emoji: '👜',
    subcategories: ['Handbags', 'Shoulder bags', 'Clutches', 'Backpacks', 'Designer bags'],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    emoji: '💍',
    subcategories: ['Jewellery', 'Sunglasses', 'Belts', 'Scarves', 'Watches'],
  },
  {
    id: 'modestwear',
    label: 'Modestwear',
    emoji: '🧕',
    subcategories: ['Abayas', 'Kaftans', 'Jalabiyas', 'Hijabs', 'Sets'],
  },
  {
    id: 'occasionwear',
    label: 'Occasionwear',
    emoji: '✨',
    subcategories: ['Wedding guest', 'Evening dresses', 'Formalwear', 'Partywear'],
  },
  {
    id: 'designer',
    label: 'Designer',
    emoji: '💎',
    subcategories: ['Bags', 'Shoes', 'Clothing', 'Accessories'],
  },
];

export const getCategoryById = (id: string) =>
  CATEGORIES.find((c) => c.id === id);
