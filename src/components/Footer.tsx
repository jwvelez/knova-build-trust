import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import knovaReverseLogo from "@/assets/knova-reverse.svg";

const Footer = () => {
  const certifications = [
    "EPA Certified Firm NAT-F220339-1",
    "MBE 66751",
    "NYC DCA HIC 1453885-DCA",
    "NYC DOB GC 605715",
    "Mechanical Refrigeration 1818006017",
    "NYC DOB Reg 002869",
  ];

  const quickLinks = [
    { label: "Who We Are", path: "/who-we-are" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Certifications Bar */}
      <div className="border-b border-primary-foreground/20">
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

      {/* Main Footer */}
      <div className="container-narrow py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {/* Logo - Centered on mobile */}
          <div className="flex justify-center md:justify-start">
            <img src={knovaReverseLogo} alt="KNova Contractors" className="h-20" />
          </div>

          {/* Two-column layout on mobile, three on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Block */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3 text-sm opacity-90">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>252 Hudson St<br />Hackensack, NJ 07601</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href="tel:2015255365" className="hover:text-accent transition-colors">
                    (201) 525-5365
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:info@knovacontractors.com" className="hover:text-accent transition-colors">
                    info@knovacontractors.com
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
                    className="block text-sm opacity-90 hover:text-accent hover:opacity-100 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-3">KNova Contractors</h2>
              <p className="text-sm opacity-90 mb-4">Building Trust. Delivering Quality.</p>
              <p className="text-xs opacity-75">
                MBE-certified general contractor serving New York and New Jersey
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-xs opacity-75 text-center">
            © {new Date().getFullYear()} KNova Contractors, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
