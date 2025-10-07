-- Add version column to cms_services table to fix the trigger error
ALTER TABLE public.cms_services
ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1;

-- Create trigger for version snapshots on cms_services
DROP TRIGGER IF EXISTS create_cms_services_version ON public.cms_services;
CREATE TRIGGER create_cms_services_version
AFTER INSERT OR UPDATE ON public.cms_services
FOR EACH ROW
EXECUTE FUNCTION public.create_version_snapshot();

-- Create trigger for updated_at on cms_services
DROP TRIGGER IF EXISTS update_cms_services_updated_at ON public.cms_services;
CREATE TRIGGER update_cms_services_updated_at
BEFORE UPDATE ON public.cms_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();