-- Update Lymaris Albors bio in cms_who_we_are table
UPDATE cms_who_we_are
SET 
  leader_2_bio = 'Lymaris brings 20+ years of nonprofit executive leadership to KNova, guiding growth with a focus on quality, compliance, and sustainability. Her expertise in operations and strategic partnerships helps deliver projects with integrity and accountability.

Formerly CEO of one of the nation''s largest Hispanic-led nonprofits, she oversaw a multi-state network with $650M in revenue and $1.3B in assets.

She also brings a strong foundation in construction, affordable, supportive, and transitional housing development, property and asset management, and capital expansions for primary and behavioral health care and community facilities, including senior housing and aging-in-place initiatives, nursing homes, senior centers, and multi-purpose art spaces.'
WHERE id = (SELECT id FROM cms_who_we_are LIMIT 1);