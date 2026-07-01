# Supabase setup and migration

This file documents the SQL migration and recommended environment variables for the SMC registration feature.

## Required environment variables

- VITE_SUPABASE_URL — the Supabase project URL (e.g. https://xxxx.supabase.co)
- VITE_SUPABASE_ANON_KEY — the Supabase anon (public) key used by the client fallback

Optional (only if you deploy a server endpoint):

- SUPABASE_SERVICE_ROLE — Supabase service_role key (server-only, never commit)
- RECAPTCHA_SECRET — (optional) secret key for verifying reCAPTCHA responses server-side

> Important: never commit service_role keys to source. Add them to Vercel Environment Variables.

---

## SQL migration (run in Supabase Studio → SQL editor)

If your project supports pgcrypto (recommended):

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  whatsapp text,
  email text,
  fellowship text,
  department text,
  level text,
  calling text,
  counselling text,
  other_fellowship text,
  other_department text,
  other_level text,
  other_counselling text,
  created_at timestamptz DEFAULT now()
);
```

If gen_random_uuid() is unavailable, enable uuid-ossp and use uuid_generate_v4().

---

## RLS / Policies

For quick/easy setup (public inserts) — only if you accept anonymous submissions:

```sql
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT USING (true) WITH CHECK (true);
```

Safer configuration (recommended):

- Enable RLS and require authenticated users for inserts, OR
- Keep RLS and create a server endpoint (Vercel Serverless / Supabase Edge Function) which uses the service_role key to insert after validating input and captcha.

---

## Recommended Vercel environment variables

Set these in Vercel (Project → Settings → Environment Variables):

- VITE_SUPABASE_URL (Preview & Production)
- VITE_SUPABASE_ANON_KEY (Preview & Production)
- SUPABASE_SERVICE_ROLE (Production only — server key, do not expose to client)
- RECAPTCHA_SECRET (optional)

---

## Example serverless endpoint (Vercel) — paste into `api/register.ts`

This example shows a node handler that validates required fields and inserts using the service role key.

```ts
// api/register.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const payload = req.body;

  // Basic validation
  if (!payload || !payload.name || !payload.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data, error } = await supabase.from('registrations').insert({
      name: payload.name,
      whatsapp: payload.whatsapp || null,
      email: payload.email,
      fellowship: payload.fellowship || null,
      department: payload.department || null,
      level: payload.level || null,
      calling: payload.calling || null,
      counselling: payload.counselling || null,
      other_fellowship: payload.other_fellowship || null,
      other_department: payload.other_department || null,
      other_level: payload.other_level || null,
      other_counselling: payload.other_counselling || null,
    });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ ok: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
```

Notes:
- Add `SUPABASE_SERVICE_ROLE` to Vercel environment variables — **only** on the server, and **never** expose this key to the browser.
- Optionally add a reCAPTCHA check before inserting (verify `recaptcha_token` with Google and fail if not valid).

---

## Client fallback behavior

The registration page will attempt to POST to `/api/register` first. If the endpoint is not found (e.g., you haven't deployed server code), the page falls back to inserting directly from the browser using the `VITE_SUPABASE_ANON_KEY`.

This gives you flexibility to start quickly with anon inserts, then switch to server-side inserts later without changing the client code.
