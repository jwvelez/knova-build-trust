import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Hammer, Wind, Zap, Droplet, Flame, Network, Home, Factory, Thermometer, FileText, Building2, Wrench } from "lucide-react";
import fullWidthServices from "@/assets/full-width-services.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  const services = [
    {
      title: "Comprehensive General Construction",
      desc: "Ground-up builds and full gut renovations with rigorous quality control",
      icon: Hammer,
    },
    {
      title: "Energy-Efficient HVAC Systems",
      desc: "Design, installation, and service that support electrification and better air quality",
      icon: Wind,
    },
    {
      title: "Electrical and Low-Voltage Systems",
      desc: "Modern power, upgrades, and structured cabling built for today's demand",
      icon: Zap,
    },
    {
      title: "Plumbing and Piping Systems",
      desc: "Efficient water, sanitary, and gas with minimal disruption to occupants",
      icon: Droplet,
    },
    {
      title: "Fire and Life Safety",
      desc: "Sprinkler design, installation, and maintenance that protect people and assets",
      icon: Flame,
    },
    {
      title: "Structured Cabling and Networks",
      desc: "Reliable connectivity for housing, offices, and clinics",
      icon: Network,
    },
    {
      title: "Building Envelope and Roofing",
      desc: "Weather protection that extends roof life and prevents leaks",
      icon: Home,
    },
    {
      title: "Structural Steel and Metals",
      desc: "Framing, reinforcements, and secure gates with precision fabrication",
      icon: Factory,
    },
    {
      title: "High-Efficiency Boiler Systems",
      desc: "Hydronic and steam boilers with modern controls for efficient heat",
      icon: Thermometer,
    },
    {
      title: "Consulting and Permitting",
      desc: "Code consulting • approvals and permits • violation resolution",
      icon: FileText,
    },
    {
      title: "Property and Facility Management",
      desc: "Preventive programs and 24/7 service that keep facilities reliable",
      icon: Building2,
    },
    {
      title: "24/7 Reactive and Preventive Maintenance",
      desc: "Rapid repairs and scheduled care that minimize downtime and extend asset life",
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero with Image and Overlay */}
        <section className="relative">
          <div className="w-full relative">
            <img
              src={fullWidthServices}
              alt="Construction and building systems"
              className="w-full h-[420px] md:h-[600px] lg:h-[900px] object-cover"
            />
            {/* Dark overlay #00020E at 60% opacity */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            
            {/* Content Box */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl" style={{ backgroundColor: '#FAFAFA' }}>
                <div className="p-8 md:p-12 lg:p-16">
                  <p className="overline mb-4 text-muted-foreground">What we do</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
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

        {/* Services Accordion */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-2xl md:text-3xl mb-2">Comprehensive Services</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              From general construction to specialized MEP systems, we deliver integrated solutions that meet your project needs
            </p>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <AccordionItem 
                    key={i} 
                    value={`item-${i}`} 
                    className="border border-border rounded-lg px-6 bg-background hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <Icon className="h-7 w-7 text-accent stroke-[2px] flex-shrink-0" />
                        <h3 className="font-bold text-[20px] md:text-[20px] text-[19px]">{service.title}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-11">
                      <p className="text-base text-muted-foreground leading-relaxed">{service.desc}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* CTA Bar */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button size="lg" asChild>
                <Link to="/contact">Request a bid</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Request Service 24/7</Link>
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