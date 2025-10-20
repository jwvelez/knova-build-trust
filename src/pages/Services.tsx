import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Droplet, Flame, Cable, Building2, Wrench, Flame as Fire, ClipboardCheck, AlertCircle } from "lucide-react";
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
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

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
      title: "Approvals and Permits",
      description: "Seasoned project managers and permit expediters secure timely approvals, ensuring seamless progress for minor alterations or complex, long-term construction projects.",
    },
    {
      id: "violations",
      title: "Violations",
      description: "Experienced violation resolution for issues from ECB, DOB, FDNY, and other agencies. We analyze and develop effective strategies to clear violations and get your project back on track.",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Our Services Anchor Section */}
        <section className="py-16 md:py-20 px-6 md:px-8" style={{ backgroundColor: '#202d7c' }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase text-sm tracking-wider font-medium mb-4" style={{ color: '#ffffff' }}>WHAT WE DO</p>
              <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#ffffff' }}>Our Services</h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: '#ffffff', opacity: 0.9 }}>
                Comprehensive construction and MEP delivery for New York and New Jersey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Tile 1: General Construction */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8" style={{ color: '#ffffff', strokeWidth: 2 }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#ffffff' }}>General Construction</h3>
                <p className="text-sm mb-6" style={{ color: '#ffffff', opacity: 0.85 }}>
                  Ground-up builds and full gut renovations with rigorous quality control
                </p>
                <button
                  onClick={() => scrollToSection('general-construction')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '2px solid #4488bc',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4488bc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Explore General Construction →
                </button>
              </div>

              {/* Tile 2: Consulting and Permitting */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-8 w-8" style={{ color: '#ffffff', strokeWidth: 2 }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#ffffff' }}>Consulting and Permitting</h3>
                <p className="text-sm mb-6" style={{ color: '#ffffff', opacity: 0.85 }}>
                  Design coordination, engineering oversight, permits, and violation resolution
                </p>
                <button
                  onClick={() => scrollToSection('consulting-permitting')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '2px solid #4488bc',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4488bc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Explore Consulting & Permitting →
                </button>
              </div>

              {/* Tile 3: Facility Maintenance */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Wrench className="h-8 w-8" style={{ color: '#ffffff', strokeWidth: 2 }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#ffffff' }}>Facility Maintenance and Emergency Response</h3>
                <p className="text-sm mb-6" style={{ color: '#ffffff', opacity: 0.85 }}>
                  Scheduled preventive maintenance and rapid response to keep operations smooth
                </p>
                <button
                  onClick={() => scrollToSection('facility-maintenance-emergency')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '2px solid #4488bc',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4488bc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Explore Maintenance & Emergency →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: General Construction */}
        <section id="general-construction" className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 md:px-8 bg-background scroll-mt-20">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-8">
              <p className="uppercase text-sm tracking-wider text-accent font-medium mb-3">WHAT WE DO</p>
              <h2 className="text-3xl md:text-4xl mb-4 text-foreground">General Construction</h2>
              <p className="text-base text-muted-foreground max-w-3xl">
                Ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities, managed end to end with rigorous quality control and compliance
              </p>
            </div>
            
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
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* Section 2: Consulting and Permitting */}
        <section id="consulting-permitting" className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 md:px-8 bg-secondary/30 scroll-mt-20">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-8">
              <p className="uppercase text-sm tracking-wider text-accent font-medium mb-3">WHAT WE DO</p>
              <h2 className="text-3xl md:text-4xl mb-4 text-foreground">Consulting and Permitting</h2>
              <p className="text-base text-muted-foreground max-w-3xl">
                Design coordination, engineering oversight, permits, and violation resolution
              </p>
            </div>
            
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
                  <AccordionContent className="pb-4 pl-4">
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Section 3: Facility Maintenance and Emergency Response */}
        <section id="facility-maintenance-emergency" className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 md:px-8 bg-background scroll-mt-20">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-8">
              <p className="uppercase text-sm tracking-wider text-accent font-medium mb-3">WHAT WE DO</p>
              <h2 className="text-3xl md:text-4xl mb-4 text-foreground">Facility Maintenance and Emergency Response</h2>
              <p className="text-base text-muted-foreground max-w-3xl mb-6">
                Scheduled preventive maintenance and rapid response to keep operations smooth.
              </p>
              <p className="text-base text-muted-foreground max-w-3xl">
                At KNova Contractors, we provide boutique facility maintenance programs that cover preventive and reactive needs. For owners, landlords, facility managers, and co-op boards, we deliver custom solutions that save time, reduce costs, and remove stress.
              </p>
            </div>

            {/* Desktop: Tabs */}
            <div className="hidden md:block">
              <Tabs defaultValue="preventive" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="preventive"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Preventive Maintenance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reactive"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Reactive Maintenance Services
                  </TabsTrigger>
                  <TabsTrigger 
                    value="emergency"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    24/7 Facility Emergency Services
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preventive" className="mt-6 space-y-6">
                  <p className="text-base text-muted-foreground">
                    Performing regular maintenance helps identify and resolve issues before they cause a major malfunction, which extends equipment life and delays costly replacements.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Benefits</h3>
                    <ul className="space-y-2 text-base text-muted-foreground">
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Cost savings:</strong> Preventive maintenance avoids the higher and unpredictable costs of emergency repairs, including rush parts, overtime, and downtime losses</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Minimized downtime:</strong> A proactive program reduces unexpected breakdowns and keeps operations uninterrupted</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Improved energy efficiency:</strong> Well-maintained equipment runs more efficiently and lowers utility costs</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Enhanced safety:</strong> Regular inspections identify hazards early and support compliance with safety and regulatory requirements</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Better resource planning:</strong> Turning unplanned repair spend into predictable, planned expenses improves budgeting</span></li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Common preventive maintenance services</h3>
                    <ul className="space-y-2 text-base text-muted-foreground">
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>HVAC systems:</strong> Regular inspections and cleaning to optimize performance and efficiency</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Electrical systems:</strong> Routine servicing of panels, wiring, and fixtures to prevent hazards and failures</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Plumbing systems:</strong> Scheduled cleaning and inspection to prevent clogs, leaks, and water damage</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Lighting systems:</strong> Interior and exterior maintenance, including LED retrofits, to improve safety and reduce costs</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Safety equipment:</strong> Checks on fire alarms, sprinklers, and extinguishers to keep equipment mission-ready</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Exterior maintenance:</strong> Roof, windows, facade, and parking areas to prevent water intrusion and deterioration</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Vertical transportation:</strong> Routine servicing of elevators and escalators for safe, reliable operation</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>General upkeep:</strong> Regular inspections of building assets from floors and walls to doors and gates</span></li>
                    </ul>
                  </div>

                  <p className="text-base text-muted-foreground">
                    Our goal is to extend asset life, keep tenants safe, and maintain code-compliant buildings.
                  </p>
                </TabsContent>

                <TabsContent value="reactive" className="mt-6 space-y-6">
                  <p className="text-base text-muted-foreground">
                    Reactive maintenance addresses failures after they occur. While not recommended as the primary strategy for critical assets, it is essential when urgent issues arise.
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">When it applies</h3>
                    <ul className="space-y-2 text-base text-muted-foreground">
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>HVAC failure:</strong> Repairing or replacing heating and cooling equipment during extreme weather to maintain safe conditions</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Plumbing issues:</strong> Responding to burst pipes, significant leaks, and urgent drainage problems to prevent water damage</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Power outages:</strong> Addressing electrical failures with on-call generator support and refueling</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Structural damage:</strong> Stabilizing and repairing damage caused by storms, accidents, or other disruptive events</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Fire and life safety:</strong> Servicing alarms and sprinklers to restore operational readiness</span></li>
                      <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Disaster response:</strong> Emergency services that can include snow removal and cleanup</span></li>
                    </ul>
                  </div>

                  <p className="text-base text-muted-foreground">
                    If you experience a system emergency, our team can mobilize quickly to restore operations.
                  </p>
                </TabsContent>

                <TabsContent value="emergency" className="mt-6 space-y-6">
                  <p className="text-base text-muted-foreground">
                    Our 24/7 facility emergency service provides around-the-clock, on-call technical support for unforeseen incidents at your building. We respond to a wide range of critical equipment failures with immediate, professional action at any hour.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Button size="lg" asChild>
                      <Link to="/contact">Request Service 24/7</Link>
                    </Button>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Emergency Dispatch:</span>
                      <a href="tel:1234567890" className="text-lg font-semibold text-accent hover:underline">(123) 456-7890</a>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Mobile: Accordions */}
            <div className="block md:hidden">
              <Accordion type="multiple" className="w-full space-y-3">
                <AccordionItem value="preventive" className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <h3 className="font-semibold text-base text-left">Preventive Maintenance</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Performing regular maintenance helps identify and resolve issues before they cause a major malfunction, which extends equipment life and delays costly replacements.
                    </p>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Benefits</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Cost savings:</strong> Preventive maintenance avoids the higher and unpredictable costs of emergency repairs, including rush parts, overtime, and downtime losses</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Minimized downtime:</strong> A proactive program reduces unexpected breakdowns and keeps operations uninterrupted</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Improved energy efficiency:</strong> Well-maintained equipment runs more efficiently and lowers utility costs</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Enhanced safety:</strong> Regular inspections identify hazards early and support compliance with safety and regulatory requirements</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Better resource planning:</strong> Turning unplanned repair spend into predictable, planned expenses improves budgeting</span></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Common preventive maintenance services</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>HVAC systems:</strong> Regular inspections and cleaning to optimize performance and efficiency</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Electrical systems:</strong> Routine servicing of panels, wiring, and fixtures to prevent hazards and failures</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Plumbing systems:</strong> Scheduled cleaning and inspection to prevent clogs, leaks, and water damage</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Lighting systems:</strong> Interior and exterior maintenance, including LED retrofits, to improve safety and reduce costs</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Safety equipment:</strong> Checks on fire alarms, sprinklers, and extinguishers to keep equipment mission-ready</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Exterior maintenance:</strong> Roof, windows, facade, and parking areas to prevent water intrusion and deterioration</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Vertical transportation:</strong> Routine servicing of elevators and escalators for safe, reliable operation</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>General upkeep:</strong> Regular inspections of building assets from floors and walls to doors and gates</span></li>
                      </ul>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Our goal is to extend asset life, keep tenants safe, and maintain code-compliant buildings.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reactive" className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <h3 className="font-semibold text-base text-left">Reactive Maintenance Services</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Reactive maintenance addresses failures after they occur. While not recommended as the primary strategy for critical assets, it is essential when urgent issues arise.
                    </p>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">When it applies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>HVAC failure:</strong> Repairing or replacing heating and cooling equipment during extreme weather to maintain safe conditions</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Plumbing issues:</strong> Responding to burst pipes, significant leaks, and urgent drainage problems to prevent water damage</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Power outages:</strong> Addressing electrical failures with on-call generator support and refueling</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Structural damage:</strong> Stabilizing and repairing damage caused by storms, accidents, or other disruptive events</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Fire and life safety:</strong> Servicing alarms and sprinklers to restore operational readiness</span></li>
                        <li className="flex gap-2"><span className="text-accent">•</span><span><strong>Disaster response:</strong> Emergency services that can include snow removal and cleanup</span></li>
                      </ul>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      If you experience a system emergency, our team can mobilize quickly to restore operations.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="emergency" className="border border-border rounded-lg px-4 bg-background">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <h3 className="font-semibold text-base text-left">24/7 Facility Emergency Services</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Our 24/7 facility emergency service provides around-the-clock, on-call technical support for unforeseen incidents at your building. We respond to a wide range of critical equipment failures with immediate, professional action at any hour.
                    </p>

                    <div className="flex flex-col gap-4">
                      <Button size="lg" asChild className="w-full">
                        <Link to="/contact">Request Service 24/7</Link>
                      </Button>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Emergency Dispatch:</span>
                        <a href="tel:1234567890" className="text-lg font-semibold text-accent hover:underline">(123) 456-7890</a>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-secondary/30">
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
