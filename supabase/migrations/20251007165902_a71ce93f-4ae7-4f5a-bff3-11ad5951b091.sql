-- Add icon_url column to cms_services table
ALTER TABLE public.cms_services 
ADD COLUMN IF NOT EXISTS icon_url text;