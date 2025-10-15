import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooterCTA from "@/components/MobileFooterCTA";
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
      category: "Restaurants & Retail",
      size: "Various",
      details: [
        "White Plains Rd (13,800 sf with co-located day care)",
        "210 Clarkson Ave (14,000 sf with day care)",
        "257 Drakes Ave (6,170 sf)",
        "GC + MEP delivery including plumbing, sprinklers, HVAC, and electrical",
        "Clean inspections and tenant-ready turnover"
      ],
      image: projectOffice,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <MobileFooterCTA />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline">SELECTED WORK</p>
            <h1 className="mb-4">Results over rhetoric</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Recent work showcasing our commitment to quality and performance across sectors
            </p>
          </div>
        </section>

        {/* Projects List */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="space-y-16">
              {projects.map((project, i) => (
                <Card 
                  key={i} 
                  className="overflow-hidden border-2 rounded-2xl hover:border-accent hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video md:aspect-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="mb-4">
                        <span className="px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full border border-accent/20">
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="mb-3">{project.title}</h3>
                      
                      <div className="flex items-center gap-2 text-accent font-semibold mb-6">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.size}</span>
                      </div>
                      
                      <ul className="space-y-3">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center max-w-3xl mx-auto">
            <h2 className="mb-8">Ready to start your project?</h2>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
