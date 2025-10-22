import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["cms_services"]["Row"];

interface ContentSection {
  icon: string;
  title: string;
  description: string;
}

const ServiceIcon = ({ iconName, iconUrl, className = "h-7 w-7" }: { iconName: string; iconUrl?: string | null; className?: string }) => {
  if (iconUrl) {
    return <img src={iconUrl} alt="" className={className} />;
  }
  
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.CircleHelp;
  return <Icon className={className} />;
};

const ServiceSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-2xl" />
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-7 w-7 rounded" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_services")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error("Error loading services:", error);
      toast({
        title: "Error loading services",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderSectionItems = (items: ContentSection[] = []) => {
    return items.map((item, index) => (
      <Card key={index}>
        <CardContent className="p-6">
          <ServiceIcon iconName={item.icon} className="h-7 w-7 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
      </Card>
    ));
  };

  const renderAccordionItems = (items: ContentSection[] = []) => {
    return items.map((item, index) => (
      <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4 bg-background">
        <AccordionTrigger className="text-left hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <ServiceIcon iconName={item.icon} className="h-5 w-5 text-accent stroke-[2px] flex-shrink-0" />
            <span className="font-semibold text-base">{item.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pl-8">
          <p className="text-[15px] text-muted-foreground leading-relaxed">{item.description}</p>
        </AccordionContent>
      </AccordionItem>
    ));
  };

  const renderServiceContent = (service: Service) => {
    const content = (service.content as any) || {};
    const benefits = content.benefits || [];
    const commonServices = content.common_services || [];
    const scenarios = content.scenarios || [];

    // For General Construction type - use accordion
    if (service.service_type === 'general' || !service.service_type) {
      return (
        <div className="space-y-8">
          {benefits.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Accordion type="multiple" className="w-full space-y-3">
                {renderAccordionItems(benefits.slice(0, Math.ceil(benefits.length / 2)))}
              </Accordion>
              <Accordion type="multiple" className="w-full space-y-3">
                {renderAccordionItems(benefits.slice(Math.ceil(benefits.length / 2)))}
              </Accordion>
            </div>
          )}
        </div>
      );
    }

    // For Facility Management type - use tabs on desktop, accordion on mobile
    if (service.service_type === 'facility_management') {
      if (isMobile) {
        // Mobile: Show all as accordions
        return (
          <div className="space-y-8">
            {benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-10">Benefits</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {renderAccordionItems(benefits)}
                </Accordion>
              </div>
            )}
            {commonServices.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-10">Common Services</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {renderAccordionItems(commonServices)}
                </Accordion>
              </div>
            )}
            {scenarios.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-10">Scenarios</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {renderAccordionItems(scenarios)}
                </Accordion>
              </div>
            )}
          </div>
        );
      } else {
        // Desktop: Use tabs
        const tabsList = [];
        if (benefits.length > 0) tabsList.push({ value: "benefits", label: "Benefits" });
        if (commonServices.length > 0) tabsList.push({ value: "common-services", label: "Common Services" });
        if (scenarios.length > 0) tabsList.push({ value: "scenarios", label: "Scenarios" });

        return (
          <Tabs defaultValue={tabsList[0]?.value || "benefits"} className="w-full">
            <TabsList className={`grid w-full max-w-2xl mx-auto grid-cols-${tabsList.length} mb-12`}>
              {tabsList.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>

            {benefits.length > 0 && (
              <TabsContent value="benefits" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {renderSectionItems(benefits)}
                </div>
              </TabsContent>
            )}

            {commonServices.length > 0 && (
              <TabsContent value="common-services" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {renderSectionItems(commonServices)}
                </div>
              </TabsContent>
            )}

            {scenarios.length > 0 && (
              <TabsContent value="scenarios" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {renderSectionItems(scenarios)}
                </div>
              </TabsContent>
            )}
          </Tabs>
        );
      }
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 space-y-16">
            <ServiceSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 space-y-16">
          {services.map((service) => (
            <section key={service.id} className="space-y-8">
              <div className="bg-card border border-border rounded-lg max-w-4xl mx-auto">
                <div className="p-[30px]">
                  <div className="max-w-[700px]">
                    <p className="text-sm text-muted-foreground mb-2">
                      {service.service_type === 'facility_management' ? 'Facility Management' : 'General Construction'}
                    </p>
                    <h1 className="text-4xl font-bold mb-4">
                      {service.hero_title || service.title}
                    </h1>
                    {service.hero_subtitle && (
                      <p className="text-lg text-muted-foreground">
                        {service.hero_subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-[1240px] mx-auto">
                {renderServiceContent(service)}
              </div>
            </section>
          ))}

          {services.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Services Available</h2>
              <p className="text-muted-foreground mb-8">
                Check back soon for our service offerings.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
