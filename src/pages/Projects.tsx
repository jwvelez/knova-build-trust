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
      desc: "7,800 sf buildout with steel framing, new kitchen and baths, upgraded electrical and HVAC. Flexible, tenant-ready, fully compliant.",
      image: projectOffice,
    },
    {
      title: "Residential Apartment — Manhattan",
      year: "2024",
      category: "Housing",
      desc: "1,200 sf full gut renovation with plumbing, HVAC, and electrical upgrades. Delivered early, improved comfort, up to modern standards.",
      image: projectOffice,
    },
    {
      title: "Community Health Centers Expansion — Bronx",
      year: "2022–2023",
      category: "Healthcare",
      desc: "Two FQHCs expanded at 12,000 and 13,800 sf with integrated data systems, added capacity, upgraded infrastructure.",
      image: projectHealth,
    },
    {
      title: "Day Care Centers Expansion — Bronx & Brooklyn",
      year: "2012–2013",
      category: "Education",
      desc: "One new 15,000 sf facility and one 15,000 sf renovation and expansion. Modern, safe, and code compliant.",
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
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project, i) => (
                <Card key={i} className="overflow-hidden card-lift border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-xs overline mb-2">{project.year}</p>
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
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
