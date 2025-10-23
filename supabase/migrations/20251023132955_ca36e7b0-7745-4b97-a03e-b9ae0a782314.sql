-- Fix Security Issues (corrected)

-- 1. Fix audit log - remove user insert policy and only allow system/admin
DROP POLICY IF EXISTS "System can insert audit log" ON public.cms_audit_log;

CREATE POLICY "Only admins can insert audit log"
ON public.cms_audit_log
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 2. Restrict user_roles self-view - remove it to prevent reconnaissance
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;

-- Create a secure function for users to check their own role without viewing the table
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

-- 3. Restrict cms_versions to admins only for viewing
DROP POLICY IF EXISTS "Editors can view versions" ON public.cms_versions;
DROP POLICY IF EXISTS "Editors can create versions" ON public.cms_versions;

CREATE POLICY "Only admins can view versions"
ON public.cms_versions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Editors can create versions"
ON public.cms_versions
FOR INSERT
TO authenticated
WITH CHECK (can_edit());

-- 4. Add rate limiting documentation
COMMENT ON TABLE public.cms_contact_info IS 
'Public table for contact information. Implement rate limiting at application level to prevent harvesting.';

COMMENT ON TABLE public.cms_footer_content IS 
'Public table for footer content. Implement rate limiting at application level to prevent harvesting.';