import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Award, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import knovaReverseLogo from "@/assets/knova-reverse.svg";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [showCerts, setShowCerts] = useState(false);
  const [settings, setSettings] = useState({
    logo_url: knovaReverseLogo,
    contact_email: "info@knovacontractors.com",
    contact_phone: "(201) 525-5365",
    address: "252 Hudson St\nHackensack, NJ 07601",
    copyright_text: "© {year} KNova Contractors, Inc. All rights reserved.",
    company_description: "Building Trust. Delivering Quality.",
  });
  
  const [certifications, setCertifications] = useState([
    "EPA Certified Firm NAT-F220339-1",
    "MBE 66751",
    "NYC DCA HIC 1453885-DCA",
    "NYC DOB GC 605715",
    "Mechanical Refrigeration 1818006017",
    "NYC DOB Reg 002869",
  ]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: siteSettings } = await supabase
        .from("cms_site_settings")
        .select("logo_url, contact_email, contact_phone, address")
        .limit(1)
        .maybeSingle();

      const { data: footerContent } = await supabase
        .from("cms_footer_content")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (siteSettings || footerContent) {
        setSettings({
          logo_url: footerContent?.logo_url || siteSettings?.logo_url || knovaReverseLogo,
          contact_email: footerContent?.email || siteSettings?.contact_email || "info@knovacontractors.com",
          contact_phone: footerContent?.phone || siteSettings?.contact_phone || "(201) 525-5365",
          address: footerContent?.address_line_1 && footerContent?.address_line_2 
            ? `${footerContent.address_line_1}\n${footerContent.address_line_2}`
            : siteSettings?.address || "252 Hudson St\nHackensack, NJ 07601",
          copyright_text: footerContent?.copyright_text || "© {year} KNova Contractors, Inc. All rights reserved.",
          company_description: footerContent?.company_description || "Building Trust. Delivering Quality.",
        });

        if (footerContent?.certifications && footerContent.certifications.length > 0) {
          setCertifications(footerContent.certifications);
        }
      }
    } catch (error) {
      console.error("Error loading footer settings:", error);
    }
  };

  const quickLinks = [
    { label: "Who We Are", path: "/who-we-are" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Certifications Bar - Desktop */}
      <div className="border-b border-primary-foreground/20 hidden md:block">
        <div className="container-narrow py-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-90">
            {certifications.map((cert, i) => (
              <span key={i} className="whitespace-nowrap">
                {i > 0 && <span className="mr-6">•</span>}
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Bar - Mobile (Collapsible) */}
      <div className="border-b border-primary-foreground/20 md:hidden">
        <div className="container-narrow py-4">
          <Button
            variant="ghost"
            onClick={() => setShowCerts(!showCerts)}
            className="w-full flex items-center justify-between text-primary-foreground hover:bg-primary-foreground/10"
          >
            <span className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4" />
              Licenses & Certifications
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showCerts ? 'rotate-180' : ''}`} />
          </Button>
          
          {showCerts && (
            <div className="mt-4 space-y-2 text-xs opacity-90">
              {certifications.map((cert, i) => (
                <div key={i} className="py-1">
                  {cert}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-narrow py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {/* Logo - Centered on mobile */}
          <div className="flex justify-center md:justify-start">
            <img src={settings.logo_url} alt="KNova Contractors" style={{ width: '200px' }} />
          </div>

          {/* Desktop: Three columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Block */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3 text-[15px] opacity-90">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, '<br />') }} />
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${settings.contact_phone.replace(/\D/g, '')}`} className="hover:text-accent transition-colors">
                    {settings.contact_phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-accent transition-colors">
                    {settings.contact_email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-[15px] opacity-90 hover:text-accent hover:opacity-100 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-3">KNova Contractors</h2>
              <p className="text-[15px] opacity-90 mb-4">{settings.company_description}</p>
              <p className="text-[13px] opacity-75">
                MBE-certified general contractor serving New York and New Jersey
              </p>
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="md:hidden space-y-8">
            {/* Contact Block */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3 text-[15px] opacity-90">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, '<br />') }} />
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${settings.contact_phone.replace(/\D/g, '')}`} className="hover:text-accent transition-colors">
                    {settings.contact_phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-accent transition-colors">
                    {settings.contact_email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-[15px] opacity-90 hover:text-accent hover:opacity-100 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Description - Below Quick Links on Mobile */}
            <div>
              <h2 className="text-xl font-bold mb-3">KNova Contractors</h2>
              <p className="text-[15px] opacity-90 mb-4">{settings.company_description}</p>
              <p className="text-[13px] opacity-75">
                MBE-certified general contractor serving New York and New Jersey
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-xs opacity-75 text-center">
            {settings.copyright_text.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
