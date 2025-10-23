import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as LucideIcons from "lucide-react";
import heroHvac from "@/assets/hero-hvac.jpg";
import consultingTeam from "@/assets/consulting-team.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

const Services = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [pageSettings, setPageSettings] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pageRes, servicesRes] = await Promise.all([
        supabase.from("cms_pages").select("sections").eq("slug", "services").maybeSingle(),
        supabase.from("cms_services").select("*").eq("status", "published").order("display_order")
      ]);

      if (pageRes.data?.sections) setPageSettings(pageRes.data.sections);
      if (servicesRes.data) setServices(servicesRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Box;
    return Icon;
  };

  const getServicesByCategory = (category: string) => 
    services.filter(s => s.category === category);

  const renderServiceItem = (service: any, isAccordion = false) => {
    const Icon = getIcon(service.icon);
    
    if (isAccordion) {
      return (
        <AccordionItem key={service.id} value={service.id} className="border border-border rounded-lg px-4 bg-background">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3 text-left">
              <Icon className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
              <h5 className="font-semibold text-base">{service.title}</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pl-8">
            <p className="text-[15px] text-muted-foreground leading-relaxed">{service.description}</p>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Card key={service.id} className="p-6 border-border">
        <Icon className="h-9 w-9 mb-4 text-accent stroke-[2px]" />
        <h5 className="font-semibold text-lg mb-3">{service.title}</h5>
        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="w-full relative">
            <img src={pageSettings.hero_image || heroHvac} alt="Construction and building systems" className="w-full h-[420px] md:h-[600px] object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-0">
              <div className="container-narrow w-full">
                <div className="w-full max-w-4xl p-[30px]" style={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}>
                  <div className="max-w-[700px]">
                    <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">{pageSettings.hero_eyebrow || 'What we do'}</p>
                    <h1 className="text-[34px] leading-[38px] md:text-5xl md:leading-[1.1] lg:text-6xl lg:leading-[1.1] mb-4 text-foreground">
                      {pageSettings.hero_title || 'Building systems that just work'}
                    </h1>
                    <p className="text-base text-muted-foreground">{pageSettings.hero_description || 'Comprehensive construction and MEP services'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Anchors Section */}
        <section className="py-12 md:py-16 px-6 md:px-8" style={{ backgroundColor: '#202d7c' }}>
          <div className="max-w-[1240px] mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-white/80 font-medium mb-4">OUR SERVICES</p>
            <h2 className="text-3xl md:text-4xl mb-12 text-white mx-auto">{pageSettings.services_section_title || 'Comprehensive construction and MEP expertise'}</h2>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {getServicesByCategory('service_anchor').map((anchor) => {
                const Icon = getIcon(anchor.icon);
                return (
                  <button 
                    key={anchor.id} 
                    onClick={() => scrollToSection(anchor.slug)}
                    className="flex flex-col items-center bg-[#1a2461] rounded-lg p-8 hover:bg-[#1a2461]/90 transition-colors cursor-pointer w-full"
                  >
                    <div className="w-20 h-20 mb-4 flex items-center justify-center">
                      <Icon className="h-12 w-12 text-white stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{anchor.title}</h3>
                    <div className="mt-4 text-white flex items-center gap-2">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* General Construction */}
        <section id="gc-anchor" className="pt-24 pb-24 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            {loading ? <Skeleton className="h-96" /> : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl mb-3 text-accent">{pageSettings.gc_title || 'General Construction'}</h2>
                  <p className="text-muted-foreground max-w-3xl font-medium text-lg">{pageSettings.gc_description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {[0, 1].map(col => (
                    <Accordion key={col} type="multiple" className="w-full space-y-3">
                      {getServicesByCategory('general_construction').slice(col * 4, (col + 1) * 4).map(s => renderServiceItem(s, true))}
                    </Accordion>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Consulting */}
        <section id="consulting-anchor" className="pt-24 pb-24 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl mb-3 text-accent">{pageSettings.consulting_title || 'Consulting and Permitting'}</h2>
                  <p className="text-muted-foreground font-medium text-lg">{pageSettings.consulting_description}</p>
                </div>
                <Accordion type="multiple" className="w-full space-y-3">
                  {getServicesByCategory('consulting').map(s => renderServiceItem(s, true))}
                </Accordion>
              </div>
              <div className="hidden md:block">
                <img src={pageSettings.consulting_image || consultingTeam} alt="Consulting" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Facility Maintenance */}
        <section id="fm-anchor" className="pt-24 pb-24 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-2xl md:text-3xl mb-3 text-accent mx-auto">{pageSettings.fm_title || 'Facility Maintenance & Emergency Response'}</h2>
              <p className="text-muted-foreground max-w-3xl font-medium text-lg mx-auto">{pageSettings.fm_description || 'KNova Contractors provides boutique-style facility operations with preventive and reactive maintenance, delivering scheduled preventive care and rapid response to keep operations smooth. Performing regular maintenance helps catch and resolve issues before they become failures, extending equipment life and reducing unplanned costs. If you\'re a property owner, landlord, facility manager, or co-op board member, we tailor solutions to your building and priorities to save time, control costs, and simplify operations.'}</p>
            </div>

            {isMobile ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-center mb-6 text-accent">Preventive Maintenance</h3>
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Benefits</h4>
                    <Accordion type="multiple" className="w-full space-y-3">
                      {getServicesByCategory('fm_benefits').map(s => renderServiceItem(s, true))}
                    </Accordion>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Common Services</h4>
                    <Accordion type="multiple" className="w-full space-y-3">
                      {getServicesByCategory('fm_common_services').map(s => renderServiceItem(s, true))}
                    </Accordion>
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="text-2xl font-semibold text-center mb-6 text-accent">Reactive Maintenance Services</h3>
                  <p className="text-base text-muted-foreground max-w-3xl mx-auto text-center mb-8">{pageSettings.fm_reactive_description}</p>
                  <h4 className="text-xl font-semibold mb-4">Scenarios</h4>
                  <Accordion type="multiple" className="w-full space-y-3">
                    {getServicesByCategory('fm_scenarios').map(s => renderServiceItem(s, true))}
                  </Accordion>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="preventive" className="w-full">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-12">
                  <TabsTrigger value="preventive">{pageSettings.fm_preventive_title || 'Preventive Maintenance'}</TabsTrigger>
                  <TabsTrigger value="reactive">{pageSettings.fm_reactive_title || 'Reactive Maintenance Services'}</TabsTrigger>
                </TabsList>
                <TabsContent value="preventive">
                  <div className="mb-16">
                    <h4 className="text-2xl font-semibold text-center mb-10">Benefits</h4>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      {getServicesByCategory('fm_benefits').map(s => renderServiceItem(s))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-center mb-10">Common Services</h4>
                    <div className="grid md:grid-cols-4 gap-6">
                      {getServicesByCategory('fm_common_services').map(s => renderServiceItem(s))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reactive">
                  <div className="text-center mb-12">
                    <p className="text-base text-muted-foreground max-w-3xl mx-auto">{pageSettings.fm_reactive_description}</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-center mb-10">Scenarios</h4>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      {getServicesByCategory('fm_scenarios').map(s => renderServiceItem(s))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <div className="mt-[40px] max-w-[900px] mx-auto text-center rounded-lg p-8" style={{ backgroundColor: '#202d7c' }}>
              <h3 className="text-2xl font-semibold text-white mb-3 text-center">{pageSettings.emergency_cta_title || '24/7 Facility Emergency Services'}</h3>
              <p className="text-white/90 mb-6 text-center">Our 24/7 service provides on-call technical support for unexpected incidents across critical building systems, with immediate, professional response at any time.</p>
              <p className="text-white/90 mb-6 text-center">{pageSettings.emergency_cta_description}</p>
              <Button size="lg" className="bg-white text-[#202d7c] hover:bg-white/90" asChild>
                <Link to="/contact">{pageSettings.emergency_cta_button_text || 'Request 24/7 Service'}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pt-24 pb-24 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary mx-auto">{pageSettings.final_cta_title || 'Ready to start your project?'}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">{pageSettings.final_cta_button1_text || 'Contact Us'}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">{pageSettings.final_cta_button2_text || 'See projects'}</Link>
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
