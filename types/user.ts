export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  emirate: string;
  joinedAt: string;
  totalListings: number;
  totalSold: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
}
