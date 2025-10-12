import { createClient } from "@supabase/supabase-js";

export const SBClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true, // keep users signed in between reloads
      autoRefreshToken: true, // silently refresh before expiry
      detectSessionInUrl: true, // handle email magic link/oauth callbacks
    },
  }
);
