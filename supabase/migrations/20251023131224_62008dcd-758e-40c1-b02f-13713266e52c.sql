-- Add deliver_background_image field to cms_homepage_sections
ALTER TABLE cms_homepage_sections 
ADD COLUMN IF NOT EXISTS deliver_background_image text;