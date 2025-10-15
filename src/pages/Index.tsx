import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Phone, Hammer, Wind, Zap, Droplet, Flame, Building2, Heart, GraduationCap, Users, Store, ShoppingBag, Building, Wrench, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-construction.jpg";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";
import interstitial1 from "@/assets/interstitial-1.jpg";
import interstitial2 from "@/assets/interstitial-2.jpg";
import fullWidthServices from "@/assets/full-width-services.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";


const Index = () => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("sections")
        .eq("slug", "home")
        .maybeSingle();

      if (error) throw error;
      
      if (data?.sections) {
        setContent(data.sections);
      }
    } catch (error) {
      console.error("Error loading homepage content:", error);
    } finally {
      setLoading(false);
    }
  };

  const trustBadges = (content.trust_badges || "MBE certified, Fully licensed and insured, NYC DOB compliant, EPA Certified Firm").split(", ");

  const valueProps = [
    {
      title: content.value_prop_1_title || "GC leadership — from preconstruction to closeout",
      desc: content.value_prop_1_desc || "Comprehensive project management with rigorous quality control at every phase",
      primaryIcon: Hammer,
      accentIcon: Shield,
    },
    {
      title: content.value_prop_2_title || "MEP depth — HVAC, electrical, plumbing delivered right",
      desc: content.value_prop_2_desc || "Deep technical expertise in building systems that ensures reliable performance",
      primaryIcon: Wrench,
      accentIcon: Zap,
    },
    {
      title: content.value_prop_3_title || "Compliance first — predictable schedules and inspections",
      desc: content.value_prop_3_desc || "Code-compliant execution that keeps projects on track and on budget",
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
    { label: "Healthcare", detail: "FQHCs and Article 28/31 facilities, including OASAS programs", icon: Heart, filter: "healthcare" },
    { label: "Senior Living", detail: "Nursing homes and senior centers with quiet, reliable systems", icon: Users, filter: "housing" },
    { label: "Education & Day Care", detail: "Safe, code-ready spaces for learning and care", icon: GraduationCap, filter: "education" },
    { label: "Housing", detail: "Supportive, transitional, and private residential projects", icon: Building, filter: "housing" },
    { label: "Restaurants & Retail", detail: "Fast turnarounds, clean inspections, tenant-ready", icon: ShoppingBag, filter: "restaurants-retail" },
    { label: "Community & Culture", detail: "Arts and cultural spaces built for daily use", icon: Users, filter: "all" },
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1] lg:leading-[1.1]">
                {content.hero_heading || "Construction you can trust, building systems that just work"}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                {content.hero_description || "MBE-certified, licensed, and insured general contractor for New York and New Jersey with deep HVAC, electrical, and plumbing expertise"}
              </p>
              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                <Button size="lg" asChild className="flex-1 md:flex-initial">
                  <Link to="/contact">{content.hero_cta_primary || "Contact Us"}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="flex-1 md:flex-initial">
                  <Link to="/services">{content.hero_cta_secondary || "Explore services"}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={heroImage}
                  alt="Construction team collaborating on site"
                  className="w-full h-[500px] lg:h-[700px] object-cover object-center"
                  loading="eager"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-16 pt-8 border-t accent-divider">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm md:text-[15px] font-medium">{badge}</span>
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
          <div className="absolute inset-0 bg-[#1a2850] opacity-90"></div>
          
          {/* Content Overlay - Desktop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-narrow w-full px-4">
              <div className="grid grid-cols-[60%_40%] gap-0">
                {/* Left Column - White Box */}
                <div className="bg-[#FAFAFA] p-14 lg:p-16">
                  <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">
                    {content.how_we_deliver_eyebrow || "Our Approach"}
                  </p>
                  <h2 className="text-3xl lg:text-4xl mb-2 text-primary">
                    {content.how_we_deliver_heading || "How we deliver"}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    {content.how_we_deliver_description || "Proven process, predictable outcomes at every stage"}
                  </p>
                  
              <div className="space-y-8 md:space-y-8">
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
                <div className="bg-[#1E3480] flex flex-col items-center justify-center p-14 lg:p-16">
                  <img
                    src="/src/assets/knova-reverse.svg"
                    alt="KNova Contractors"
                    className="h-32 lg:h-40 mb-6"
                  />
                  <p className="text-white text-2xl font-bold italic text-center mb-10">
                    Building trust. Delivering quality.
                  </p>
                  <Button size="lg" variant="secondary" asChild className="bg-white hover:bg-white/90 text-primary w-full">
                    <Link to="/contact">Contact Us</Link>
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
              <p className="uppercase text-xs tracking-wider text-accent font-medium mb-3">Our Approach</p>
              <h2 className="text-2xl mb-2 text-primary">How we deliver</h2>
              <p className="text-base text-muted-foreground mb-6 max-w-2xl">Proven process, predictable outcomes at every stage</p>
              
              <div className="space-y-4 md:space-y-4" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <div className="flex items-start gap-3 mb-[10px]">
                  <Hammer className="h-6 w-6 text-accent stroke-[2px] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold mb-1 text-primary">GC leadership — from preconstruction to closeout</h3>
                    <p className="text-sm text-muted-foreground">Full lifecycle support: budgeting, scheduling, and on-site coordination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-[10px]">
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
            <div className="bg-[#1E3480] flex flex-col items-start justify-center p-8 py-12">
              <img
                src="/src/assets/knova-reverse.svg"
                alt="KNova Contractors"
                className="h-24 mb-4"
              />
              <p className="text-white text-xl font-bold italic mb-6">
                Building trust. Delivering quality.
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white hover:bg-white/90 text-primary w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Services Teaser */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-col items-center mb-12">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-6 text-center">
              {content.services_eyebrow || "What we do"}
            </p>
            <h2 className="text-3xl md:text-4xl mb-8 text-center">
              {content.services_heading || "From new builds to building systems, one team delivers"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">
              {content.services_description || "Comprehensive construction and MEP services tailored to your project needs"}
            </p>
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
          <p className="uppercase text-sm tracking-wider text-accent font-medium mb-6">
            {content.industries_eyebrow || "Who we serve"}
          </p>
          <h2 className="text-3xl md:text-4xl mb-8">
            {content.industries_heading || "Built for the places people live, learn, heal, and work"}
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            {content.industries_description || "Serving diverse sectors with specialized expertise"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={i}
                  to={`/projects?filter=${industry.filter}`}
                  className="flex flex-col items-start gap-3 p-6 text-left group cursor-pointer transition-all border border-border rounded-lg hover:border-accent"
                  aria-label={`${industry.label}: ${industry.detail}`}
                >
                  <Icon className="h-8 w-8 text-accent stroke-[2px] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-accent group-hover:underline transition-colors">{industry.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{industry.detail}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">
            {content.projects_eyebrow || "Results over rhetoric"}
          </p>
          <h2 className="text-3xl md:text-4xl mb-2">
            {content.projects_heading || "Featured Projects"}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {content.projects_description || "Recent work showcasing our commitment to quality and performance"}
          </p>

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
              <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">Leadership</p>
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
              <div className="bg-white p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Years Combined Experience</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <div className="text-4xl font-bold text-primary mb-2">MBE</div>
                <p className="text-sm text-muted-foreground">Certified Contractor</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
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
            <div className="bg-white p-12 rounded-lg border border-border flex flex-col h-full">
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
            <Card className="p-12 bg-primary text-primary-foreground flex flex-col h-full">
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
