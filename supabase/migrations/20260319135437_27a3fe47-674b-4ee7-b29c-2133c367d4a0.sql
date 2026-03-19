-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS: users can read their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Site sections table
CREATE TABLE public.site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_sections"
  ON public.site_sections FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin write site_sections"
  ON public.site_sections FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Site content table
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  content_key text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (section_key, content_key)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content"
  ON public.site_content FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin write site_content"
  ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Site images table
CREATE TABLE public.site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  image_key text UNIQUE NOT NULL,
  url text NOT NULL DEFAULT '',
  alt_text text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_images"
  ON public.site_images FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin write site_images"
  ON public.site_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage RLS: public read, admin write
CREATE POLICY "Public read site-images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Admin upload site-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update site-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete site-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- Seed site_sections
INSERT INTO public.site_sections (section_key, title, sort_order) VALUES
  ('hero', 'Hero', 1),
  ('about', 'About', 2),
  ('approach', 'Approach', 3),
  ('how_it_works', 'How It Works', 4),
  ('team', 'Team', 5),
  ('services', 'Services', 6),
  ('testimonials', 'Testimonials', 7),
  ('cta', 'Call to Action', 8),
  ('contact', 'Contact', 9);

-- Seed hero content
INSERT INTO public.site_content (section_key, content_key, value) VALUES
  ('hero', 'title', 'Helping you play safe AND have fun'),
  ('hero', 'subtitle', 'Trauma- informed consent education to empower young people to understand boundaries and power dynamics, and thrive in healthy relationships!'),
  ('hero', 'cta_primary_text', 'Book a Session'),
  ('hero', 'cta_primary_link', '#contact'),
  ('hero', 'cta_secondary_text', 'Learn More'),
  ('hero', 'cta_secondary_link', '#about');