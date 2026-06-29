import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "YOUR_ADMIN_INBOX@strongs.org"; // <-- change
const FROM_EMAIL = "SMC <noreply@strongs.org>";      // must be on a verified domain

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const f = await req.json();

    // minimal validation
    for (const k of ["name", "whatsapp", "email", "fellowship", "department", "level", "calling", "counselling"]) {
      if (!f[k] || String(f[k]).trim() === "")
        return json({ error: `Missing field: ${k}` }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("smc_registrations").insert({
      name: f.name,
      whatsapp: f.whatsapp,
      email: f.email,
      fellowship: f.fellowship,
      other_fellowship: f.otherFellowship || null,
      department: f.department,
      other_department: f.otherDepartment || null,
      level: f.level,
      other_level: f.otherLevel || null,
      calling: f.calling,
      counselling: f.counselling,
      other_counselling: f.otherCounselling || null,
    });
    if (dbError) return json({ error: dbError.message }, 500);

    // fire emails (don't fail the registration if email hiccups)
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_KEY) {
      const send = (to: string, subject: string, html: string) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
        });

      await Promise.allSettled([
        send(f.email, "SMC Registration Received",
          `<p>Hi ${f.name},</p><p>We've received your SMC registration. See you there!</p><p>— Strongs Impact</p>`),
        send(ADMIN_EMAIL, `New SMC registration: ${f.name}`,
          `<h3>New registration</h3>
           <ul>
             <li><b>Name:</b> ${f.name}</li>
             <li><b>WhatsApp:</b> ${f.whatsapp}</li>
             <li><b>Email:</b> ${f.email}</li>
             <li><b>Fellowship:</b> ${f.fellowship} ${f.otherFellowship || ""}</li>
             <li><b>Department:</b> ${f.department} ${f.otherDepartment || ""}</li>
             <li><b>Level:</b> ${f.level} ${f.otherLevel || ""}</li>
             <li><b>Calling:</b> ${f.calling}</li>
             <li><b>Counselling:</b> ${f.counselling} ${f.otherCounselling || ""}</li>
           </ul>`),
      ]);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }

  function json(body: unknown, status: number) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
