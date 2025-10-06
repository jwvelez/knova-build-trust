import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Phone, Hammer, Wind, Zap, Droplet, Flame, Building2, Heart, GraduationCap, Users, Store, ShoppingBag, Building, Factory } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-construction.jpg";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";
import interstitial1 from "@/assets/interstitial-1.jpg";
import interstitial2 from "@/assets/interstitial-2.jpg";

const Index = () => {
  const trustBadges = [
    "MBE certified",
    "Fully licensed and insured",
    "NYC DOB compliant",
    "EPA Certified Firm",
  ];

  const valueProps = [
    {
      title: "GC leadership — from preconstruction to closeout",
      desc: "Comprehensive project management with rigorous quality control at every phase",
    },
    {
      title: "MEP depth — HVAC, electrical, plumbing delivered right",
      desc: "Deep technical expertise in building systems that ensures reliable performance",
    },
    {
      title: "Compliance first — predictable schedules and inspections",
      desc: "Code-compliant execution that keeps projects on track and on budget",
    },
  ];

  const services = [
    {
      title: "General Construction",
      desc: "Ground-up builds and full gut renovations with rigorous quality control",
      icon: Hammer,
    },
    {
      title: "HVAC Systems",
      desc: "Design, installation, and service that support electrification and better air quality",
      icon: Wind,
    },
    {
      title: "Electrical and Low-Voltage",
      desc: "Modern power, upgrades, and structured cabling built for today's demand",
      icon: Zap,
    },
    {
      title: "Plumbing and Piping",
      desc: "Efficient water, sanitary, and gas with minimal disruption to occupants",
      icon: Droplet,
    },
    {
      title: "Fire and Life Safety",
      desc: "Sprinkler design, installation, and maintenance that protect people and assets",
      icon: Flame,
    },
    {
      title: "Property and Facility Management",
      desc: "Preventive programs and 24/7 service that keep facilities reliable",
      icon: Building2,
    },
  ];

  const industries = [
    { label: "Healthcare", detail: "FQHC, Article 28 and 31, behavioral health", icon: Heart },
    { label: "Housing", detail: "supportive, transitional, private residential, multifamily", icon: Building },
    { label: "Education and Day Care", detail: "safe, code-ready learning spaces", icon: GraduationCap },
    { label: "Senior Living", detail: "reliable systems, quiet operations", icon: Users },
    { label: "Community Facilities", detail: "arts and cultural, community centers", icon: Users },
    { label: "Commercial and Office", detail: "tenant-ready buildouts and refresh", icon: Building2 },
    { label: "Mixed-Use", detail: "retail and residential coordination", icon: Store },
    { label: "Restaurants and Retail", detail: "fast turnarounds, clean inspections", icon: ShoppingBag },
  ];

  const projects = [
    {
      title: "Commercial Office, Manhattan",
      desc: "Steel framing, new kitchen and baths, upgraded HVAC and electrical",
      image: projectOffice,
    },
    {
      title: "Community Health Centers, Bronx",
      desc: "Expansions with added capacity and integrated data systems",
      image: projectHealth,
    },
    {
      title: "Day Care Centers, Bronx & Brooklyn",
      desc: "One new build, one renovation and expansion",
      image: projectDaycare,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <p className="overline">General Contracting + Building Systems</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                Construction you can trust, building systems that just work
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                MBE-certified, licensed, and insured general contractor for New York and New Jersey with deep HVAC, electrical, and plumbing expertise
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Request a bid</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">Explore services</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">24/7 Service:</span>
                <a href="tel:1234567890" className="font-medium link-accent">
                  (123) 456-7890
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Construction team collaborating on site"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-16 pt-8 border-t accent-divider">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Trio */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, i) => (
              <Card key={i} className="p-8 card-lift bg-card">
                <h3 className="text-lg font-semibold mb-3 text-primary">{prop.title}</h3>
                <p className="text-sm text-muted-foreground">{prop.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 link-accent font-medium hover:gap-3 transition-all group">
              See how we deliver
              <ArrowRight className="h-4 w-4 arrow-shift" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="section-padding">
        <div className="container-narrow">
          <p className="overline mb-4">What we do</p>
          <h2 className="text-3xl md:text-4xl mb-4">From new builds to building systems, one team delivers</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Card key={i} className="p-6 card-lift border-border group">
                  <Icon className="h-9 w-9 mb-4 text-primary stroke-[2px] group-hover:text-accent transition-colors" />
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services" className="group">
                See all services
                <ArrowRight className="ml-2 h-4 w-4 arrow-shift" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Interstitial 1 */}
      <section className="py-0 bg-secondary/30">
        <div className="w-full">
          <img
            src={interstitial1}
            alt="Construction team at work"
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Industries Strip */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl mb-12 text-center">
            Built for the places people live, learn, heal, and work
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div key={i} className="text-center space-y-3 group cursor-pointer">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Icon className="h-8 w-8 text-primary group-hover:text-accent-foreground stroke-[2px]" />
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-accent transition-colors">{industry.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">{industry.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-narrow">
          <p className="overline mb-4">Results over rhetoric</p>
          <h2 className="text-3xl md:text-4xl mb-12">Featured Projects</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <Card key={i} className="overflow-hidden card-lift border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects" className="group">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4 arrow-shift" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Interstitial 2 */}
      <section className="py-0 bg-secondary/30">
        <div className="w-full">
          <img
            src={interstitial2}
            alt="Building systems installation"
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Leadership Snapshot */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl mb-12">Accountability at the top, reliability in the field</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-3">Keily J. Nova</h3>
              <p className="text-sm text-muted-foreground mb-4">Founder and President</p>
              <p className="text-sm leading-relaxed">
                Field-first leader with deep HVAC expertise and 20+ years in construction. Licensed in New York and New Jersey, leading operations with a focus on safety, quality, and performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Lymaris Albors</h3>
              <p className="text-sm text-muted-foreground mb-4">Co-Founder</p>
              <p className="text-sm leading-relaxed">
                Executive operator focused on quality, compliance, and sustainable growth. 20+ years of nonprofit leadership with expertise in operations and strategic partnerships.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link to="/who-we-are" className="group">
                Meet the team
                <ArrowRight className="ml-2 h-4 w-4 arrow-shift" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final Blades */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Impact */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">We build for people, not just places</h2>
              <p className="text-muted-foreground leading-relaxed">
                Family-owned and community-minded with a commitment to reinvest locally. In 2018 we donated land in the Dominican Republic to support a new temple and community center. As we grow, we aim that our work lifts neighborhoods along with our projects.
              </p>
              <p className="font-medium text-primary">Because building better places means investing in people</p>
            </div>

            {/* 24/7 Service */}
            <Card className="p-8 bg-primary text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Reactive when you need it, preventive before you do</h2>
              <p className="mb-6 opacity-90">
                Facility management, preventive programs, and 24/7 response that keep buildings running
              </p>
              <div className="space-y-4">
                <Button size="lg" variant="secondary" asChild className="w-full">
                  <Link to="/contact">Request Service 24/7</Link>
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <a href="tel:1234567890" className="font-medium hover:opacity-80 transition-opacity">
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
