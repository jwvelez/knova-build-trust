import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Phone, Hammer, Wind, Zap, Droplet, Flame, Building2, Heart, GraduationCap, Users, Store, ShoppingBag, Building, Wrench, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-construction.jpg";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";
import interstitial1 from "@/assets/interstitial-1.jpg";
import interstitial2 from "@/assets/interstitial-2.jpg";
import fullWidthServices from "@/assets/full-width-services.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";

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
      primaryIcon: Hammer,
      accentIcon: Shield,
    },
    {
      title: "MEP depth — HVAC, electrical, plumbing delivered right",
      desc: "Deep technical expertise in building systems that ensures reliable performance",
      primaryIcon: Wrench,
      accentIcon: Zap,
    },
    {
      title: "Compliance first — predictable schedules and inspections",
      desc: "Code-compliant execution that keeps projects on track and on budget",
      primaryIcon: Check,
      accentIcon: Building2,
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl md:leading-tight leading-snug">
                Construction you can trust, building systems that just work
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                MBE-certified, licensed, and insured general contractor for New York and New Jersey with deep HVAC, electrical, and plumbing expertise
              </p>
              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                <Button size="lg" asChild className="flex-1 md:flex-initial">
                  <Link to="/contact">Request a bid</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="flex-1 md:flex-initial">
                  <Link to="/services">Explore services</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">24/7 Service:</span>
                <a href="tel:2015255365" className="font-medium link-accent">
                  (201) 525-5365
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

      {/* How We Deliver - Redesigned */}
      <section className="py-0 bg-secondary/30 relative">
        {/* Desktop: Image with overlay */}
        <div className="hidden md:block w-full relative">
          <img
            src={howWeDeliver}
            alt="Construction and building systems"
            className="w-full h-[600px] lg:h-[900px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#00020E] opacity-40"></div>
          
          {/* Content Overlay - Desktop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-narrow w-full px-4">
              <div className="grid grid-cols-[60%_40%] gap-0">
                {/* Left Column - White Box */}
                <div className="bg-[#FAFAFA] p-12 lg:p-16">
                  <p className="overline mb-4 text-primary text-sm">Our Approach</p>
                  <h2 className="text-3xl lg:text-4xl mb-2 text-primary">How we deliver</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl">Proven process, predictable outcomes at every stage</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Hammer className="h-8 w-8 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-[21px] font-bold mb-2 text-primary">GC leadership — from preconstruction to closeout</h3>
                        <p className="text-lg text-muted-foreground">Full lifecycle support: budgeting, scheduling, and on-site coordination</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="h-8 w-8 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-[21px] font-bold mb-2 text-primary">MEP depth — HVAC, electrical, plumbing delivered right</h3>
                        <p className="text-lg text-muted-foreground">In-house expertise for integrated mechanical and electrical systems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Shield className="h-8 w-8 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-[21px] font-bold mb-2 text-primary">Compliance first — predictable schedules and inspections</h3>
                        <p className="text-lg text-muted-foreground">EPA, NYC DOB, MBE certified. Proactive permitting and inspections management</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Blue Box */}
                <div className="bg-[#1E3480] flex flex-col items-center justify-center p-12 lg:p-16">
                  <img
                    src="/src/assets/knova-reverse.svg"
                    alt="KNova Contractors"
                    className="h-32 lg:h-40 mb-6"
                  />
                  <p className="text-white text-xl font-bold italic text-center mb-6">
                    Building trust. Delivering quality.
                  </p>
                  <Button size="lg" variant="secondary" asChild className="bg-white hover:bg-white/90 text-primary w-full">
                    <Link to="/contact">Request a bid</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: No image, full-width boxes */}
        <div className="md:hidden w-full">
          <div className="w-full">
            {/* Left Column - White Box */}
            <div className="bg-[#FAFAFA] p-8 py-12">
              <p className="overline mb-3 text-primary text-xs">Our Approach</p>
              <h2 className="text-2xl mb-2 text-primary">How we deliver</h2>
              <p className="text-base text-muted-foreground mb-6 max-w-2xl">Proven process, predictable outcomes at every stage</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Hammer className="h-6 w-6 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold mb-1 text-primary">GC leadership — from preconstruction to closeout</h3>
                    <p className="text-sm text-muted-foreground">Full lifecycle support: budgeting, scheduling, and on-site coordination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold mb-1 text-primary">MEP depth — HVAC, electrical, plumbing delivered right</h3>
                    <p className="text-sm text-muted-foreground">In-house expertise for integrated mechanical and electrical systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold mb-1 text-primary">Compliance first — predictable schedules and inspections</h3>
                    <p className="text-sm text-muted-foreground">EPA, NYC DOB, MBE certified. Proactive permitting and inspections management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Blue Box */}
            <div className="bg-[#1E3480] flex flex-col items-center justify-center p-8 py-12">
              <img
                src="/src/assets/knova-reverse.svg"
                alt="KNova Contractors"
                className="h-24 mb-4"
              />
              <p className="text-white text-base font-bold italic text-center mb-4">
                Building trust. Delivering quality.
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white hover:bg-white/90 text-primary w-full">
                <Link to="/contact">Request a bid</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Services Teaser */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-col items-center mb-12">
            <p className="overline mb-4 text-center">What we do</p>
            <h2 className="text-3xl md:text-4xl mb-2 text-center">From new builds to building systems, one team delivers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl text-center">Comprehensive construction and MEP services tailored to your project needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Card key={i} className="p-6 card-lift border-border group">
                  <Icon className="h-9 w-9 mb-4 text-accent stroke-[2px] group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-[19px] md:text-[22px] mb-2">{service.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{service.desc}</p>
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
          <p className="overline mb-4">Who we serve</p>
          <h2 className="text-3xl md:text-4xl mb-2">
            Built for the places people live, learn, heal, and work
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">Serving diverse sectors with specialized expertise</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={i} 
                  className="flex items-start gap-3 text-left group cursor-pointer transition-all"
                >
                  <Icon className="h-6 w-6 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[21px] md:text-[22px] group-hover:text-accent transition-colors mb-1">{industry.label}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">{industry.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <p className="overline mb-4">Results over rhetoric</p>
          <h2 className="text-3xl md:text-4xl mb-2">Featured Projects</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">Recent work showcasing our commitment to quality and performance</p>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <Card key={i} className="overflow-hidden card-lift border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg md:text-base mb-2">{project.title}</h3>
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


      {/* Leadership Snapshot - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/30 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container-narrow relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <p className="overline mb-4">Leadership</p>
              <h2 className="text-3xl md:text-4xl mb-4">Builders who understand your goals</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our team has delivered projects across healthcare, education, and commercial sectors. We understand the nuances of regulated environments—and the importance of zero disruption.
              </p>
              <Button variant="outline" size="lg" asChild className="group">
                <Link to="/who-we-are" className="flex items-center gap-2">
                  Meet the Team
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
            </div>

            {/* Right Column - Stats/Highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Years Combined Experience</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-primary mb-2">MBE</div>
                <p className="text-sm text-muted-foreground">Certified Contractor</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-accent mb-2">2</div>
                <p className="text-sm text-muted-foreground">State Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Blades */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Impact */}
            <div className="bg-white p-8 rounded-lg border border-border flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4">We build for people, not just places</h2>
              <p className="text-muted-foreground leading-relaxed flex-grow mb-6">
                Family-owned and community-minded with a commitment to reinvest locally. In 2018 we donated land in the Dominican Republic to support a new temple and community center. As we grow, we aim that our work lifts neighborhoods along with our projects.
              </p>
              <p className="font-medium text-primary mb-4">Because building better places means investing in people</p>
              <div className="mt-auto space-y-4">
                <Button size="lg" variant="default" asChild className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* 24/7 Service */}
            <Card className="p-8 bg-primary text-primary-foreground flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4">Reactive when you need it, preventive before you do</h2>
              <p className="mb-6 opacity-90 flex-grow">
                Facility management, preventive programs, and 24/7 response that keep buildings running
              </p>
              <div className="mt-auto flex flex-col items-end justify-end space-y-4">
                <Button size="lg" variant="secondary" asChild className="w-full">
                  <Link to="/contact">Request Service 24/7</Link>
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm w-full">
                  <Phone className="h-4 w-4" />
                  <a href="tel:2015255365" className="font-medium hover:opacity-80 transition-opacity">
                    (201) 525-5365
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
