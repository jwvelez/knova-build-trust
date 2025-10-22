import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Droplet, Flame, Cable, Building2, Wrench, Flame as Fire } from "lucide-react";
import heroHvac from "@/assets/hero-hvac.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
import consultingTeam from "@/assets/consulting-team.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Services = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

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
              src={heroHvac}
              alt="Construction and building systems"
              className="w-full h-[420px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-0">
              <div className="container-narrow w-full">
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
            </div>
        </section>

        {/* Our Services Anchor Blade */}
        <section className="py-12 md:py-16 px-6 md:px-8" style={{ backgroundColor: '#202d7c' }}>
          <div className="max-w-[1240px] mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-white/80 font-medium mb-4">OUR SERVICES</p>
            <h2 className="text-3xl md:text-4xl mb-4 text-white mx-auto">Comprehensive construction and MEP expertise</h2>
            <p className="text-base text-white/90 mb-12">Choose a category to learn more</p>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* General Construction */}
              <div className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">General Construction</h3>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]"
                  onClick={() => scrollToSection('gc')}
                >
                  Read More →
                </Button>
              </div>

              {/* Consulting & Permitting */}
              <div className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Cable className="h-12 w-12 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Consulting & Permitting</h3>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]"
                  onClick={() => scrollToSection('consulting')}
                >
                  Read More →
                </Button>
              </div>

              {/* Facility Maintenance */}
              <div className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Wrench className="h-12 w-12 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Facility Maintenance & Emergency Response</h3>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]"
                  onClick={() => scrollToSection('facility-maintenance')}
                >
                  Read More →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Blade 1: General Construction */}
        <section id="gc" className="pt-24 pb-24 px-6 md:px-8 bg-background">
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
        <section id="consulting" className="pt-24 pb-24 px-6 md:px-8 bg-secondary/30">
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
                  src={consultingTeam}
                  alt="Construction consulting and permitting services"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blade 3: Facility Maintenance & Emergency Response */}
        <section id="facility-maintenance" className="pt-24 pb-24 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center mb-10">
              <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">WHAT WE DO</p>
              <h2 className="text-2xl md:text-3xl mb-4 text-foreground mx-auto">Facility Maintenance & Emergency Response</h2>
              <p className="text-[17px] text-muted-foreground mb-6 max-w-3xl mx-auto">
                Scheduled preventive maintenance and rapid response to keep operations smooth.
              </p>
              <p className="text-[17px] text-foreground max-w-3xl mx-auto">
                KNova Contractors provides boutique-style facility operations with preventive and reactive maintenance. If you are a property owner, landlord, facility manager, or co-op board member who needs a trusted vendor, we tailor solutions to your building and priorities. Our approach saves time, controls costs, and simplifies operations.
              </p>
            </div>

            {/* Desktop: Tabs, Mobile: Accordions */}
            <div className="hidden md:block">
              <Tabs defaultValue="preventive" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-2 mb-10 mx-auto">
                  <TabsTrigger value="preventive" className="text-[17px]">Preventive Maintenance</TabsTrigger>
                  <TabsTrigger value="reactive" className="text-[17px]">Reactive Maintenance Services</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preventive" className="space-y-8">
                  <p className="text-base text-foreground max-w-4xl">
                    Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Benefits</h3>
                      <Accordion type="multiple" className="w-full space-y-3">
                      <AccordionItem value="cost-savings" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Cost savings</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            Preventive maintenance turns unpredictable repair expenses into planned, budgetable work and reduces rush fees, overtime, and downtime costs.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="minimized-downtime" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Minimized downtime</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            A proactive plan lowers the chance of unexpected outages and service disruptions so operations continue without interruption.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="energy-efficiency" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Improved energy efficiency</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            Well-maintained equipment runs more efficiently, which reduces energy use and utility costs.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="enhanced-safety" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Enhanced safety</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            Routine inspections identify hazards early and support compliance with safety and regulatory requirements.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="resource-planning" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Better resource planning</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            Planned service allows accurate forecasting and scheduling across teams, parts, and budgets.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Common Services</h3>
                      <Accordion type="multiple" className="w-full space-y-3">
                      <AccordionItem value="hvac-systems" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">HVAC systems</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We inspect, clean, and calibrate equipment to maintain performance, air quality, and efficiency.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="electrical-systems" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Electrical systems</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We service panels, wiring, and fixtures to prevent hazards and keep power stable.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="plumbing-systems" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Plumbing systems</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We clean and inspect drains and piping to prevent clogs, leaks, and water damage.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="lighting-systems" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Lighting systems</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We maintain interior and exterior lighting and support LED retrofits to improve safety and reduce costs.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="safety-equipment" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Safety equipment</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We check fire alarms, sprinkler systems, and extinguishers to keep life-safety systems ready.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="exterior-maintenance" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Exterior maintenance</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We inspect roofs, windows, facades, and lots to prevent water intrusion and exterior failures.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="vertical-transport" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">Vertical transportation</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We coordinate servicing of elevators and escalators for safe, reliable operation.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="general-upkeep" className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <h4 className="font-semibold text-base text-left">General upkeep</h4>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">
                            We perform scheduled walkthroughs of building assets including floors, walls, doors, and gates.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                  
                  <p className="text-base text-foreground">
                    Our goal is to increase equipment lifespan and deliver safe, compliant buildings that support tenant well-being.
                  </p>
                </TabsContent>
                
                <TabsContent value="reactive" className="space-y-8">
                  <p className="text-base text-foreground max-w-4xl">
                    Reactive maintenance addresses failures after they occur. While it is not a primary strategy for critical assets, it is essential for emergencies and unplanned events. When issues arise, we mobilize fast.
                  </p>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Scenarios</h3>
                    <div className="grid md:grid-cols-2 gap-12">
                      <Accordion type="multiple" className="w-full space-y-3">
                        <AccordionItem value="hvac-failure" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">HVAC failure</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We repair or replace heating and cooling equipment to restore safe, comfortable conditions during peak weather.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="plumbing-issues" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">Plumbing issues</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We respond to burst pipes, major leaks, and urgent plumbing failures to limit water damage.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="power-outages" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">Power outages</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We troubleshoot electrical failures and coordinate generator support to restore power.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <Accordion type="multiple" className="w-full space-y-3">
                        <AccordionItem value="structural-damage" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">Structural damage</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We address storm and impact damage and coordinate safe, code-compliant repairs.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="fire-safety" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">Fire and life safety</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We service affected fire alarms and sprinkler systems to confirm proper operation.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="disaster-response" className="border border-border rounded-lg px-4 bg-background">
                          <AccordionTrigger className="hover:no-underline py-4">
                            <h4 className="font-semibold text-base text-left">Disaster response</h4>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              We provide emergency services and site cleanup as needed, including snow removal.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Mobile: Accordions */}
            <div className="md:hidden space-y-4">
              <Accordion type="multiple" className="w-full space-y-3">
                <AccordionItem value="preventive" className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <h3 className="font-semibold text-lg text-left">Preventive Maintenance</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    <p className="text-base text-foreground">
                      Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs.
                    </p>
                    
                    <h4 className="font-semibold">Benefits</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>Cost savings:</strong> Preventive maintenance turns unpredictable repair expenses into planned, budgetable work and reduces rush fees, overtime, and downtime costs.</li>
                      <li><strong>Minimized downtime:</strong> A proactive plan lowers the chance of unexpected outages and service disruptions so operations continue without interruption.</li>
                      <li><strong>Improved energy efficiency:</strong> Well-maintained equipment runs more efficiently, which reduces energy use and utility costs.</li>
                      <li><strong>Enhanced safety:</strong> Routine inspections identify hazards early and support compliance with safety and regulatory requirements.</li>
                      <li><strong>Better resource planning:</strong> Planned service allows accurate forecasting and scheduling across teams, parts, and budgets.</li>
                    </ul>
                    
                    <h4 className="font-semibold mt-4">Common Services</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>HVAC systems:</strong> We inspect, clean, and calibrate equipment to maintain performance, air quality, and efficiency.</li>
                      <li><strong>Electrical systems:</strong> We service panels, wiring, and fixtures to prevent hazards and keep power stable.</li>
                      <li><strong>Plumbing systems:</strong> We clean and inspect drains and piping to prevent clogs, leaks, and water damage.</li>
                      <li><strong>Lighting systems:</strong> We maintain interior and exterior lighting and support LED retrofits to improve safety and reduce costs.</li>
                      <li><strong>Safety equipment:</strong> We check fire alarms, sprinkler systems, and extinguishers to keep life-safety systems ready.</li>
                      <li><strong>Exterior maintenance:</strong> We inspect roofs, windows, facades, and lots to prevent water intrusion and exterior failures.</li>
                      <li><strong>Vertical transportation:</strong> We coordinate servicing of elevators and escalators for safe, reliable operation.</li>
                      <li><strong>General upkeep:</strong> We perform scheduled walkthroughs of building assets including floors, walls, doors, and gates.</li>
                    </ul>
                    
                    <p className="text-base text-foreground">
                      Our goal is to increase equipment lifespan and deliver safe, compliant buildings that support tenant well-being.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="reactive" className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <h3 className="font-semibold text-lg text-left">Reactive Maintenance Services</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    <p className="text-base text-foreground">
                      Reactive maintenance addresses failures after they occur. While it is not a primary strategy for critical assets, it is essential for emergencies and unplanned events. When issues arise, we mobilize fast.
                    </p>
                    
                    <h4 className="font-semibold">Scenarios</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>HVAC failure:</strong> We repair or replace heating and cooling equipment to restore safe, comfortable conditions during peak weather.</li>
                      <li><strong>Plumbing issues:</strong> We respond to burst pipes, major leaks, and urgent plumbing failures to limit water damage.</li>
                      <li><strong>Power outages:</strong> We troubleshoot electrical failures and coordinate generator support to restore power.</li>
                      <li><strong>Structural damage:</strong> We address storm and impact damage and coordinate safe, code-compliant repairs.</li>
                      <li><strong>Fire and life safety:</strong> We service affected fire alarms and sprinkler systems to confirm proper operation.</li>
                      <li><strong>Disaster response:</strong> We provide emergency services and site cleanup as needed, including snow removal.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* CTA Box */}
            <div className="mt-12 max-w-[700px] mx-auto text-center rounded-lg p-8" style={{ backgroundColor: '#202d7c' }}>
              <h3 className="text-2xl font-semibold text-white mb-3">24/7 Facility Emergency Services</h3>
              <p className="text-white/90 mb-6">
                Our 24/7 service provides on-call technical support for unexpected incidents across critical building systems, with immediate, professional response at any time.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-[#202d7c] hover:bg-white/90" 
                asChild
              >
                <Link to="/contact">Request 24/7 Service</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-24 pb-24 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary mx-auto">Ready to start your project?</h2>
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
