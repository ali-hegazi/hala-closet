import type { Conversation } from "./types";

// Seeded demo conversations. In production: `conversations` + `messages`
// tables in Supabase with a Realtime subscription for live chat.

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    withName: "Omar Haddad",
    withHandle: "omar.streetwear",
    listingId: "l2",
    messages: [
      { id: "m1", from: "me", text: "Hi! Are the AF1s still available?", time: "10:12" },
      { id: "m2", from: "them", text: "Hala! Yes they are — barely worn, box included.", time: "10:20" },
      { id: "m3", from: "me", text: "Great. Would you do a meet-up at Marina Mall this weekend?", time: "10:24" },
      { id: "m4", from: "them", text: "Saturday after 6pm works for me.", time: "10:31" },
      { id: "m5", from: "me", offer: { amount: 190, status: "pending" }, time: "10:33" },
    ],
  },
  {
    id: "c2",
    withName: "Sara Boutros",
    withHandle: "sara.luxury",
    listingId: "l4",
    messages: [
      { id: "m1", from: "me", text: "Hello! Is the Neverfull authentic with receipt?", time: "Yesterday" },
      { id: "m2", from: "them", text: "Yes — purchased at LV Dubai Mall in 2023, receipt and dustbag included. Happy to meet at the boutique so you can verify.", time: "Yesterday" },
      { id: "m3", from: "me", text: "Perfect. Would you consider 3,800?", time: "Yesterday" },
      { id: "m4", from: "them", offer: { amount: 4000, status: "pending" }, time: "Yesterday" },
    ],
  },
  {
    id: "c3",
    withName: "Fatima Al Zaabi",
    withHandle: "fatimas.finds",
    listingId: "l3",
    messages: [
      { id: "m1", from: "me", text: "Salam! Does the abaya come with the matching shayla?", time: "Tue" },
      { id: "m2", from: "them", text: "Wa alaikum assalam! Yes, the shayla is included. I can courier to Dubai next day.", time: "Tue" },
      { id: "m3", from: "me", text: "Wonderful, I'll take it. Cash on delivery ok?", time: "Tue" },
      { id: "m4", from: "them", text: "Of course. I'll arrange the courier once you confirm your area.", time: "Wed" },
    ],
  },
];
