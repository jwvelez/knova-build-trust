-- Create service page settings table
CREATE TABLE IF NOT EXISTS public.cms_service_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Hero Section
  hero_image TEXT,
  hero_eyebrow TEXT DEFAULT 'What we do',
  hero_title TEXT DEFAULT 'Building systems that just work',
  hero_description TEXT,
  
  -- Services Anchor Section
  services_section_title TEXT DEFAULT 'Comprehensive construction and MEP expertise',
  services_section_description TEXT DEFAULT 'Choose a category to learn more',
  
  -- General Construction Section
  gc_title TEXT DEFAULT 'General Construction',
  gc_description TEXT,
  
  -- Consulting Section
  consulting_title TEXT DEFAULT 'Consulting and Permitting',
  consulting_description TEXT,
  consulting_image TEXT,
  
  -- Facility Maintenance Section
  fm_title TEXT DEFAULT 'Facility Maintenance & Emergency Response',
  fm_description TEXT,
  fm_preventive_title TEXT DEFAULT 'Preventive Maintenance',
  fm_reactive_title TEXT DEFAULT 'Reactive Maintenance Services',
  fm_reactive_description TEXT,
  
  -- 24/7 CTA Box
  emergency_cta_title TEXT DEFAULT '24/7 Facility Emergency Services',
  emergency_cta_description TEXT,
  emergency_cta_button_text TEXT DEFAULT 'Request 24/7 Service',
  
  -- Final CTA Section
  final_cta_title TEXT DEFAULT 'Ready to start your project?',
  final_cta_button1_text TEXT DEFAULT 'Contact Us',
  final_cta_button2_text TEXT DEFAULT 'See projects',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);

-- Enable RLS
ALTER TABLE public.cms_service_page ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view service page"
  ON public.cms_service_page
  FOR SELECT
  USING (true);

CREATE POLICY "Editors can manage service page"
  ON public.cms_service_page
  FOR ALL
  USING (can_edit());

-- Create trigger for updated_at
CREATE TRIGGER update_service_page_updated_at
  BEFORE UPDATE ON public.cms_service_page
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add category field to cms_services to organize service items
ALTER TABLE public.cms_services 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Add a comment to clarify the category usage
COMMENT ON COLUMN public.cms_services.category IS 'Categories: general_construction, consulting, fm_benefits, fm_common_services, fm_scenarios, service_anchor';

-- Insert default service page settings
INSERT INTO public.cms_service_page (
  hero_description,
  gc_description,
  consulting_description,
  fm_description,
  fm_reactive_description,
  emergency_cta_description
) VALUES (
  'Comprehensive construction and MEP services backed by deep technical expertise and proven reliability',
  'We deliver ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities with end-to-end quality control.',
  'We provide design coordination, engineering oversight, permits, and strategic violation resolution to keep your project compliant and on schedule.',
  'KNova Contractors provides boutique-style facility operations with preventive and reactive maintenance, delivering scheduled preventive care and rapid response to keep operations smooth. Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs. If you''re a property owner, landlord, facility manager, or co-op board member, we tailor solutions to your building and priorities to save time, control costs, and simplify operations.',
  'Reactive maintenance addresses failures after they occur. While it is not a primary strategy for critical assets, it is essential for emergencies and unplanned events. When issues arise, we mobilize fast.',
  'Our 24/7 service provides on-call technical support for unexpected incidents across critical building systems, with immediate, professional response at any time.'
)
ON CONFLICT DO NOTHING;