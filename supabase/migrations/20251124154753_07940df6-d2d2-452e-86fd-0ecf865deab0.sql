-- Add explicit SELECT policy for user_roles to make admin-only access crystal clear
DROP POLICY IF EXISTS "Only admins can view roles" ON public.user_roles;
CREATE POLICY "Only admins can view roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create a secure view for media that excludes the uploaded_by field from public access
DROP VIEW IF EXISTS public.cms_media_public;
CREATE VIEW public.cms_media_public AS
SELECT 
  id,
  filename,
  storage_path,
  url,
  mime_type,
  size_bytes,
  width,
  height,
  alt_text,
  caption,
  dominant_color,
  metadata,
  created_at
FROM public.cms_media;

-- Grant SELECT on the view to authenticated and anon users
GRANT SELECT ON public.cms_media_public TO authenticated;
GRANT SELECT ON public.cms_media_public TO anon;

-- Add comment explaining the security measure
COMMENT ON VIEW public.cms_media_public IS 'Public view of cms_media that excludes uploaded_by field to prevent user activity tracking';