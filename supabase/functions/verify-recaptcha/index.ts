import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_KEY = "6LedfHIsAAAAAIu4k6_-2fgz6FNVWtPEnVs3Xd4B";
const PROJECT_ID = "consentcoach-1771617515169";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: "No token provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RECAPTCHA_ENTERPRISE_API_KEY");
    if (!apiKey) {
      throw new Error("RECAPTCHA_ENTERPRISE_API_KEY is not configured");
    }

    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: {
            token,
            expectedAction: "contact",
            siteKey: SITE_KEY,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("reCAPTCHA Enterprise API error:", JSON.stringify(data));
      throw new Error(data.error?.message || "Assessment request failed");
    }

    const valid = data.tokenProperties?.valid === true;
    const actionMatch = data.tokenProperties?.action === "contact";
    const score = data.riskAnalysis?.score ?? 0;
    const isValid = valid && actionMatch && score >= 0.5;

    return new Response(JSON.stringify({ success: isValid, score }), {
      status: isValid ? 200 : 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
