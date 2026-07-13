/**
 * Conversations context — manages in-memory chat threads and messages.
 *
 * To migrate to Supabase:
 * 1. Replace MOCK_CONVERSATIONS initial state with a Supabase fetch.
 * 2. Replace sendMessage() with an insert to the `messages` table.
 * 3. Subscribe to new messages with supabase.channel('messages').on(...).subscribe().
 * 4. Replace startConversation() with an upsert on the `conversations` table.
 */
import { createContext, useContext, useState, useCallback, ReactNode, createElement } from 'react';
import { Conversation, Message } from '../types/conversation';
import { MOCK_CONVERSATIONS } from '../data/mockConversations';

interface ConversationsContextType {
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string, isOffer?: boolean, offerId?: string) => void;
  startConversation: (listingId: string, sellerId: string) => Conversation;
  markRead: (conversationId: string) => void;
  getConversation: (id: string) => Conversation | undefined;
  getConversationForListing: (listingId: string, sellerId: string) => Conversation | undefined;
}

const ConversationsContext = createContext<ConversationsContextType | null>(null);

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const sendMessage = useCallback(
    (conversationId: string, text: string, isOffer = false, offerId?: string) => {
      const msg: Message = {
        id: `m${Date.now()}`,
        conversationId,
        senderId: 'me',
        text,
        createdAt: new Date().toISOString(),
        isOffer,
        offerId,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: [...c.messages, msg],
                lastMessage: text,
                lastMessageAt: msg.createdAt,
              }
            : c,
        ),
      );
    },
    [],
  );

  const startConversation = useCallback(
    (listingId: string, sellerId: string): Conversation => {
      const existing = conversations.find(
        (c) => c.listingId === listingId && c.buyerId === 'me',
      );
      if (existing) return existing;

      const newConv: Conversation = {
        id: `c${Date.now()}`,
        listingId,
        buyerId: 'me',
        sellerId,
        lastMessage: '',
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
        messages: [],
      };
      setConversations((prev) => [newConv, ...prev]);
      return newConv;
    },
    [conversations],
  );

  const markRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
    );
  }, []);

  const getConversation = useCallback(
    (id: string) => conversations.find((c) => c.id === id),
    [conversations],
  );

  const getConversationForListing = useCallback(
    (listingId: string, sellerId: string) =>
      conversations.find((c) => c.listingId === listingId && c.sellerId === sellerId && c.buyerId === 'me'),
    [conversations],
  );

  return createElement(
    ConversationsContext.Provider,
    { value: { conversations, sendMessage, startConversation, markRead, getConversation, getConversationForListing } },
    children,
  );
}

export function useConversations(): ConversationsContextType {
  const ctx = useContext(ConversationsContext);
  if (!ctx) throw new Error('useConversations must be used within ConversationsProvider');
  return ctx;
}
