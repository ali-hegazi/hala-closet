# Hala Closet

> Buy and sell pre-loved fashion in the UAE.

**🌐 Live website: https://hala-psi-eight.vercel.app**

This repo now contains two frontends sharing one (planned) Supabase backend:

| Directory | What it is | Status |
|---|---|---|
| `/` (root) | Expo React Native mobile app | Mock-data prototype |
| `web/` | Next.js 16 website, deployed on Vercel | Live, demo data |
| `supabase/` | Database schema + RLS policies shared by both | Ready to run, not yet provisioned |

## Website (`web/`)

Next.js 16 (App Router, Turbopack) + Tailwind v4. Full marketplace UI: home feed
with curated sections, search with filters (category, brand, size, condition,
colour, price, emirate + geolocation), listing pages with offers/chat entry
points, seller profiles with reviews, multi-step sell flow, inbox with in-chat
offers, favourites, settings (incl. Arabic-ready language switcher and
prayer-time quiet hours), and auth screens wired for Supabase.

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Runs in **demo mode** (seeded data, no persistence) until Supabase env vars are
set in `web/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Deploys to Vercel from `web/` (`vercel deploy --prod`).

Hala Closet is a peer-to-peer second-hand fashion marketplace for the UAE — think Vinted, adapted for the local market. Buyers and sellers browse listings, chat, and arrange payment and collection directly with each other. No in-app payments, no escrow, no shipping integration.

---

## Status

**Mock frontend only.** All data is hardcoded in `data/`. No backend, no auth, no database. This is the MVP prototype stage. Supabase will be connected in the next phase.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 52 |
| Navigation | Expo Router (file-based) |
| Language | TypeScript (strict) |
| State | React Context (in-memory) |
| Data | Mock data in `data/` |
| Icons | `@expo/vector-icons` (Ionicons) |
| Images | `expo-image` |
| Backend | — (planned: Supabase) |
| Auth | — (planned: Supabase Auth) |
| Payments | — (not in MVP) |

---

## Install & run

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the dev server
npx expo start

# 3. Scan the QR code in Expo Go (iOS or Android)
#    Expo Go must support SDK 52 — update if prompted.
```

> **Folder name:** The project lives in `Vintedae/` on disk. If you rename it to `hala-closet/`, no code changes are needed — only the folder name matters to your terminal, not to the app.

---

## Folder structure

```
app/                        Expo Router screens (file = route)
  _layout.tsx               Root layout — wraps providers
  index.tsx                 Redirects to /(tabs)
  (tabs)/
    _layout.tsx             Bottom tab bar (Home, Search, Sell, Inbox, Profile)
    index.tsx               Home feed
    search.tsx              Search + filter
    sell.tsx                Redirects to create-listing modal
    inbox.tsx               Conversation list
    profile.tsx             My profile + my listings
  listing/[id].tsx          Listing detail
  chat/[id].tsx             Chat screen
  favourites.tsx            Saved listings
  profile/[id].tsx          Public seller profile
  modal/
    create-listing.tsx      7-step create listing flow
    make-offer.tsx          Make offer modal

components/                 Shared UI components
  CategoryPill.tsx          Horizontal scrollable category chips
  ConditionBadge.tsx        Colour-coded condition label
  EmptyState.tsx            Generic empty state with icon
  FilterSheet.tsx           Bottom sheet: category, emirate, condition, price
  ListingCard.tsx           2-col grid card with image, price, condition
  ListingGrid.tsx           FlatList wrapper rendering 2 columns of ListingCards
  ReportSheet.tsx           Report listing / report user bottom sheet
  SearchBar.tsx             Controlled search input
  SellerCard.tsx            Seller avatar, rating, message button
  StatusBadge.tsx           active / reserved / sold badge

constants/                  App-wide constants (never computed at runtime)
  categories.ts             Category + subcategory tree
  colors.ts                 Brand palette
  conditions.ts             Condition options + badge colours
  delivery.ts               Delivery arrangement options
  emirates.ts               UAE emirates list
  typography.ts             Font size + weight scale

data/                       Mock data (replace each file with a Supabase query)
  mockConversations.ts      → supabase.from('messages')
  mockListings.ts           → supabase.from('listings')
  mockOffers.ts             → supabase.from('offers')
  mockUsers.ts              → supabase.from('profiles') + supabase.auth.getUser()

hooks/                      React Context providers + consumer hooks
  useConversations.ts       Conversation + message state
  useFavourites.ts          Favourited listing IDs
  useListings.ts            Filtered listing queries
  useOffers.ts              Offer CRUD

types/                      TypeScript interfaces
  conversation.ts           Conversation, Message
  listing.ts                Listing, ListingStatus, Condition, DeliveryOption
  offer.ts                  Offer, OfferStatus
  user.ts                   User

utils/
  formatDate.ts             formatRelativeDate(), formatMessageTime()
  formatPrice.ts            formatPrice(amount) → "AED 1,200"
```

---

## Main user flows

| Flow | Screens involved |
|---|---|
| Browse listings | Home → category pills or search |
| View listing | Home / Search → Listing detail |
| Favourite a listing | Any listing card or detail → Favourites tab |
| Message a seller | Listing detail → Chat |
| Make an offer | Listing detail or Chat → Make offer modal → Chat |
| Seller: accept / decline offer | Chat (offer bubble) |
| Seller: create a listing | Sell tab → Create listing (7 steps) |
| Seller: manage status | Listing detail → Mark reserved / Mark sold |
| View seller profile | Listing detail → Seller card |
| Report listing or user | Listing detail / Chat / Profile → Report sheet |

### Create listing flow (7 steps)

1. Choose main category
2. Choose subcategory
3. Add photos _(minimum 2 required)_
4. Item details — title, description, brand, size, condition
5. Pricing & delivery — price (AED), emirate, area, delivery options
6. Review — summary of all fields with inline Edit links
7. Seller declaration — authenticity checkbox + legal notice → Publish

---

## Intentionally not included in this version

| Feature | Reason |
|---|---|
| Supabase / any backend | Next planned phase |
| Authentication | Depends on Supabase |
| In-app payments | Not in MVP scope |
| Escrow or seller payouts | Not in MVP scope |
| Courier / shipping integration | Not in MVP scope |
| Admin dashboard | Post-MVP |
| Push notifications | Post-MVP |
| Image upload (camera / library) | Placeholder simulation only — needs `expo-image-picker` |
| Vercel / web deployment | Post-MVP |

---

## Next planned step — Supabase integration

1. Create Supabase project and set env vars (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`).
2. Define schema: `profiles`, `listings`, `conversations`, `messages`, `offers`, `favourites`.
3. Write Row Level Security (RLS) policies — users can only edit their own listings and read others'.
4. Replace each `data/mock*.ts` file with the Supabase query documented at the top of that file.
5. Replace the hardcoded `ME` user with `supabase.auth.getUser()`.
6. Wire up `expo-image-picker` for photo uploads to Supabase Storage.
7. Add Supabase Realtime subscription in `useConversations` for live chat.

---

## Known limitations of the mock version

- **All data resets on app reload** — no persistence of any kind.
- **"Add photo" simulates Unsplash images** — real camera/gallery picker not yet integrated.
- **The logged-in user is always `ME`** — no real auth; seller/buyer roles are hardcoded.
- **Offer accept/decline has no side effect** — listing status does not change when an offer is accepted.
- **Mark reserved / Mark sold shows a confirmation alert only** — listing status is not mutated in state.
- **Search is client-side only** — filters run over the 8 mock listings in memory.
- **Conversations are seeded** — new conversations created in-session are lost on reload.
