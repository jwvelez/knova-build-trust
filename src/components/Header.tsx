import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import knovaLogo from "@/assets/knova.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Who We Are", path: "/who-we-are" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container-narrow">
        <div className="flex items-center justify-between py-[12px] md:py-[15px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={knovaLogo} alt="KNova Contractors" className="h-[49px] md:h-[65px]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors hover:text-accent ${
                  isActive(item.path) ? "text-accent font-semibold" : "text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:2015255365" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>(201) 525-5365</span>
            </a>
            <Button asChild size="lg">
              <Link to="/contact">Request a Bid</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-[#1E3480] p-3 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-narrow py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[16px] font-medium py-2 transition-colors ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us Today
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white">
                <a href="tel:2015255365">
                  <Phone className="h-4 w-4" />
                  <span>(201) 525-5365</span>
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
