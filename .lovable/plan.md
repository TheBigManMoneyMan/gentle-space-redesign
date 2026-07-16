## Fix: Old text flash on initial page load

**Approach: Option B** — render nothing until content loads, plus pre-warm the cache with one batched query at the page root.

### What changes

1. **`src/hooks/useSiteContent.tsx`**
   - Add a new hook `useAllSiteContent()` that fetches every row from `site_content` in a single query and returns a map keyed by `section_key`.
   - Update `useSiteContent(sectionKey)` to read from the batched cache if available, so individual section calls resolve instantly after the root query completes.

2. **`src/pages/Index.tsx`**
   - Call `useAllSiteContent()` at the top.
   - While the batched query is loading on first mount, render just the `Header` (and a min-height spacer to prevent layout collapse) — no section components at all.
   - Once loaded, render sections as today.

3. **Each section component** (`HeroSection`, `AboutSection`, `ApproachSection`, `HowItWorksSection`, `TeamSection`, `ServicesSection`, `TestimonialsSection`, `CTASection`, `ContactSection`)
   - Keep the hardcoded `defaults` object as a fallback for network errors only.
   - Since `Index.tsx` gates rendering on the batched load, individual sections will always mount with data already in cache — no flash of fallback text.

### Result

- First paint shows the header and empty space (~200–500ms) instead of the wrong text.
- Once content is cached, everything renders together with the correct DB values.
- No flash, no layout jumps between wrong-text and right-text states.

### Trade-off you accepted

Brief blank area under the header on first load instead of a flash of stale copy. Subsequent navigations are instant (cached for 5 minutes).
