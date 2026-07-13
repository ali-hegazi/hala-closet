/**
 * Mock user data — replace with Supabase Auth + profiles table:
 *   supabase.from('profiles').select('*').eq('id', userId)
 *
 * ME represents the currently authenticated user (hardcoded for the mock).
 * Replace ME with supabase.auth.getUser() when auth is wired up.
 */
import { User } from '../types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sara Al Mansoori',
    username: 'sara_style',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Fashion lover based in Dubai. Selling preloved pieces from my wardrobe.',
    emirate: 'Dubai',
    joinedAt: '2023-03-15',
    totalListings: 24,
    totalSold: 18,
    rating: 4.9,
    reviewCount: 16,
    verified: true,
  },
  {
    id: 'u2',
    name: 'Layla Hassan',
    username: 'layla_closet',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Minimalist wardrobe, maximalist style. Based in Abu Dhabi.',
    emirate: 'Abu Dhabi',
    joinedAt: '2023-07-20',
    totalListings: 11,
    totalSold: 7,
    rating: 4.7,
    reviewCount: 6,
    verified: false,
  },
  {
    id: 'u3',
    name: 'Noura Ahmed',
    username: 'noura.uae',
    avatar: 'https://i.pravatar.cc/150?img=25',
    bio: 'Occasional seller. Everything is genuine and well-loved.',
    emirate: 'Sharjah',
    joinedAt: '2024-01-10',
    totalListings: 6,
    totalSold: 3,
    rating: 5.0,
    reviewCount: 3,
    verified: false,
  },
  {
    id: 'u4',
    name: 'Ahmed Al Rashid',
    username: 'ahmed_trades',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Streetwear and sneakers. Dubai-based.',
    emirate: 'Dubai',
    joinedAt: '2023-11-05',
    totalListings: 15,
    totalSold: 9,
    rating: 4.6,
    reviewCount: 8,
    verified: true,
  },
];

export const ME: User = {
  id: 'me',
  name: 'You',
  username: 'my_account',
  avatar: 'https://i.pravatar.cc/150?img=60',
  bio: 'Clearing out my closet!',
  emirate: 'Dubai',
  joinedAt: '2024-06-01',
  totalListings: 3,
  totalSold: 1,
  rating: 5.0,
  reviewCount: 1,
  verified: false,
};

export const getUserById = (id: string): User | undefined =>
  id === 'me' ? ME : MOCK_USERS.find((u) => u.id === id);
