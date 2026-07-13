export type ListingStatus = 'active' | 'reserved' | 'sold' | 'removed';

export type Condition =
  | 'New with tags'
  | 'New without tags'
  | 'Like new'
  | 'Good'
  | 'Fair';

export type DeliveryOption =
  | 'Buyer collects'
  | 'Seller can deliver'
  | 'Courier arranged by buyer'
  | 'Courier arranged by seller'
  | 'To be agreed in chat';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  size: string;
  condition: Condition;
  price: number;
  emirate: string;
  area?: string;
  photos: string[];
  sellerId: string;
  status: ListingStatus;
  delivery: DeliveryOption[];
  createdAt: string;
  isFeatured?: boolean;
}
