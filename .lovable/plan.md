## The 454 MB problem

A 454 MB video cannot be committed to the project, should not be auto-loaded on page open, and would be painful for mobile visitors. The plan below gets it onto the site in a performant way.

## Step 1 — Compress the source file (strongly recommended)

454 MB for ~3.5 minutes is roughly 17 Mbps, which is overkill for web. Target:

- **Web-optimized MP4:** 3–6 Mbps for 1080p
- **Goal size:** under 100 MB, ideally 40–80 MB
- **Tooling:** HandBrake, FFmpeg, or a service like Vimeo / YouTube (which re-encode automatically)

If the video must stay at 454 MB for quality reasons, use a streaming host rather than self-hosting the raw file.

## Step 2 — Choose a hosting approach

### Option A: YouTube or Vimeo embed (recommended)

- Upload the video to YouTube or Vimeo.
- Set to unlisted if it should not be discoverable.
- Embed via iframe in a modal/lightbox.
- **Pros:** free/ cheap CDN, adaptive streaming, no bandwidth cost to you, works on all devices.
- **Cons:** player branding, depends on third-party availability.

### Option B: Supabase Storage

- Upload the MP4 to the existing `site-images` bucket or a new `site-videos` bucket.
- Create a public bucket and RLS SELECT policy for `storage.objects`.
- Use a standard `<video>` element with `preload="none"` so it only downloads when the user clicks play.
- **Pros:** full control, no third-party branding.
- **Cons:** 454 MB downloaded from Supabase Storage is not adaptive streaming; mobile users on slow connections will buffer. Large files can also hit egress/bandwidth limits.

### Option C: Lovable Assets CDN

- Upload via `lovable-assets create --file <path>`.
- Reference the returned `.asset.json` URL.
- **Pros:** CDN-cached, global delivery.
- **Cons:** not designed for streaming large video; best for short clips and images. A 454 MB asset may be rejected or perform poorly because it is delivered as a single file rather than adaptive chunks.

**Recommendation:** Use Option A (YouTube/Vimeo) for the 454 MB source, or compress first and then use Option B if you want to self-host.

## Step 3 — Build the on-site experience

Same as the previous plan:

1. Add a new `PromoVideoSection` between **About** and **Approach**.
2. Show a branded thumbnail with a play button.
3. Clicking play opens a modal/lightbox with the embedded player.
4. Lazy-load the iframe only when the modal opens.
5. Add CMS keys (`promo_title`, `promo_subline`, `promo_video_url`, `promo_thumbnail_url`) to `site_content` and register `promo` in `site_sections` so it can be reordered or hidden.

## Step 4 — What I need from you

- The video file or a link to it (YouTube/Vimeo URL, or the raw file if you want me to compress and upload it).
- Whether you are okay with YouTube/Vimeo branding, or if you prefer self-hosted Supabase Storage.
- A custom thumbnail, or I can generate one that matches the dark-blue / teal / electric-green brand palette.

## If you want me to do the compression/upload

I can run FFmpeg in the sandbox to compress an uploaded file, then upload the result to Supabase Storage or Lovable Assets. Just upload the video and tell me which host you prefer.