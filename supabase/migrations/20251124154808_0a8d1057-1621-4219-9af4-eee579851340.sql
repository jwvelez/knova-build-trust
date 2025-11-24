-- Fix the security definer issue by recreating the view with SECURITY INVOKER
DROP VIEW IF EXISTS public.cms_media_public;
CREATE VIEW public.cms_media_public 
WITH (security_invoker = true)
AS
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
COMMENT ON VIEW public.cms_media_public IS 'Public view of cms_media that excludes uploaded_by field to prevent user activity tracking. Uses security_invoker to enforce RLS of the querying user.';