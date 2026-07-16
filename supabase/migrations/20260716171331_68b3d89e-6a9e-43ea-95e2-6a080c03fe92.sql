
-- 1. Convert has_role to SECURITY INVOKER (user_roles RLS lets caller read own role)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- 2. Tighten anonymous insert policy on contact_submissions (avoid always-true)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
CREATE POLICY "Allow anonymous inserts"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) > 0
    AND length(btrim(email)) > 0
    AND length(btrim(message)) > 0
    AND length(name) <= 200
    AND length(email) <= 320
    AND length(message) <= 10000
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- 3. Admin SELECT policy for contact_submissions
CREATE POLICY "Admins can read submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.contact_submissions TO authenticated;

-- 4. Remove broad public listing policy on storage.objects for site-images
--    (bucket remains public so direct file URLs still work)
DROP POLICY IF EXISTS "Public read site-images" ON storage.objects;
