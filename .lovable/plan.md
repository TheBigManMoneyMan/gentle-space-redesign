

## Remove reCAPTCHA from Contact Form

### Changes

1. **`src/components/ContactSection.tsx`** - Remove all reCAPTCHA-related code:
   - Remove `react-google-recaptcha` import and `ReCAPTCHA` component
   - Remove `recaptchaRef`, `recaptchaToken`, `recaptchaError` state variables
   - Remove `handleRecaptchaChange` and `handleRecaptchaExpired` handlers
   - Remove the reCAPTCHA widget and error message from the JSX
   - Simplify form submission to no longer call the verify-recaptcha function or check for a token
   - Remove the `disabled={!recaptchaToken}` condition from the submit button (keep `isSubmitting` disable logic)

2. **`supabase/functions/verify-recaptcha/index.ts`** - Delete this edge function since it is no longer needed.

3. **`package.json`** - Remove `react-google-recaptcha` and `@types/react-google-recaptcha` dependencies.

