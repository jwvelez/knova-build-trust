import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";

const Projects = () => {

  

  const projects = [
    {
      title: "Commercial Office — Manhattan",
      year: "2025",
      category: "Commercial",
      size: "7,800 sf",
      details: [
        "Steel framing and structural work",
        "New kitchen and bathroom installations",
        "Upgraded HVAC system with modern controls",
        "Complete electrical system upgrade",
        "Tenant-ready, flexible workspace design",
        "Fully compliant with NYC DOB requirements"
      ],
      image: projectOffice,
    },
    {
      title: "Community Health Centers Expansion — Bronx",
      year: "2022–2023",
      category: "Healthcare",
      size: "12,000 sf and 13,800 sf",
      details: [
        "Two FQHC facilities expanded simultaneously",
        "Integrated data and telecommunications systems",
        "Added capacity for primary care services",
        "Upgraded HVAC for improved air quality",
        "Complete electrical infrastructure modernization",
        "Coordinated phasing to maintain operations"
      ],
      image: projectHealth,
    },
    {
      title: "Day Care Centers Expansion — Bronx & Brooklyn",
      year: "2012–2013",
      category: "Education",
      size: "15,000 sf each",
      details: [
        "One new build, one renovation and expansion",
        "Modern, safe environments for children",
        "Full code compliance including accessibility",
        "Age-appropriate HVAC and ventilation",
        "Energy-efficient lighting and electrical systems",
        "Durable finishes and easy-maintenance systems"
      ],
      image: projectDaycare,
    },
    {
      title: "Supermarket Buildouts — Bronx & Brooklyn",
      year: "2012–2013",
      category: "Commercial",
      size: "Various",
      details: [
        "White Plains Rd, Bronx — 13,800 sf supermarket with co-located day care",
        "210 Clarkson Ave, Brooklyn — 14,000 sf supermarket with day care",
        "257 Drakes Ave, Brooklyn — 6,170 sf supermarket",
        "GC + MEP delivery including plumbing, sprinklers, HVAC, and electrical",
        "Clean inspections and tenant-ready turnover"
      ],
      image: projectOffice,
    },
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">Projects</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">
              Work that speaks for itself
            </h1>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl mb-2">
              Experience Highlights
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Recent work showcasing our commitment to quality and performance across diverse sectors
            </p>
            
            <div className="space-y-16">
            {projects.map((project, i) => (
              <div key={i} className="border-b border-accent/20 pb-16 last:border-b-0 last:pb-0">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className="relative overflow-hidden rounded-lg group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-accent font-medium">{project.year}</span>
                        <span className="text-accent">•</span>
                        <span className="text-accent font-medium">{project.size}</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            </div>
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

export default Projects;
