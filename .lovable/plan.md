

# Custom Admin Portal for Client Content Editing

## Overview

Build a database-driven content management system with a protected admin portal. All site text, images, and section ordering will be stored in the database and fetched dynamically. Your client logs into `/admin` to edit content through a simple UI — no access to code or AI.

## What You Need To Do

**Nothing beyond what you normally do in the preview.** I will:
1. Set up authentication (you'll create an admin account via the signup form, then I'll lock it down)
2. Build all the database tables and admin UI
3. Migrate all hardcoded content to the database

After implementation, you'll need to:
- **Sign up** with your admin email/password through the admin login page
- **Seed the initial content** by visiting the admin panel and saving (I'll pre-populate from current hardcoded values via a database migration)
- **Share the admin URL** (`/admin`) and credentials with your client

## Technical Plan

### 1. Database Tables

**`site_sections`** — Controls section order and visibility
- `id`, `section_key` (e.g. "hero", "about"), `title`, `sort_order`, `is_visible`, `updated_at`

**`site_content`** — Stores all editable text content
- `id`, `section_key`, `content_key` (e.g. "hero_title", "about_paragraph_1"), `content_type` ("text" | "rich_text"), `value`, `updated_at`

**`site_images`** — Stores image URLs (using Supabase Storage)
- `id`, `section_key`, `image_key` (e.g. "hero_slide_1", "team_corinne"), `url`, `alt_text`, `sort_order`, `updated_at`

RLS: Public read for all tables (site must load for everyone). Write restricted to authenticated admin users via a `user_roles` table.

### 2. Authentication & Authorization

- Create `user_roles` table with `app_role` enum (`admin`, `user`)
- Admin login page at `/admin/login`
- Protected `/admin` route requiring `admin` role
- After you sign up, I'll guide you to assign the admin role via a migration

### 3. Storage Bucket

- Create a `site-images` storage bucket for uploaded images
- RLS: Public read, authenticated admin write

### 4. Admin Portal UI (`/admin`)

A simple dashboard with:
- **Section Manager** — Drag-to-reorder sections, toggle visibility
- **Content Editor** — For each section, show editable text fields with labels
- **Image Manager** — Upload/replace images per section with preview
- Save button per section that writes to the database

### 5. Frontend Migration

Update each section component (Hero, About, Approach, HowItWorks, Team, Services, Testimonials, CTA, Contact, Footer) to:
- Fetch content from the database on load using `react-query`
- Fall back to current hardcoded values if database is empty (graceful degradation)
- Display images from Storage URLs instead of local imports

### 6. Seed Migration

A database migration that inserts all current hardcoded text content and image references so the admin panel is pre-populated on first load.

## Scope

- ~10 section components updated to be database-driven
- ~3-4 new database tables + storage bucket
- Admin login + dashboard with section editing
- Image upload capability
- Section reordering

This is a significant build. I recommend we tackle it in phases:
1. **Phase 1**: Database schema, auth, admin login, and one section (e.g. Hero) wired up end-to-end
2. **Phase 2**: Remaining sections migrated
3. **Phase 3**: Section reordering and image uploads

Shall I proceed with Phase 1?

