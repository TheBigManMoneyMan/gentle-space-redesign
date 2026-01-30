
# Replace Jay Wade's Team Photo

## Overview
Replace Jay Wade's current image with the newly uploaded photo and adjust the positioning so his face is centered and aligned with Corinne Diachuk's face.

## Changes Required

### 1. Copy the New Image to Project Assets
- Copy the uploaded image `user-uploads://jaypic.png` to `src/assets/jaypic.png`

### 2. Update TeamSection.tsx
- Update the import statement to use the new image file
- Adjust the `object-position` CSS value for Jay's image to properly center his face

**Current code:**
```tsx
import teamJay from "@/assets/Jay.png";
```

**Updated code:**
```tsx
import teamJay from "@/assets/jaypic.png";
```

### 3. Fine-tune Face Positioning
Looking at the new image - it's a selfie where Jay's face is well-centered vertically in the frame. Since Corinne's image uses `object-top` positioning, I'll adjust Jay's positioning to align similarly.

The new image shows Jay's face is naturally centered, so I'll update the object-position from `object-[center_45%]` to `object-[center_35%]` to shift the visible area slightly upward, ensuring his face aligns at a similar height to Corinne's.

---

## Technical Details

**File to modify:** `src/components/TeamSection.tsx`

**Changes:**
1. Line 3: Change import from `Jay.png` to `jaypic.png`
2. Line 49: Adjust object-position value to better center the face (will start with `object-[center_35%]` and can fine-tune if needed)
