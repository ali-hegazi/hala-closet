import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client factory.
 *
 * The site runs in "demo mode" (seeded in-memory data, no persistence) until
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set — locally
 * in web/.env.local and on Vercel via `vercel env add`.
 *
 * The schema the app expects lives in supabase/migrations/0001_init.sql at the
 * repo root. The future Expo app should share this exact project so web and
 * mobile see the same listings, chats and profiles.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDemoMode = !url || !anonKey;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (isDemoMode) return null;
  if (!client) client = createClient(url!, anonKey!);
  return client;
}
