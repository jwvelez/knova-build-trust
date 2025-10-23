-- Add two more certification slots to existing records
-- This updates any existing records to have 6 certification slots instead of 4
UPDATE cms_who_we_are
SET certifications = CASE
  WHEN array_length(certifications, 1) IS NULL THEN 
    ARRAY['', '', '', '', '', '']::text[]
  WHEN array_length(certifications, 1) < 6 THEN 
    certifications || ARRAY_FILL(''::text, ARRAY[6 - array_length(certifications, 1)])
  ELSE 
    certifications
END
WHERE id IS NOT NULL;