
-- Fix the version snapshot trigger to handle duplicate versions
DROP TRIGGER IF EXISTS create_cms_services_version ON public.cms_services;

-- Recreate the trigger to only fire on UPDATE, not INSERT
CREATE TRIGGER create_cms_services_version
AFTER UPDATE ON public.cms_services
FOR EACH ROW
EXECUTE FUNCTION public.create_version_snapshot();
