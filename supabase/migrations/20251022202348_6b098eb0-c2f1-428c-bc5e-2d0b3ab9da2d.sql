-- Add structured content fields to cms_services table
ALTER TABLE cms_services 
ADD COLUMN IF NOT EXISTS service_type text DEFAULT 'general',
ADD COLUMN IF NOT EXISTS hero_title text,
ADD COLUMN IF NOT EXISTS hero_subtitle text,
ADD COLUMN IF NOT EXISTS content jsonb DEFAULT '{}'::jsonb;

-- Update content column comment
COMMENT ON COLUMN cms_services.content IS 'Structured content including benefits, common_services, scenarios, and other sections stored as JSON';

-- Example content structure:
-- {
--   "benefits": [{"icon": "Shield", "title": "Enhanced Safety", "description": "..."}],
--   "common_services": [{"icon": "Wrench", "title": "HVAC Systems", "description": "..."}],
--   "scenarios": [{"icon": "Building", "title": "New Construction", "description": "..."}]
-- }