export type Condition =
  | "New with tags"
  | "New without tags"
  | "Very good"
  | "Good"
  | "Fair";

export type ListingStatus = "active" | "reserved" | "sold";

export type Emirate =
  | "Dubai"
  | "Abu Dhabi"
  | "Sharjah"
  | "Ajman"
  | "Ras Al Khaimah"
  | "Fujairah"
  | "Umm Al Quwain";

export interface Seller {
  id: string;
  name: string;
  handle: string;
  bio: string;
  emirate: Emirate;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  verified: boolean;
  joined: string; // ISO date
  followers: number;
  following: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  brand: string;
  size: string;
  condition: Condition;
  color: string;
  price: number; // AED
  originalPrice?: number; // AED
  category: string;
  subcategory: string;
  emirate: Emirate;
  neighborhood: string;
  images: string[];
  sellerId: string;
  likes: number;
  postedAt: string; // ISO date
  openToOffers: boolean;
  status: ListingStatus;
  delivery: ("meetup" | "courier" | "cash-on-delivery")[];
}

export interface Review {
  id: string;
  sellerId: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  from: "me" | "them";
  text?: string;
  offer?: { amount: number; status: "pending" | "accepted" | "declined" };
  time: string;
}

export interface Conversation {
  id: string;
  withName: string;
  withHandle: string;
  listingId: string;
  messages: Message[];
}
