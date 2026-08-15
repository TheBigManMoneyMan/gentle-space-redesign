# Fix missing logo and video thumbnail on consentcoach.ca

## What's happening

The logo and the promo video thumbnail are not stored as real image files in the project. They are "CDN asset pointers" — small JSON files that hold a URL like `/__l5e/assets-v1/.../consent-coach-logo.png`. That URL is served by Lovable's hosting, not by your build.

Verified live:

- `https://admin.consentcoach.ca/__l5e/.../consent-coach-logo.png` → 200 OK (works)
- `https://consentcoach.ca/__l5e/.../consent-coach-logo.png` → 404 Not Found

So on the Hostinger-hosted `consentcoach.ca` copy of the site the image URLs don't exist, the browser can't load them, and it falls back to showing the alt text. Everything else looks fine because the other images (hero photos, team photos) are real files inside `src/assets` that get bundled into the build.

## The fix

Turn both images into real bundled files instead of hosted pointers:

1. Download the two images from the CDN and save them into `src/assets` as actual PNG files (`consent-coach-logo.png`, `promo-thumb.png`).
2. Change the header to import the logo file directly instead of reading the `.asset.json` pointer.
3. Change the promo video section to import the thumbnail file directly instead of reading its `.asset.json` pointer.
4. Delete the two now-unused `.asset.json` pointer files.

After that, both images are compiled into the site bundle with hashed filenames, so they work identically on the Lovable preview, `admin.consentcoach.ca`, and the Hostinger-hosted `consentcoach.ca` — no external URL dependency.

Note: you'll need to re-upload/redeploy the new build to Hostinger for the change to appear on `consentcoach.ca`.

## Technical details

- Files touched: `src/components/Header.tsx`, `src/components/PromoVideoSection.tsx`.
- Files added: `src/assets/consent-coach-logo.png`, `src/assets/promo-thumb.png`.
- Files removed: `src/assets/consent-coach-logo.png.asset.json`, `src/assets/promo-thumb.png.asset.json`.
- Imports become `import logo from "@/assets/consent-coach-logo.png";` and used as `src={logo}` so Vite fingerprints and emits them.
- `PromoVideoSection` keeps its existing behaviour of preferring the admin-CMS `thumbnail_url` when set; only the built-in fallback changes.
- No database, backend, or layout/styling changes.
