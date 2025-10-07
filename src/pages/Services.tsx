import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import fullWidthServices from "@/assets/full-width-services.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  icon_url?: string | null;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from("cms_services")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setServices(data);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.Circle;
  };

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
              className="w-full h-[420px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl" style={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}>
                <div className="p-8 md:p-12 lg:p-16">
                  <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">What we do</p>
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
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <AccordionItem 
                    key={service.id} 
                    value={service.id} 
                    className="border border-border rounded-lg px-6 bg-background hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        {service.icon_url ? (
                          <img 
                            src={service.icon_url} 
                            alt="" 
                            className="h-7 w-7 flex-shrink-0 object-contain"
                          />
                        ) : (
                          <Icon className="h-7 w-7 text-accent stroke-[2px] flex-shrink-0" />
                        )}
                        <h3 className="font-bold text-[20px] md:text-[20px] text-[19px]">{service.title}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-11">
                      <p className="text-base text-muted-foreground leading-relaxed">{service.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">Ready to start your project?</h2>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;