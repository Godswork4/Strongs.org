import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Serverless handler for inserting registrations securely using the Supabase service_role key.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !serviceRoleKey) {
    res.status(500).json({ error: 'Server misconfigured (missing Supabase env vars)' });
    return;
  }

  // Optional server-side secret header to make it harder for random clients to call the endpoint.
  const serverSecret = process.env.SERVER_ENDPOINT_SECRET;
  if (serverSecret) {
    const incoming = req.headers['x-server-secret'];
    if (!incoming || incoming !== serverSecret) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  const body = req.body || {};

  // Optional reCAPTCHA verification if RECAPTCHA_SECRET is set and client sends token.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET;
  if (recaptchaSecret) {
    const token = body.recaptcha_token;
    if (!token) {
      return res.status(400).json({ error: 'Missing recaptcha token' });
    }

    try {
      const params = new URLSearchParams();
      params.append('secret', recaptchaSecret);
      params.append('response', token);

      const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const verification = await r.json();
      if (!verification.success) {
        return res.status(400).json({ error: 'reCAPTCHA verification failed', details: verification });
      }
    } catch (err: any) {
      return res.status(500).json({ error: 'reCAPTCHA verification error' });
    }
  }

  // Basic validation
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();

  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Very small email sanity check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

  const payload = {
    name: name,
    whatsapp: body.whatsapp || null,
    email: email,
    fellowship: body.fellowship || null,
    department: body.department || null,
    level: body.level || null,
    calling: body.calling || null,
    counselling: body.counselling || null,
    other_fellowship: body.other_fellowship || body.otherFellowship || null,
    other_department: body.other_department || body.otherDepartment || null,
    other_level: body.other_level || body.otherLevel || null,
    other_counselling: body.other_counselling || body.otherCounselling || null,
  };

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      // do not expose any local persistence — this is server-side only
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.from('registrations').insert(payload).select();

    if (error) {
      console.error('Supabase insert error', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true, data });
  } catch (err: any) {
    console.error('Unexpected server error', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
