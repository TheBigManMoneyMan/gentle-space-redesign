

## Implement reCAPTCHA Enterprise

### Changes

1. **Store the API key** as a backend secret (`RECAPTCHA_ENTERPRISE_API_KEY`) so the edge function can call the Enterprise assessment endpoint.

2. **`index.html`** — Change the script from `recaptcha/api.js` to `recaptcha/enterprise.js`:
   ```html
   <script src="https://www.google.com/recaptcha/enterprise.js?render=6LedfHIsAAAAAIu4k6_-2fgz6FNVWtPEnVs3Xd4B"></script>
   ```

3. **`src/components/ContactSection.tsx`** — Update the `grecaptcha` calls to use `grecaptcha.enterprise.ready()` and `grecaptcha.enterprise.execute()` instead of `grecaptcha.ready()` / `grecaptcha.execute()`. Update the `Window` type declaration accordingly.

4. **`supabase/functions/verify-recaptcha/index.ts`** — Replace the Google v3 `siteverify` call with the Enterprise assessment endpoint:
   ```
   POST https://recaptchaenterprise.googleapis.com/v1/projects/consentcoach-1771617515169/assessments?key=<API_KEY>
   ```
   Body: `{ event: { token, expectedAction: "contact", siteKey } }`
   Validate `tokenProperties.valid`, `tokenProperties.action`, and `riskAnalysis.score >= 0.5`.

