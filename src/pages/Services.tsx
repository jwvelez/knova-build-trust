import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Droplet, Flame, Cable, Building2, Wrench, Flame as Fire } from "lucide-react";
import fullWidthServices from "@/assets/full-width-services.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
import consultingMeeting from "@/assets/consulting-meeting.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  const generalConstructionServices = [
    {
      id: "hvac",
      title: "Energy-Efficient HVAC Systems",
      description: "We design, install, and service high-efficiency HVAC systems that support electrification and measurably improve indoor air quality.",
      icon: Wind,
    },
    {
      id: "electrical",
      title: "Electrical and Low-Voltage Systems",
      description: "We deliver modern power distribution, service upgrades, lighting and controls, and structured cabling sized for today's electrical loads.",
      icon: Zap,
    },
    {
      id: "plumbing",
      title: "Plumbing and Piping Systems",
      description: "We install and repair domestic water, sanitary, and gas systems to code while minimizing disruption to occupants.",
      icon: Droplet,
    },
    {
      id: "fire",
      title: "Fire and Life Safety",
      description: "We design, install, and maintain sprinkler systems that meet fire codes and protect people and assets.",
      icon: Flame,
    },
    {
      id: "cabling",
      title: "Structured Cabling and Networks",
      description: "We deploy structured cabling and network infrastructure that provides reliable connectivity for housing, offices, and clinics.",
      icon: Cable,
    },
    {
      id: "envelope",
      title: "Building Envelope and Roofing",
      description: "We install new roofing and perform targeted envelope repairs that extend service life and prevent water intrusion.",
      icon: Building2,
    },
    {
      id: "steel",
      title: "Structural Steel and Metals",
      description: "We fabricate and install structural steel, reinforcements, and secure gates with precision and durability.",
      icon: Wrench,
    },
    {
      id: "boilers",
      title: "High-Efficiency Boiler Systems",
      description: "We install and service hydronic and steam boilers with modern controls that deliver efficient, dependable heat.",
      icon: Fire,
    },
  ];

  const consultingServices = [
    {
      id: "consulting",
      title: "Consulting",
      description: "Expert building code consulting to preempt compliance issues and accelerate project timelines. We provide strategic guidance for all structures, from landmarked buildings to innovative new constructions.",
      icon: Building2,
    },
    {
      id: "approvals",
      title: "Approvals & Permits",
      description: "Seasoned project managers and permit expediters secure timely approvals, ensuring seamless progress for minor alterations or complex, long-term construction projects.",
      icon: Cable,
    },
    {
      id: "violations",
      title: "Violations",
      description: "Experienced violation resolution for issues from ECB, DOB, FDNY, and other agencies. We analyze and develop effective strategies to clear violations and get your project back on track.",
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Hero with Image and Overlay */}
        <section className="relative">
          <div className="w-full relative">
            <img
              src={fullWidthServices}
              alt="Construction and building systems"
              className="w-full h-[420px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl" style={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}>
                <div className="p-10">
                  <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">What we do</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground leading-[1.1]">
                    Building systems that just work
                  </h1>
                  <p className="text-base text-muted-foreground max-w-2xl">
                    Comprehensive construction and MEP services backed by deep technical expertise and proven reliability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive construction and MEP capabilities backed by deep technical expertise and proven reliability
            </p>
          </div>
        </section>

        {/* Blade 1: General Construction */}
        <section className="pt-8 pb-12 md:pt-10 md:pb-[72px] px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl mb-3 text-accent">General Construction</h2>
              <p className="text-base text-muted-foreground max-w-3xl">
                We deliver ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities with end-to-end quality control.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left column - first 4 services */}
              <Accordion type="multiple" className="w-full space-y-3">
                {generalConstructionServices.slice(0, 4).map((service) => {
                  const Icon = service.icon;
                  return (
                    <AccordionItem 
                      key={service.id} 
                      value={service.id} 
                      className="border border-border rounded-lg px-4 bg-background"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 text-left">
                          <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                          <h3 className="font-semibold text-base">{service.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-8">
                        <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Right column - last 4 services */}
              <Accordion type="multiple" className="w-full space-y-3">
                {generalConstructionServices.slice(4, 8).map((service) => {
                  const Icon = service.icon;
                  return (
                    <AccordionItem 
                      key={service.id} 
                      value={service.id} 
                      className="border border-border rounded-lg px-4 bg-background"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 text-left">
                          <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                          <h3 className="font-semibold text-base">{service.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-8">
                        <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Blade 2: Consulting and Permitting */}
        <section className="pt-12 pb-12 md:pt-20 md:pb-20 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left column - text content */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl mb-3 text-accent">Consulting and Permitting</h2>
                  <p className="text-base text-muted-foreground">
                    We provide design coordination, engineering oversight, permits, and strategic violation resolution to keep your project compliant and on schedule.
                  </p>
                </div>
                
                <Accordion type="multiple" className="w-full space-y-3">
                  {consultingServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <AccordionItem 
                        key={service.id} 
                        value={service.id} 
                        className="border border-border rounded-lg px-4 bg-background"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3 text-left">
                            <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                            <h3 className="font-semibold text-base">{service.title}</h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pl-8">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              {/* Right column - image */}
              <div className="hidden md:block">
                <img
                  src={consultingMeeting}
                  alt="Construction consulting and permitting services"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blade 3: Property and Facility Management */}
        <section className="pt-12 pb-16 md:pt-[72px] md:pb-[80px] px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Wrench className="h-8 w-8 text-accent" />
              </div>
              
              <h2 className="text-2xl md:text-3xl mb-6 text-accent">Property and Facility Management</h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Scheduled maintenance and rapid response to keep operations smooth.
              </p>
              
              <Button size="lg" asChild>
                <Link to="/contact">Request Service 24/7</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">Ready to start your project?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">See projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
