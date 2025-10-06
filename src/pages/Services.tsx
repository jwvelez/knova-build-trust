import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hammer, Wind, Zap, Droplet, Flame, Network, Home, Factory, Thermometer, FileText, Building2, Wrench } from "lucide-react";

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
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline mb-4">What we do</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">
              Building systems that just work
            </h1>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Card key={i} className="p-6 card-lift border-border group">
                    <Icon className="h-9 w-9 mb-4 text-primary stroke-[2px] group-hover:text-accent transition-colors" />
                    <h3 className="font-semibold mb-3 text-lg">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </Card>
                );
              })}
            </div>
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
