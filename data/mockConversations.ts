/**
 * Mock conversation + message data — replace with Supabase Realtime:
 *   supabase.from('messages').select('*').eq('conversation_id', id)
 *   .on('INSERT', handleNewMessage).subscribe()
 */
import { Conversation } from '../types/conversation';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    listingId: 'l1',
    buyerId: 'me',
    sellerId: 'u1',
    lastMessage: 'Would you take AED 100?',
    lastMessageAt: '2024-06-11T10:22:00Z',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        conversationId: 'c1',
        senderId: 'me',
        text: 'Hi! Is this still available?',
        createdAt: '2024-06-11T10:00:00Z',
      },
      {
        id: 'm2',
        conversationId: 'c1',
        senderId: 'u1',
        text: 'Yes, still available! Feel free to ask any questions.',
        createdAt: '2024-06-11T10:05:00Z',
      },
      {
        id: 'm3',
        conversationId: 'c1',
        senderId: 'me',
        text: 'Great! Would you take AED 100?',
        createdAt: '2024-06-11T10:22:00Z',
        isOffer: true,
        offerId: 'o1',
      },
    ],
  },
  {
    id: 'c2',
    listingId: 'l8',
    buyerId: 'me',
    sellerId: 'u2',
    lastMessage: 'I can do AED 850, final price.',
    lastMessageAt: '2024-06-10T18:45:00Z',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        conversationId: 'c2',
        senderId: 'me',
        text: 'Hello — can you share more photos of the interior?',
        createdAt: '2024-06-10T18:00:00Z',
      },
      {
        id: 'm5',
        conversationId: 'c2',
        senderId: 'u2',
        text: 'Of course! The interior is in perfect condition, no marks or stains.',
        createdAt: '2024-06-10T18:20:00Z',
      },
      {
        id: 'm6',
        conversationId: 'c2',
        senderId: 'me',
        text: 'Any flexibility on the price?',
        createdAt: '2024-06-10T18:30:00Z',
      },
      {
        id: 'm7',
        conversationId: 'c2',
        senderId: 'u2',
        text: 'I can do AED 850, final price.',
        createdAt: '2024-06-10T18:45:00Z',
      },
    ],
  },
  {
    id: 'c3',
    listingId: 'l6',
    buyerId: 'me',
    sellerId: 'u2',
    lastMessage: 'Offer accepted! Let\'s arrange pickup.',
    lastMessageAt: '2024-06-09T12:10:00Z',
    unreadCount: 2,
    messages: [
      {
        id: 'm8',
        conversationId: 'c3',
        senderId: 'me',
        text: 'Is the size accurate? I\'m usually a UAE 36.',
        createdAt: '2024-06-09T11:50:00Z',
      },
      {
        id: 'm9',
        conversationId: 'c3',
        senderId: 'u2',
        text: 'Yes, EU 36 fits true to size. Very flattering cut.',
        createdAt: '2024-06-09T12:00:00Z',
      },
      {
        id: 'm10',
        conversationId: 'c3',
        senderId: 'me',
        text: 'Offer sent: AED 400',
        createdAt: '2024-06-09T12:05:00Z',
        isOffer: true,
        offerId: 'o2',
      },
      {
        id: 'm11',
        conversationId: 'c3',
        senderId: 'u2',
        text: 'Offer accepted! Let\'s arrange pickup.',
        createdAt: '2024-06-09T12:10:00Z',
      },
    ],
  },
];

export const getConversationById = (id: string): Conversation | undefined =>
  MOCK_CONVERSATIONS.find((c) => c.id === id);
