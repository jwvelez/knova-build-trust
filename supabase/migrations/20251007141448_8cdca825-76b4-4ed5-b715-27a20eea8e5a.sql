-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User roles enum
CREATE TYPE app_role AS ENUM ('admin', 'editor', 'viewer');

-- Content status
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Audit action types
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'publish', 'unpublish', 'login');

-- ============================================================================
-- USER ROLES TABLE
-- ============================================================================

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.can_edit()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
$$;

-- ============================================================================
-- SITE SETTINGS (Singleton)
-- ============================================================================

CREATE TABLE public.cms_site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL DEFAULT 'Knova Construction',
    site_description TEXT,
    brand_color TEXT DEFAULT '#0F172A',
    logo_url TEXT,
    favicon_url TEXT,
    social_links JSONB DEFAULT '{}',
    contact_email TEXT,
    contact_phone TEXT,
    address TEXT,
    navigation JSONB NOT NULL DEFAULT '[]',
    footer_content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default site settings
INSERT INTO public.cms_site_settings (
    site_title,
    site_description,
    navigation,
    footer_content
) VALUES (
    'Knova Construction',
    'Professional construction and MEP services',
    '[
        {"label": "Who We Are", "href": "/who-we-are"},
        {"label": "Services", "href": "/services"},
        {"label": "Projects", "href": "/projects"},
        {"label": "Contact", "href": "/contact"}
    ]'::jsonb,
    '{
        "tagline": "Building systems that just work",
        "description": "Professional construction and MEP services backed by deep technical expertise",
        "columns": [
            {
                "title": "Company",
                "links": [
                    {"label": "Who We Are", "href": "/who-we-are"},
                    {"label": "Services", "href": "/services"},
                    {"label": "Projects", "href": "/projects"}
                ]
            },
            {
                "title": "Contact",
                "links": [
                    {"label": "Get in Touch", "href": "/contact"}
                ]
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- SEO DEFAULTS & OVERRIDES
-- ============================================================================

CREATE TABLE public.cms_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'default', 'page', 'project', etc.
    entity_id UUID, -- NULL for defaults, FK for specific entities
    title TEXT NOT NULL,
    description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    og_type TEXT DEFAULT 'website',
    robots_index BOOLEAN DEFAULT TRUE,
    robots_follow BOOLEAN DEFAULT TRUE,
    keywords TEXT[],
    structured_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (entity_type, entity_id)
);

-- Insert default SEO
INSERT INTO public.cms_seo (entity_type, title, description) VALUES
('default', 'Knova Construction - Professional Construction & MEP Services', 'Expert construction and MEP services in NYC. Specializing in commercial, residential, healthcare, and educational facilities.');

-- ============================================================================
-- PAGES
-- ============================================================================

CREATE TABLE public.cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    status content_status NOT NULL DEFAULT 'draft',
    sections JSONB NOT NULL DEFAULT '[]', -- Array of typed sections
    hero_image TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id),
    version INTEGER NOT NULL DEFAULT 1
);

-- Seed pages with existing content
INSERT INTO public.cms_pages (slug, title, status, sections, published_at) VALUES
('home', 'Home', 'published', '[
    {
        "type": "hero",
        "title": "Systems that deliver.",
        "subtitle": "We build infrastructure that works—so communities can thrive.",
        "image": "/assets/hero-construction.jpg",
        "cta": {"label": "See Our Work", "href": "/projects"}
    },
    {
        "type": "intro",
        "eyebrow": "Who we are",
        "title": "Precision. Reliability. Results.",
        "description": "Knova is a minority-owned construction and MEP contractor serving New York City since 1999."
    }
]'::jsonb, NOW());

-- ============================================================================
-- PROJECTS
-- ============================================================================

CREATE TABLE public.cms_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    year TEXT NOT NULL,
    category TEXT NOT NULL,
    size TEXT,
    description TEXT,
    details TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status content_status NOT NULL DEFAULT 'draft',
    display_order INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Seed projects
INSERT INTO public.cms_projects (title, slug, year, category, size, details, image_url, featured, status, display_order, published_at) VALUES
(
    'Commercial Office — Manhattan',
    'commercial-office-manhattan',
    '2025',
    'Commercial',
    '7,800 sf',
    ARRAY[
        'Steel framing and structural work',
        'New kitchen and bathroom installations',
        'Upgraded HVAC system with modern controls',
        'Complete electrical system upgrade',
        'Tenant-ready, flexible workspace design',
        'Fully compliant with NYC DOB requirements'
    ],
    '/assets/project-office.jpg',
    TRUE,
    'published',
    1,
    NOW()
),
(
    'Residential Apartment — Manhattan',
    'residential-apartment-manhattan',
    '2024',
    'Housing',
    '1,200 sf',
    ARRAY[
        'Full gut renovation from studs',
        'New plumbing throughout with upgraded fixtures',
        'High-efficiency HVAC installation',
        'Complete electrical rewiring and panel upgrade',
        'Delivered two weeks ahead of schedule',
        'Improved comfort and energy efficiency'
    ],
    '/assets/project-office.jpg',
    TRUE,
    'published',
    2,
    NOW()
);

-- ============================================================================
-- SERVICES
-- ============================================================================

CREATE TABLE public.cms_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- lucide icon name
    details TEXT,
    display_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Seed services
INSERT INTO public.cms_services (title, slug, description, icon, featured, status, display_order, published_at) VALUES
('Comprehensive General Construction', 'general-construction', 'Ground-up builds and full gut renovations with rigorous quality control', 'Hammer', TRUE, 'published', 1, NOW()),
('Energy-Efficient HVAC Systems', 'hvac-systems', 'Design, installation, and service that support electrification and better air quality', 'Wind', TRUE, 'published', 2, NOW()),
('Electrical and Low-Voltage Systems', 'electrical-systems', 'Modern power, upgrades, and structured cabling built for today''s demand', 'Zap', TRUE, 'published', 3, NOW()),
('Plumbing and Piping Systems', 'plumbing-systems', 'Efficient water, sanitary, and gas with minimal disruption to occupants', 'Droplet', TRUE, 'published', 4, NOW());

-- ============================================================================
-- MEDIA LIBRARY
-- ============================================================================

CREATE TABLE public.cms_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    dominant_color TEXT,
    metadata JSONB DEFAULT '{}',
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- CONTENT VERSIONS
-- ============================================================================

CREATE TABLE public.cms_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'page', 'project', 'service', etc.
    entity_id UUID NOT NULL,
    version INTEGER NOT NULL,
    content JSONB NOT NULL, -- Full snapshot
    changed_by UUID REFERENCES auth.users(id),
    change_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (entity_type, entity_id, version)
);

-- ============================================================================
-- AUDIT LOG
-- ============================================================================

CREATE TABLE public.cms_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action audit_action NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit_log ENABLE ROW LEVEL SECURITY;

-- User Roles Policies
CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own role" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Site Settings Policies
CREATE POLICY "Anyone can view site settings" ON public.cms_site_settings
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins can update site settings" ON public.cms_site_settings
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- SEO Policies
CREATE POLICY "Anyone can view published SEO" ON public.cms_seo
    FOR SELECT USING (TRUE);

CREATE POLICY "Editors can manage SEO" ON public.cms_seo
    FOR ALL USING (public.can_edit());

-- Pages Policies
CREATE POLICY "Anyone can view published pages" ON public.cms_pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Editors can view all pages" ON public.cms_pages
    FOR SELECT USING (public.can_edit());

CREATE POLICY "Editors can manage pages" ON public.cms_pages
    FOR ALL USING (public.can_edit());

-- Projects Policies
CREATE POLICY "Anyone can view published projects" ON public.cms_projects
    FOR SELECT USING (status = 'published');

CREATE POLICY "Editors can view all projects" ON public.cms_projects
    FOR SELECT USING (public.can_edit());

CREATE POLICY "Editors can manage projects" ON public.cms_projects
    FOR ALL USING (public.can_edit());

-- Services Policies
CREATE POLICY "Anyone can view published services" ON public.cms_services
    FOR SELECT USING (status = 'published');

CREATE POLICY "Editors can view all services" ON public.cms_services
    FOR SELECT USING (public.can_edit());

CREATE POLICY "Editors can manage services" ON public.cms_services
    FOR ALL USING (public.can_edit());

-- Media Policies
CREATE POLICY "Anyone can view media" ON public.cms_media
    FOR SELECT USING (TRUE);

CREATE POLICY "Editors can upload media" ON public.cms_media
    FOR INSERT WITH CHECK (public.can_edit());

CREATE POLICY "Editors can manage media" ON public.cms_media
    FOR ALL USING (public.can_edit());

-- Versions Policies
CREATE POLICY "Editors can view versions" ON public.cms_versions
    FOR SELECT USING (public.can_edit());

CREATE POLICY "Editors can create versions" ON public.cms_versions
    FOR INSERT WITH CHECK (public.can_edit());

-- Audit Log Policies
CREATE POLICY "Admins can view audit log" ON public.cms_audit_log
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit log" ON public.cms_audit_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_site_settings_updated_at BEFORE UPDATE ON public.cms_site_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_seo_updated_at BEFORE UPDATE ON public.cms_seo
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_pages_updated_at BEFORE UPDATE ON public.cms_pages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_projects_updated_at BEFORE UPDATE ON public.cms_projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_services_updated_at BEFORE UPDATE ON public.cms_services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- VERSION TRACKING TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_version_snapshot()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.cms_versions (
        entity_type,
        entity_id,
        version,
        content,
        changed_by
    ) VALUES (
        TG_TABLE_NAME,
        NEW.id,
        NEW.version,
        row_to_json(NEW),
        auth.uid()
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER create_page_version AFTER INSERT OR UPDATE ON public.cms_pages
    FOR EACH ROW EXECUTE FUNCTION public.create_version_snapshot();

CREATE TRIGGER create_project_version AFTER INSERT OR UPDATE ON public.cms_projects
    FOR EACH ROW EXECUTE FUNCTION public.create_version_snapshot();

CREATE TRIGGER create_service_version AFTER INSERT OR UPDATE ON public.cms_services
    FOR EACH ROW EXECUTE FUNCTION public.create_version_snapshot();

-- ============================================================================
-- STORAGE BUCKET FOR MEDIA
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'cms-media',
    'cms-media',
    TRUE,
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
);

-- Storage policies
CREATE POLICY "Anyone can view media" ON storage.objects
    FOR SELECT USING (bucket_id = 'cms-media');

CREATE POLICY "Editors can upload media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'cms-media' 
        AND (SELECT public.can_edit())
    );

CREATE POLICY "Editors can delete media" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'cms-media'
        AND (SELECT public.can_edit())
    );