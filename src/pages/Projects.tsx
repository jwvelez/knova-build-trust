import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Healthcare", "Housing", "Commercial", "Education", "Community Facilities"];

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
      title: "Residential Apartment — Manhattan",
      year: "2024",
      category: "Housing",
      size: "1,200 sf",
      details: [
        "Full gut renovation from studs",
        "New plumbing throughout with upgraded fixtures",
        "High-efficiency HVAC installation",
        "Complete electrical rewiring and panel upgrade",
        "Delivered two weeks ahead of schedule",
        "Improved comfort and energy efficiency"
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
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline mb-4">Selected work</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">
              Results over rhetoric
            </h1>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container-narrow">
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-narrow space-y-16">
            {filteredProjects.map((project, i) => (
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
                      <p className="text-xs overline mb-2">{project.year}</p>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-accent font-medium">{project.size}</p>
                    </div>
                    <ul className="space-y-3">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
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
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center">
            <h2 className="text-2xl md:text-3xl mb-6">Ready to start your project?</h2>
            <Button size="lg" asChild>
              <Link to="/contact">Request a project walkthrough</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
