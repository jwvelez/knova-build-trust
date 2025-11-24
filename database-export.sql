-- ============================================
-- KNova CMS Database Export
-- Complete database schema and data export
-- ============================================

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE public.audit_action AS ENUM ('create', 'update', 'delete', 'restore');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- ============================================
-- TABLES
-- ============================================

-- User Roles Table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL DEFAULT 'viewer'::app_role,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, role)
);

-- CMS Audit Log
CREATE TABLE public.cms_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action audit_action NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CMS Versions
CREATE TABLE public.cms_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    version INTEGER NOT NULL,
    content JSONB NOT NULL,
    change_summary TEXT,
    changed_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CMS Site Settings
CREATE TABLE public.cms_site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL DEFAULT 'Knova Construction',
    site_description TEXT,
    brand_color TEXT DEFAULT '#0F172A',
    logo_url TEXT,
    favicon_url TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    address TEXT,
    navigation JSONB NOT NULL DEFAULT '[]'::jsonb,
    footer_content JSONB NOT NULL DEFAULT '{}'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID
);

-- CMS Media
CREATE TABLE public.cms_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    dominant_color TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    uploaded_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CMS Navigation
CREATE TABLE public.cms_navigation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Pages
CREATE TABLE public.cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    hero_image TEXT,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    status content_status NOT NULL DEFAULT 'draft'::content_status,
    version INTEGER NOT NULL DEFAULT 1,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- CMS Services
CREATE TABLE public.cms_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    icon_url TEXT,
    details TEXT,
    category TEXT,
    service_type TEXT DEFAULT 'general',
    hero_title TEXT,
    hero_subtitle TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    display_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    status content_status NOT NULL DEFAULT 'draft'::content_status,
    version INTEGER NOT NULL DEFAULT 1,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- CMS Projects
CREATE TABLE public.cms_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    year TEXT NOT NULL,
    category TEXT NOT NULL,
    size TEXT,
    description TEXT,
    details TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    status content_status NOT NULL DEFAULT 'draft'::content_status,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- CMS Homepage Sections
CREATE TABLE public.cms_homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_heading TEXT NOT NULL,
    hero_description TEXT,
    hero_cta_primary TEXT,
    hero_cta_secondary TEXT,
    hero_image TEXT,
    deliver_eyebrow TEXT,
    deliver_heading TEXT,
    deliver_description TEXT,
    deliver_background_image TEXT,
    deliver_value_1_icon TEXT,
    deliver_value_1_title TEXT,
    deliver_value_1_description TEXT,
    deliver_value_2_icon TEXT,
    deliver_value_2_title TEXT,
    deliver_value_2_description TEXT,
    deliver_value_3_icon TEXT,
    deliver_value_3_title TEXT,
    deliver_value_3_description TEXT,
    services_eyebrow TEXT,
    services_heading TEXT,
    services_description TEXT,
    services_cta_text TEXT,
    industries_eyebrow TEXT,
    industries_heading TEXT,
    industries_description TEXT,
    interstitial_1_image TEXT,
    interstitial_1_alt TEXT,
    interstitial_2_image TEXT,
    interstitial_2_alt TEXT,
    final_cta_heading TEXT,
    final_cta_button_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Homepage Services
CREATE TABLE public.cms_homepage_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Homepage Industries
CREATE TABLE public.cms_homepage_industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    detail TEXT NOT NULL,
    icon TEXT NOT NULL,
    filter_link TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Contact Info
CREATE TABLE public.cms_contact_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_eyebrow TEXT,
    hero_heading TEXT,
    address_line_1 TEXT,
    address_line_2 TEXT,
    phone TEXT,
    email TEXT,
    emergency_service_title TEXT,
    emergency_service_description TEXT,
    emergency_service_phone TEXT,
    emergency_service_cta TEXT,
    form_name_label TEXT,
    form_email_label TEXT,
    form_phone_label TEXT,
    form_company_label TEXT,
    form_service_label TEXT,
    form_message_label TEXT,
    form_submit_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Footer Content
CREATE TABLE public.cms_footer_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT,
    contact_heading TEXT,
    address_line_1 TEXT,
    address_line_2 TEXT,
    phone TEXT,
    email TEXT,
    company_description TEXT,
    links_heading TEXT,
    certifications TEXT[],
    copyright_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Who We Are
CREATE TABLE public.cms_who_we_are (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_eyebrow TEXT,
    hero_heading TEXT,
    hero_description TEXT,
    hero_image TEXT,
    overview_paragraph_1 TEXT,
    overview_paragraph_2 TEXT,
    mission_heading TEXT,
    value_1_title TEXT,
    value_1_description TEXT,
    value_2_title TEXT,
    value_2_description TEXT,
    value_3_title TEXT,
    value_3_description TEXT,
    value_4_title TEXT,
    value_4_description TEXT,
    leadership_heading TEXT,
    leader_1_name TEXT,
    leader_1_title TEXT,
    leader_1_bio TEXT,
    leader_1_image TEXT,
    leader_2_name TEXT,
    leader_2_title TEXT,
    leader_2_bio TEXT,
    leader_2_image TEXT,
    office_assistance_heading TEXT,
    office_assistance_description TEXT,
    office_assistance_link TEXT,
    consultants_heading TEXT,
    consultants_description TEXT,
    social_impact_heading TEXT,
    social_impact_description TEXT,
    certifications_heading TEXT,
    certifications TEXT[],
    cta_heading TEXT,
    cta_button_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CMS Service Page
CREATE TABLE public.cms_service_page (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_eyebrow TEXT DEFAULT 'What we do',
    hero_title TEXT DEFAULT 'Building systems that just work',
    hero_description TEXT,
    hero_image TEXT,
    services_section_title TEXT DEFAULT 'Comprehensive construction and MEP expertise',
    services_section_description TEXT DEFAULT 'Choose a category to learn more',
    gc_title TEXT DEFAULT 'General Construction',
    gc_description TEXT,
    consulting_title TEXT DEFAULT 'Consulting and Permitting',
    consulting_description TEXT,
    consulting_image TEXT,
    fm_title TEXT DEFAULT 'Facility Maintenance & Emergency Response',
    fm_description TEXT,
    fm_preventive_title TEXT DEFAULT 'Preventive Maintenance',
    fm_reactive_title TEXT DEFAULT 'Reactive Maintenance Services',
    fm_reactive_description TEXT,
    emergency_cta_title TEXT DEFAULT '24/7 Facility Emergency Services',
    emergency_cta_description TEXT,
    emergency_cta_button_text TEXT DEFAULT 'Request 24/7 Service',
    final_cta_title TEXT DEFAULT 'Ready to start your project?',
    final_cta_button1_text TEXT DEFAULT 'Contact Us',
    final_cta_button2_text TEXT DEFAULT 'See projects',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_by UUID
);

-- CMS SEO
CREATE TABLE public.cms_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    keywords TEXT[],
    canonical_url TEXT,
    og_image TEXT,
    og_type TEXT DEFAULT 'website',
    robots_index BOOLEAN DEFAULT true,
    robots_follow BOOLEAN DEFAULT true,
    structured_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================
-- VIEWS
-- ============================================

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

COMMENT ON VIEW public.cms_media_public IS 'Public view of cms_media that excludes uploaded_by field to prevent user activity tracking. Uses security_invoker to enforce RLS of the querying user.';

-- ============================================
-- FUNCTIONS
-- ============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.can_edit()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_version_snapshot()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Temporarily disabled to allow updates
    RETURN NEW;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_homepage_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_homepage_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_who_we_are ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_service_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_seo ENABLE ROW LEVEL SECURITY;

-- User Roles Policies
CREATE POLICY "Only admins can view roles"
ON public.user_roles FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Audit Log Policies
CREATE POLICY "Admins can view audit log"
ON public.cms_audit_log FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert audit log"
ON public.cms_audit_log FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Versions Policies
CREATE POLICY "Only admins can view versions"
ON public.cms_versions FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Editors can create versions"
ON public.cms_versions FOR INSERT
WITH CHECK (can_edit());

-- Site Settings Policies
CREATE POLICY "Anyone can view site settings"
ON public.cms_site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can update site settings"
ON public.cms_site_settings FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Media Policies
CREATE POLICY "Anyone can view media"
ON public.cms_media FOR SELECT
USING (true);

CREATE POLICY "Editors can manage media"
ON public.cms_media FOR ALL
USING (can_edit());

CREATE POLICY "Editors can upload media"
ON public.cms_media FOR INSERT
WITH CHECK (can_edit());

-- Navigation Policies
CREATE POLICY "Anyone can view navigation"
ON public.cms_navigation FOR SELECT
USING (status = 'published');

CREATE POLICY "Editors can manage navigation"
ON public.cms_navigation FOR ALL
USING (can_edit());

-- Pages Policies
CREATE POLICY "Anyone can view published pages"
ON public.cms_pages FOR SELECT
USING (status = 'published'::content_status);

CREATE POLICY "Editors can view all pages"
ON public.cms_pages FOR SELECT
USING (can_edit());

CREATE POLICY "Editors can manage pages"
ON public.cms_pages FOR ALL
USING (can_edit());

-- Services Policies
CREATE POLICY "Anyone can view published services"
ON public.cms_services FOR SELECT
USING (status = 'published'::content_status);

CREATE POLICY "Editors can view all services"
ON public.cms_services FOR SELECT
USING (can_edit());

CREATE POLICY "Editors can manage services"
ON public.cms_services FOR ALL
USING (can_edit());

-- Projects Policies
CREATE POLICY "Anyone can view published projects"
ON public.cms_projects FOR SELECT
USING (status = 'published'::content_status);

CREATE POLICY "Editors can view all projects"
ON public.cms_projects FOR SELECT
USING (can_edit());

CREATE POLICY "Editors can manage projects"
ON public.cms_projects FOR ALL
USING (can_edit());

-- Homepage Sections Policies
CREATE POLICY "Anyone can view homepage sections"
ON public.cms_homepage_sections FOR SELECT
USING (true);

CREATE POLICY "Editors can manage homepage sections"
ON public.cms_homepage_sections FOR ALL
USING (can_edit());

-- Homepage Services Policies
CREATE POLICY "Anyone can view homepage services"
ON public.cms_homepage_services FOR SELECT
USING (status = 'published');

CREATE POLICY "Editors can manage homepage services"
ON public.cms_homepage_services FOR ALL
USING (can_edit());

-- Homepage Industries Policies
CREATE POLICY "Anyone can view homepage industries"
ON public.cms_homepage_industries FOR SELECT
USING (status = 'published');

CREATE POLICY "Editors can manage homepage industries"
ON public.cms_homepage_industries FOR ALL
USING (can_edit());

-- Contact Info Policies
CREATE POLICY "Anyone can view contact info"
ON public.cms_contact_info FOR SELECT
USING (true);

CREATE POLICY "Editors can manage contact info"
ON public.cms_contact_info FOR ALL
USING (can_edit());

-- Footer Content Policies
CREATE POLICY "Anyone can view footer"
ON public.cms_footer_content FOR SELECT
USING (true);

CREATE POLICY "Editors can manage footer"
ON public.cms_footer_content FOR ALL
USING (can_edit());

-- Who We Are Policies
CREATE POLICY "Anyone can view who we are"
ON public.cms_who_we_are FOR SELECT
USING (true);

CREATE POLICY "Editors can manage who we are"
ON public.cms_who_we_are FOR ALL
USING (can_edit());

-- Service Page Policies
CREATE POLICY "Anyone can view service page"
ON public.cms_service_page FOR SELECT
USING (true);

CREATE POLICY "Editors can manage service page"
ON public.cms_service_page FOR ALL
USING (can_edit());

-- SEO Policies
CREATE POLICY "Anyone can view published SEO"
ON public.cms_seo FOR SELECT
USING (true);

CREATE POLICY "Editors can manage SEO"
ON public.cms_seo FOR ALL
USING (can_edit());

-- ============================================
-- GRANTS
-- ============================================

GRANT SELECT ON public.cms_media_public TO authenticated;
GRANT SELECT ON public.cms_media_public TO anon;

-- ============================================
-- DATA INSERTS
-- ============================================

-- Site Settings
INSERT INTO public.cms_site_settings (id, site_title, site_description, brand_color, navigation, footer_content, social_links)
VALUES (
  'd203efa7-336c-40d1-a3c6-66c864e0f41d',
  'KNova Construction',
  'Professional construction and MEP services',
  '#0F172A',
  '[{"href":"/who-we-are","label":"Who We Are"},{"href":"/services","label":"Services"},{"href":"/projects","label":"Projects"},{"href":"/contact","label":"Contact"}]'::jsonb,
  '{"columns":[{"links":[{"href":"/who-we-are","label":"Who We Are"},{"href":"/services","label":"Services"},{"href":"/projects","label":"Projects"}],"title":"Company"},{"links":[{"href":"/contact","label":"Get in Touch"}],"title":"Contact"}],"description":"Professional construction and MEP services backed by deep technical expertise","tagline":"Building systems that just work"}'::jsonb,
  '{}'::jsonb
);

-- Who We Are Content
INSERT INTO public.cms_who_we_are (
  id, hero_eyebrow, hero_heading, hero_description, hero_image,
  overview_paragraph_1, overview_paragraph_2, mission_heading,
  value_1_title, value_1_description, value_2_title, value_2_description,
  value_3_title, value_3_description, value_4_title, value_4_description,
  leadership_heading, leader_1_name, leader_1_title, leader_1_bio,
  leader_2_name, leader_2_title, leader_2_bio,
  office_assistance_heading, office_assistance_description, office_assistance_link,
  consultants_heading, consultants_description,
  social_impact_heading, social_impact_description,
  certifications_heading, certifications,
  cta_heading, cta_button_text
) VALUES (
  'ebc9c0d3-2cf8-4953-81fe-9ef11872b127',
  'Who We Are',
  'Accountability at the top, reliability in the field.',
  'MBE-certified general contractor with deep MEP expertise serving New York and New Jersey',
  'https://gefyvtbtecvaoyxmpjhs.supabase.co/storage/v1/object/public/cms-media/who-we-are/0.8755621901941424.jpg',
  'KNova Contractors is a Certified Minority Business Enterprise (MBE), licensed and insured general contractor serving New York and New Jersey. We deliver code-compliant, high-value projects for nonprofits, government agencies, housing developers, and commercial, industrial, and private residential clients.',
  'We also partner with property management companies to provide facility management, preventive maintenance, and 24/7 reactive service. Our GC-led delivery is strengthened by advanced MEP capabilities and proven acumen in HVAC, electrical, and plumbing. We keep schedules tight and deliver quality results on budget and on schedule.',
  'Build trusted spaces that perform',
  'People', 'We build environments where communities can thrive.',
  'Quality', 'We pursue excellence with continuous improvement.',
  'Integrity', 'We do the right thing and own the outcome.',
  'Stewardship', 'We exceed expectations to create long-term value.',
  'About Us',
  'Keily J. Nova', 'Owner & President',
  'Keily brings 20+ years in construction with deep MEP expertise that anchors KNova''s delivery. Licensed in New York and New Jersey, he leads field operations with a focus on safety, quality, and performance.

His background spans high-efficiency HVAC design and retrofits including heat pumps and ventilation, electrical power distribution and lighting controls, and plumbing and piping for domestic water, sanitary, and gas.

Teams rely on his clear direction, precise coordination, and clean handoffs. He has managed ground-up builds and full gut renovations across residential, commercial, institutional, and medical facilities.

Keily is known for disciplined scheduling, code-first execution, and tenant-safe phasing that reduces downtime. He sets standards on site, communicates issues early, and drives projects to close with minimal punch lists and predictable outcomes.',
  'Lymaris Albors', '',
  'Lymaris brings 20+ years of nonprofit executive leadership to KNova, guiding growth with a focus on quality, compliance, and sustainability. Her expertise in operations and strategic partnerships helps deliver projects with integrity and accountability.

Formerly CEO of one of the nation''s largest Hispanic-led nonprofits, she oversaw a multi-state network with $650M in revenue and $1.3B in assets.

She also brings a strong foundation in construction, affordable, supportive, and transitional housing development, property and asset management, and capital expansions for primary and behavioral health care and community facilities, including senior housing and aging-in-place initiatives, nursing homes, senior centers, and multi-purpose art spaces.',
  'Office & Field Assistance',
  E'Luna and Lady, our on-site morale officers and the namesake of a side business we own, Luna and Lady Cleaning Services.\n',
  'https://lunaladycleaning.com',
  'Consultants & Subject Experts',
  'We collaborate with experienced consultants and subject-matter experts to accelerate approvals, resolve complex site conditions, and deliver compliant, predictable outcomes.',
  'Social Impact',
  'As a family-owned company rooted in humble beginnings, our faith and values guide our work. In 2018, we donated land to a local church in the Dominican Republic to enable a new temple and community center. As we grow, we reinvest in the communities we serve—because building better places starts with investing in people.',
  'Professional Credentials',
  ARRAY['EPA Certified Firm NAT-F220339-1', 'MBE 66751', 'NYC DCA HIC 1453885-DCA', 'NYC DOB GC 605715', 'Mechanical Refrigeration 1818006017', 'NYC DOB Reg 002869']::text[],
  'Ready to start your project?',
  'Contact Us'
);

-- Service Page Content
INSERT INTO public.cms_service_page (
  id, hero_eyebrow, hero_title, hero_description,
  services_section_title, services_section_description,
  gc_title, gc_description,
  consulting_title, consulting_description,
  fm_title, fm_description,
  fm_preventive_title, fm_reactive_title, fm_reactive_description,
  emergency_cta_title, emergency_cta_description, emergency_cta_button_text,
  final_cta_title, final_cta_button1_text, final_cta_button2_text
) VALUES (
  'a1152e74-09ac-431a-84c2-4b64fb01aee2',
  'What we do',
  'Building systems that just work',
  'Comprehensive construction and MEP services backed by deep technical expertise and proven reliability',
  'Comprehensive construction and MEP expertise',
  'Choose a category to learn more',
  'General Construction',
  'We deliver ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities with end-to-end quality control.',
  'Consulting and Permitting',
  'We provide design coordination, engineering oversight, permits, and strategic violation resolution to keep your project compliant and on schedule.',
  'Facility Maintenance & Emergency Response',
  'KNova Contractors provides boutique-style facility operations with preventive and reactive maintenance, delivering scheduled preventive care and rapid response to keep operations smooth. Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs. If you''re a property owner, landlord, facility manager, or co-op board member, we tailor solutions to your building and priorities to save time, control costs, and simplify operations.',
  'Preventive Maintenance',
  'Reactive Maintenance Services',
  'Reactive maintenance addresses failures after they occur. While it is not a primary strategy for critical assets, it is essential for emergencies and unplanned events. When issues arise, we mobilize fast.',
  '24/7 Facility Emergency Services',
  'Our 24/7 service provides on-call technical support for unexpected incidents across critical building systems, with immediate, professional response at any time.',
  'Request 24/7 Service',
  'Ready to start your project?',
  'Contact Us',
  'See projects'
);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Note: Storage buckets must be created via Supabase dashboard or API
-- Bucket name: cms-media (public)

-- ============================================
-- END OF EXPORT
-- ============================================
