import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Wrench, Zap, Droplets, Flame, Settings, Heart, Clock, CheckCircle, Award, Phone } from "lucide-react";
import heroConstruction from "@/assets/hero-construction.jpg";
import knovaReverseLogo from "@/assets/knova-reverse.svg";

const Index = () => {
  const whatWeDoServices = [
    {
      icon: Building2,
      title: "General Construction",
      description: "Ground-up builds and full gut renovations with rigorous quality control",
    },
    {
      icon: Wrench,
      title: "HVAC Systems",
      description: "High-efficiency design, installation, and service that support electrification and better air quality",
    },
    {
      icon: Zap,
      title: "Electrical & Low-Voltage",
      description: "Modern power distribution, upgrades, lighting/controls, and structured cabling",
    },
    {
      icon: Droplets,
      title: "Plumbing & Piping",
      description: "Efficient water, sanitary, and gas with minimal disruption to occupants",
    },
    {
      icon: Flame,
      title: "Fire & Life Safety",
      description: "Sprinkler design, installation, and maintenance for safe, code-ready buildings",
    },
    {
      icon: Settings,
      title: "Property & Facility Management",
      description: "Preventive programs and 24/7 service that keep facilities reliable",
    },
  ];

  const whoWeServeIndustries = [
    "Healthcare",
    "Education & Day Care",
    "Community Facilities",
    "Mixed-Use",
    "Housing",
    "Senior Living",
    "Commercial & Office",
    "Restaurants & Retail",
  ];

  const howWeDeliverBullets = [
    {
      title: "GC leadership from preconstruction to closeout",
      description: "Budgeting, scheduling, and on-site coordination end to end",
    },
    {
      title: "MEP depth where it matters",
      description: "Integrated HVAC, electrical, and plumbing executed right the first time",
    },
    {
      title: "Compliance first",
      description: "EPA, NYC DOB, and MBE certified with proactive permitting and inspection prep",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-white" />
          <div className="container-narrow relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-20 lg:py-24">
              {/* Text Content */}
              <div className="space-y-6">
                <p className="overline text-accent/90">GENERAL CONTRACTING + BUILDING SYSTEMS</p>
                <h1 className="text-white">Construction you can trust, building systems that just work</h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-[600px]">
                  MBE-certified, licensed, and insured. Deep HVAC, electrical, and plumbing expertise for New York and New Jersey
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="border-white text-white hover:bg-white hover:text-primary">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-2xl">
                  <img 
                    src={heroConstruction} 
                    alt="Construction site"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Deliver */}
        <section className="section-padding bg-gradient-to-b from-white to-secondary/30">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Info Card */}
              <div className="space-y-8">
                <div>
                  <p className="overline">OUR APPROACH</p>
                  <h2 className="mb-4">How We Deliver</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Proven process, predictable outcomes at every stage
                  </p>
                </div>

                <div className="space-y-6">
                  {howWeDeliverBullets.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Deep Blue Panel */}
              <Card className="bg-primary text-white p-8 lg:p-12 flex flex-col justify-between border-0 rounded-2xl relative overflow-hidden">
                <div className="absolute top-8 right-8 opacity-10">
                  <img src={knovaReverseLogo} alt="" className="w-32 h-auto" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl mb-8 leading-tight text-white">
                    Building trust. Delivering quality.
                  </h3>
                  <Button asChild variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    <Link to="/who-we-are">See How We Deliver</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="overline">WHAT WE DO</p>
              <h2 className="mb-4">From new builds to building systems, one team delivers</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive construction and MEP services tailored to your project needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {whatWeDoServices.map((service, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className="mb-4 flex justify-center">
                    <service.icon className="h-10 w-10 text-accent transition-colors duration-200 group-hover:text-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:underline transition-all">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="ghost" size="lg">
                <Link to="/services">See All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="overline">WHO WE SERVE</p>
              <h2 className="mb-4">Built for the places people live, learn, heal, and work</h2>
              <p className="text-lg text-muted-foreground mb-12">
                Serving diverse sectors with specialized expertise
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {whoWeServeIndustries.map((industry, i) => (
                <div
                  key={i}
                  className="px-6 py-4 bg-white rounded-xl border border-accent/20 text-center font-medium text-foreground hover:border-accent hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Snapshot */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="overline">LEADERSHIP</p>
              <h2 className="mb-4">Builders who understand your goals</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience across regulated environments with zero-disruption delivery
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { label: "20+ Years", icon: Award },
                { label: "100+ Projects", icon: Building2 },
                { label: "MBE Certified", icon: Award },
                { label: "2 States", icon: Building2 },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/20"
                >
                  <stat.icon className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="ghost" size="lg">
                <Link to="/who-we-are">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final 50/50 Blades */}
        <section className="grid md:grid-cols-2">
          {/* Social Impact - Light Panel */}
          <div className="bg-secondary/50 p-12 lg:p-16 flex items-center">
            <div className="max-w-xl">
              <Heart className="h-10 w-10 text-accent mb-6" />
              <h3 className="mb-4">We build for people, not just places</h3>
              <p className="text-muted-foreground leading-relaxed">
                Family-owned and community-minded. We employ local talent, support workforce development, and invest in the neighborhoods where we work. Because building better places starts with investing in people.
              </p>
            </div>
          </div>

          {/* 24/7 Maintenance - Deep Blue Panel */}
          <div className="bg-primary text-white p-12 lg:p-16 flex items-center">
            <div className="max-w-xl">
              <Clock className="h-10 w-10 text-white/90 mb-6" />
              <h3 className="mb-4 text-white">Reactive when you need it, preventive before you do</h3>
              <p className="text-white/90 leading-relaxed mb-8">
                Facility management, preventive programs, and 24/7 response that keep buildings running.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Request Service 24/7
                </Button>
                <a href="tel:2015255365" className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors text-lg font-medium">
                  <Phone className="h-5 w-5" />
                  <span>(201) 525-5365</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
