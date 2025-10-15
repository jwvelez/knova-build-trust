import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooterCTA from "@/components/MobileFooterCTA";
import { Button } from "@/components/ui/button";
import fullWidthServices from "@/assets/full-width-services.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wrench, Phone } from "lucide-react";

const Services = () => {
  const generalConstructionServices = [
    {
      title: "Energy-Efficient HVAC Systems",
      description: "We design, install, and service high-efficiency HVAC systems that support electrification and measurably improve air quality.",
    },
    {
      title: "Electrical and Low-Voltage Systems",
      description: "We deliver modern power distribution, service upgrades, lighting and controls, and structured cabling built for today's electrical loads.",
    },
    {
      title: "Plumbing and Piping Systems",
      description: "We install and repair domestic water, sanitary, and gas systems to code while minimizing disruption to occupants.",
    },
    {
      title: "Fire and Life Safety",
      description: "We design, install, and maintain sprinkler systems that meet fire codes and protect people and assets.",
    },
    {
      title: "Structured Cabling and Networks",
      description: "We deploy structured cabling and network infrastructure that provides reliable connectivity for housing, offices, and clinics.",
    },
    {
      title: "Building Envelope and Roofing",
      description: "We install new roofing and perform targeted envelope repairs that extend service life and prevent water intrusion.",
    },
    {
      title: "Structural Steel and Metals",
      description: "We fabricate and install structural steel, reinforcements, and secure gates with precision and durability.",
    },
    {
      title: "High-Efficiency Boiler Systems",
      description: "We install and service hydronic and steam boilers with modern controls that deliver efficient, dependable heat.",
    },
  ];

  const consultingServices = [
    {
      title: "Consulting",
      description: "Expert building code consulting to preempt compliance issues and accelerate project timelines. We provide strategic guidance for all structures, from landmarked buildings to innovative new constructions.",
    },
    {
      title: "Approvals & Permits",
      description: "Seasoned project managers and permit expediters secure timely approvals, ensuring seamless progress for minor alterations or complex, long-term construction projects.",
    },
    {
      title: "Violations",
      description: "Experienced violation resolution for issues from ECB, DOB, FDNY, and other agencies. We analyze and develop effective strategies to clear violations and get your project back on track.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <MobileFooterCTA />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="w-full relative">
            <img
              src={fullWidthServices}
              alt="Construction and building systems"
              className="w-full h-[600px] md:h-[900px] object-cover"
            />
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl bg-white/95 rounded-2xl">
                <div className="p-8 md:p-12 lg:p-16">
                  <p className="overline">WHAT WE DO</p>
                  <h1 className="mb-4">Building systems that just work</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    Comprehensive construction and MEP services backed by deep technical expertise and proven reliability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Column Layout */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Column 1: General Construction */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-[28px] leading-[36px] mb-3">General Construction</h2>
                  <p className="text-muted-foreground mb-8">
                    Ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities, managed end-to-end with rigorous quality control and compliance
                  </p>
                </div>

                <Accordion type="multiple" className="w-full space-y-3">
                  {generalConstructionServices.map((service, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`gc-${i}`}
                      className="border border-border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/5 transition-colors">
                        <div className="flex items-start gap-3 text-left">
                          <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="font-semibold">{service.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 pt-2">
                        <p className="text-muted-foreground leading-relaxed pl-8">
                          {service.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Column 2: Consulting and Permitting */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-[28px] leading-[36px] mb-3">Consulting and Permitting</h2>
                  <p className="text-muted-foreground mb-8">
                    Design coordination, engineering oversight, permits, and violation resolution
                  </p>
                </div>

                <Accordion type="multiple" className="w-full space-y-3">
                  {consultingServices.map((service, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`cs-${i}`}
                      className="border border-border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/5 transition-colors">
                        <div className="flex items-start gap-3 text-left">
                          <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="font-semibold">{service.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 pt-2">
                        <p className="text-muted-foreground leading-relaxed pl-8">
                          {service.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Column 3: Property and Facility Management */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-[28px] leading-[36px] mb-3">Property and Facility Management</h2>
                  <p className="text-muted-foreground mb-6">
                    Scheduled maintenance and rapid response to keep operations smooth.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                    <img 
                      src={howWeDeliver} 
                      alt="Facility management and maintenance"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <Button size="lg" className="w-full" asChild>
                      <Link to="/contact">Request Service 24/7</Link>
                    </Button>
                    <a 
                      href="tel:2015255365" 
                      className="flex items-center justify-center gap-2 text-accent hover:text-primary transition-colors font-semibold"
                    >
                      <Phone className="h-5 w-5" />
                      <span>(201) 525-5365</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page CTAs */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/contact">Ask an Expert</Link>
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
