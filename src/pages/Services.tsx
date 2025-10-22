import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Zap, Droplet, Flame, Cable, Building2, Wrench, Flame as Fire, DollarSign, Clock, Leaf, Shield, Calendar, Lightbulb, Plug, Eye, Home, ArrowUp, LifeBuoy, AlertTriangle, CloudRain, Siren } from "lucide-react";
import heroHvac from "@/assets/hero-hvac.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
import consultingTeam from "@/assets/consulting-team.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const generalConstructionServices = [{
    id: "hvac",
    title: "Energy-Efficient HVAC Systems",
    description: "We design, install, and service high-efficiency HVAC systems that support electrification and measurably improve indoor air quality.",
    icon: Wind
  }, {
    id: "electrical",
    title: "Electrical and Low-Voltage Systems",
    description: "We deliver modern power distribution, service upgrades, lighting and controls, and structured cabling sized for today's electrical loads.",
    icon: Zap
  }, {
    id: "plumbing",
    title: "Plumbing and Piping Systems",
    description: "We install and repair domestic water, sanitary, and gas systems to code while minimizing disruption to occupants.",
    icon: Droplet
  }, {
    id: "fire",
    title: "Fire and Life Safety",
    description: "We design, install, and maintain sprinkler systems that meet fire codes and protect people and assets.",
    icon: Flame
  }, {
    id: "cabling",
    title: "Structured Cabling and Networks",
    description: "We deploy structured cabling and network infrastructure that provides reliable connectivity for housing, offices, and clinics.",
    icon: Cable
  }, {
    id: "envelope",
    title: "Building Envelope and Roofing",
    description: "We install new roofing and perform targeted envelope repairs that extend service life and prevent water intrusion.",
    icon: Building2
  }, {
    id: "steel",
    title: "Structural Steel and Metals",
    description: "We fabricate and install structural steel, reinforcements, and secure gates with precision and durability.",
    icon: Wrench
  }, {
    id: "boilers",
    title: "High-Efficiency Boiler Systems",
    description: "We install and service hydronic and steam boilers with modern controls that deliver efficient, dependable heat.",
    icon: Fire
  }];
  const consultingServices = [{
    id: "consulting",
    title: "Consulting",
    description: "Expert building code consulting to preempt compliance issues and accelerate project timelines. We provide strategic guidance for all structures, from landmarked buildings to innovative new constructions.",
    icon: Building2
  }, {
    id: "approvals",
    title: "Approvals & Permits",
    description: "Seasoned project managers and permit expediters secure timely approvals, ensuring seamless progress for minor alterations or complex, long-term construction projects.",
    icon: Cable
  }, {
    id: "violations",
    title: "Violations",
    description: "Experienced violation resolution for issues from ECB, DOB, FDNY, and other agencies. We analyze and develop effective strategies to clear violations and get your project back on track.",
    icon: Wrench
  }];
  return <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Hero with Image and Overlay */}
        <section className="relative">
          <div className="w-full relative">
            <img src={heroHvac} alt="Construction and building systems" className="w-full h-[420px] md:h-[600px] object-cover" />
            <div className="absolute inset-0" style={{
            backgroundColor: 'rgba(0, 2, 14, 0.6)'
          }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-0">
              <div className="container-narrow w-full">
                <div className="w-full max-w-4xl" style={{
                backgroundColor: 'rgba(250, 250, 250, 0.9)'
              }}>
                <div className="p-[30px]">
                  <div className="max-w-[700px]">
                    <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">What we do</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground leading-[1.1]">
                      Building systems that just work
                    </h1>
                    <p className="text-base text-muted-foreground">
                      Comprehensive construction and MEP services backed by deep technical expertise and proven reliability
                    </p>
                  </div>
                </div>
                </div>
              </div>
              </div>
            </div>
        </section>

        {/* Our Services Anchor Blade */}
        <section className="py-12 md:py-16 px-6 md:px-8" style={{
        backgroundColor: '#202d7c'
      }}>
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
                <Button variant="outline" className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]" onClick={() => scrollToSection('gc')}>
                  Read More →
                </Button>
              </div>

              {/* Consulting & Permitting */}
              <div className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Cable className="h-12 w-12 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Consulting & Permitting</h3>
                <Button variant="outline" className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]" onClick={() => scrollToSection('consulting')}>
                  Read More →
                </Button>
              </div>

              {/* Facility Maintenance */}
              <div className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Wrench className="h-12 w-12 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Facility Maintenance & Emergency Response</h3>
                <Button variant="outline" className="mt-4 bg-white text-[#202d7c] border-white hover:bg-white/90 hover:text-[#202d7c]" onClick={() => scrollToSection('facility-maintenance')}>
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
              <p className="text-muted-foreground max-w-3xl font-medium text-lg">
                We deliver ground-up builds and full gut renovations for residential, commercial, institutional, and medical facilities with end-to-end quality control.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left column - first 4 services */}
              <Accordion type="multiple" className="w-full space-y-3">
                {generalConstructionServices.slice(0, 4).map(service => {
                const Icon = service.icon;
                return <AccordionItem key={service.id} value={service.id} className="border border-border rounded-lg px-4 bg-background">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 text-left">
                          <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                          <h3 className="font-semibold text-base">{service.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-8">
                        <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                      </AccordionContent>
                    </AccordionItem>;
              })}
              </Accordion>

              {/* Right column - last 4 services */}
              <Accordion type="multiple" className="w-full space-y-3">
                {generalConstructionServices.slice(4, 8).map(service => {
                const Icon = service.icon;
                return <AccordionItem key={service.id} value={service.id} className="border border-border rounded-lg px-4 bg-background">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 text-left">
                          <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                          <h3 className="font-semibold text-base">{service.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-8">
                        <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                      </AccordionContent>
                    </AccordionItem>;
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
                  <p className="text-muted-foreground font-medium text-lg">
                    We provide design coordination, engineering oversight, permits, and strategic violation resolution to keep your project compliant and on schedule.
                  </p>
                </div>
                
                <Accordion type="multiple" className="w-full space-y-3">
                  {consultingServices.map(service => {
                  const Icon = service.icon;
                  return <AccordionItem key={service.id} value={service.id} className="border border-border rounded-lg px-4 bg-background">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3 text-left">
                            <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
                            <h3 className="font-semibold text-base">{service.title}</h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pl-8">
                          <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
                        </AccordionContent>
                      </AccordionItem>;
                })}
                </Accordion>
              </div>

              {/* Right column - image */}
              <div className="hidden md:block">
                <img src={consultingTeam} alt="Construction consulting and permitting services" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Blade 3: Facility Maintenance & Emergency Response */}
        <section id="facility-maintenance" className="pt-24 pb-24 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl mb-6 mx-auto text-center text-[#428ebd]">Facility Maintenance & Emergency Response</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-xl font-medium text-center">KNova Contractors provides boutique-style facility operations with preventive and reactive maintenance, delivering scheduled preventive care and rapid response to keep operations smooth. Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs. If you’re a property owner, landlord, facility manager, or co-op board member, we tailor solutions to your building and priorities to save time, control costs, and simplify operations.</p>
              
            </div>

            <Tabs defaultValue="preventive" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="preventive">Preventive Maintenance</TabsTrigger>
                <TabsTrigger value="reactive">Reactive Maintenance Services</TabsTrigger>
              </TabsList>

              {/* Preventive Maintenance Tab */}
              <TabsContent value="preventive" className="mt-0">

                <div className="mb-20">
                  <div className="text-center mb-12">
                    
                  </div>
              
                  {/* Benefits */}
                  <div className="mb-16">
                  <h4 className="text-2xl font-semibold text-center mb-10">Benefits</h4>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="p-6 border-border">
                    <DollarSign className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Cost savings</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Preventive maintenance turns unpredictable repair expenses into planned, budgetable work and reduces rush fees, overtime, and downtime costs.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Clock className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Minimized downtime</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A proactive plan lowers the chance of unexpected outages and service disruptions so operations continue without interruption.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Leaf className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Improved energy efficiency</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Well-maintained equipment runs more efficiently, which reduces energy use and utility costs.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border md:col-start-2">
                    <Shield className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Enhanced safety</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Routine inspections identify hazards early and support compliance with safety and regulatory requirements.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Calendar className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Better resource planning</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Planned service allows accurate forecasting and scheduling across teams, parts, and budgets.
                    </p>
                  </Card>
                </div>
              </div>
              
              {/* Common Services */}
              <div>
                <h4 className="text-2xl font-semibold text-center mb-10">Common Services</h4>
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="p-6 border-border">
                    <Wind className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">HVAC systems</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We inspect, clean, and calibrate equipment to maintain performance, air quality, and efficiency.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Plug className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Electrical systems</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We service panels, wiring, and fixtures to prevent hazards and keep power stable.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Droplet className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Plumbing systems</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We clean and inspect drains and piping to prevent clogs, leaks, and water damage.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Lightbulb className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Lighting systems</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We maintain interior and exterior lighting and support LED retrofits to improve safety and reduce costs.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Eye className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Safety equipment</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We check fire alarms, sprinkler systems, and extinguishers to keep life-safety systems ready.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Home className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Exterior maintenance</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We inspect roofs, windows, facades, and lots to prevent water intrusion and exterior failures.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <ArrowUp className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Vertical transportation</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We coordinate servicing of elevators and escalators for safe, reliable operation.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Wrench className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">General upkeep</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We perform scheduled walkthroughs of building assets including floors, walls, doors, and gates.
                    </p>
                  </Card>
                </div>
              </div>
              
              
            </div>
            </TabsContent>

              {/* Reactive Maintenance Tab */}
              <TabsContent value="reactive" className="mt-0">
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <p className="text-base text-muted-foreground max-w-3xl mx-auto text-center">
                      Reactive maintenance addresses failures after they occur. While it is not a primary strategy for critical assets, it is essential for emergencies and unplanned events. When issues arise, we mobilize fast.
                    </p>
                  </div>
              
                  {/* Scenarios */}
                  <div>
                    <h4 className="text-2xl font-semibold text-center mb-10">Scenarios</h4>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="p-6 border-border">
                    <Wind className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">HVAC failure</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We repair or replace heating and cooling equipment to restore safe, comfortable conditions during peak weather.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Droplet className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Plumbing issues</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We respond to burst pipes, major leaks, and urgent plumbing failures to limit water damage.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Zap className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Power outages</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We troubleshoot electrical failures and coordinate generator support to restore power.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <AlertTriangle className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Structural damage</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We address storm and impact damage and coordinate safe, code-compliant repairs.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <Flame className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Fire and life safety</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We service affected fire alarms and sprinkler systems to confirm proper operation.
                    </p>
                  </Card>
                  
                  <Card className="p-6 border-border">
                    <CloudRain className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
                    <h5 className="font-semibold text-lg mb-3">Disaster response</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We provide emergency services and site cleanup as needed, including snow removal.
                    </p>
                  </Card>
                </div>
              </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* CTA Box */}
            <div className="mt-12 max-w-[900px] mx-auto text-center rounded-lg p-8" style={{
            backgroundColor: '#202d7c'
          }}>
              <h3 className="text-2xl font-semibold text-white mb-3 text-center mx-auto">24/7 Facility Emergency Services</h3>
              <p className="text-white/90 mb-6">
                Our 24/7 service provides on-call technical support for unexpected incidents across critical building systems, with immediate, professional response at any time.
              </p>
              <Button size="lg" className="bg-white text-[#202d7c] hover:bg-white/90" asChild>
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
    </div>;
};
export default Services;