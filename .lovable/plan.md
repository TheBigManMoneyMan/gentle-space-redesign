

## Switch to reCAPTCHA v3 (Invisible, Score-Based)

The current v3 keys require a reCAPTCHA v3 implementation. This removes the visible checkbox widget and runs verification silently in the background.

### Changes

1. **Remove `react-google-recaptcha` package** — v2-only library. Instead, load the reCAPTCHA v3 script directly via a `<script>` tag in `index.html`.

2. **`index.html`** — Add the reCAPTCHA v3 script:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=6LedfHIsAAAAAIu4k6_-2fgz6FNVWtPEnVs3Xd4B"></script>
   ```

3. **`src/components/ContactSection.tsx`**:
   - Remove `react-google-recaptcha` import, `recaptchaRef`, `recaptchaToken` state, `handleRecaptchaChange`, and the `<ReCAPTCHA>` JSX element
   - On form submit, call `window.grecaptcha.execute(siteKey, { action: 'contact' })` to get a token
   - Send that token to the `verify-recaptcha` edge function as before
   - Remove the `disabled={!recaptchaToken}` condition from the button (only keep `isSubmitting`)

4. **`supabase/functions/verify-recaptcha/index.ts`** — Add score checking: verify `data.score >= 0.5` in addition to `data.success` (v3 returns a score 0.0–1.0).

5. **`package.json`** — Remove `react-google-recaptcha` and `@types/react-google-recaptcha`.

