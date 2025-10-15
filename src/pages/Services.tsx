import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Droplet, Flame, Cable, Building2, Wrench, Flame as Fire } from "lucide-react";
import fullWidthServices from "@/assets/full-width-services.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
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
    },
    {
      id: "approvals",
      title: "Approvals & Permits",
      description: "Seasoned project managers and permit expediters secure timely approvals, ensuring seamless progress for minor alterations or complex, long-term construction projects.",
    },
    {
      id: "violations",
      title: "Violations",
      description: "Experienced violation resolution for issues from ECB, DOB, FDNY, and other agencies. We analyze and develop effective strategies to clear violations and get your project back on track.",
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
                <div className="p-8 md:p-12 lg:p-16">
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

        {/* Blade 1: General Construction + Consulting (50/50 Desktop) */}
        <section className="pt-12 pb-12 md:pt-[72px] md:pb-[72px] px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* General Construction */}
              <div>
                <h2 className="text-2xl md:text-3xl mb-3">General Construction</h2>
                <p className="text-base text-muted-foreground mb-8 max-w-xl">
                  Ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities, managed end to end with rigorous quality control and compliance
                </p>
                
                <Accordion type="multiple" className="w-full space-y-3">
                  {generalConstructionServices.map((service) => {
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
                          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              {/* Consulting and Permitting */}
              <div>
                <h2 className="text-2xl md:text-3xl mb-3">Consulting and Permitting</h2>
                <p className="text-base text-muted-foreground mb-8 max-w-xl">
                  Design coordination, engineering oversight, permits, and violation resolution
                </p>
                
                <Accordion type="multiple" className="w-full space-y-3">
                  {consultingServices.map((service) => (
                    <AccordionItem 
                      key={service.id} 
                      value={service.id} 
                      className="border border-border rounded-lg px-4 bg-background"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <h3 className="font-semibold text-base text-left">{service.title}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Blade 2: Property and Facility Management */}
        <section className="pt-12 pb-16 md:pt-[72px] md:pb-[80px] px-6 md:px-8 bg-secondary/30">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="relative overflow-hidden rounded-lg mb-8 w-full max-w-2xl">
                <img
                  src={howWeDeliver}
                  alt="Facility management and maintenance services"
                  className="w-full aspect-[5/4] object-cover"
                />
              </div>
              
              <h2 className="text-2xl md:text-3xl mb-6">Property and Facility Management</h2>
              
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
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">Ready to start your project?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
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
