

## Make Hero Images More Visible

Adjusting the overlay and image opacity values to make the sports images more prominent in the hero section.

### Changes to Make

**File: `src/components/HeroSection.tsx`**

| Element | Current Value | New Value |
|---------|---------------|-----------|
| Gradient overlay (left) | `from-primary/60` | `from-primary/50` |
| Gradient overlay (center) | `via-primary/45` | `via-primary/35` |
| Gradient overlay (right) | `to-primary/30` | `to-primary/20` |
| Image opacity (active slide) | `opacity-40` | `opacity-50` |

### Technical Details

The changes will be made on two lines:

1. **Line 36** - Reduce the gradient overlay opacity by 10% at each point:
   - `from-primary/60` → `from-primary/50`
   - `via-primary/45` → `via-primary/35`
   - `to-primary/30` → `to-primary/20`

2. **Line 45** - Increase the active image opacity by 10%:
   - `opacity-40` → `opacity-50`

This will reduce the maroon color overlay and make the underlying sports images more visible while still maintaining enough contrast for the text to remain readable.

