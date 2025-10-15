import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'housing', label: 'Housing' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'mixed-use', label: 'Mixed-Use' },
    { id: 'restaurants-retail', label: 'Restaurants & Retail' },
  ];

  const featuredProjects = [
    {
      title: "Commercial Office: Manhattan",
      year: "2025",
      category: "commercial",
      size: "7,800 sf",
      details: [
        "Steel framing and structural work",
        "New kitchen and bathroom installations",
        "Upgraded HVAC with modern controls",
        "Complete electrical system upgrade",
        "Tenant-ready, flexible workspace design",
        "NYC DOB compliant"
      ],
      image: projectOffice,
    },
    {
      title: "Community Health Centers Expansion: Bronx",
      year: "2022–2023",
      category: "healthcare",
      size: "12,000 sf and 13,800 sf",
      details: [
        "Two FQHC facilities expanded simultaneously",
        "Integrated data and telecom systems",
        "Added capacity for primary care services",
        "Upgraded HVAC for improved air quality",
        "Electrical infrastructure modernization",
        "Coordinated phasing to maintain operations"
      ],
      image: projectHealth,
    },
    {
      title: "Day Care Centers Expansion: Bronx & Brooklyn",
      year: "2012–2013",
      category: "education",
      size: "15,000 sf each",
      details: [
        "One new build and one renovation/expansion",
        "Safe, modern environments for children",
        "Full code compliance including accessibility",
        "Age-appropriate HVAC and ventilation",
        "Energy-efficient lighting and electrical systems",
        "Durable finishes and easy-maintenance systems"
      ],
      image: projectDaycare,
    },
    {
      title: "Supermarket Buildouts: Bronx & Brooklyn",
      year: "2012–2013",
      category: "restaurants-retail",
      size: "Various",
      details: [
        "White Plains Rd, Bronx: 13,800 sf with co-located day care (TDC $4M, 2013)",
        "210 Clarkson Ave, Brooklyn: 14,000 sf with day care (TDC $4M, 2013)",
        "257 Drakes Ave, Brooklyn: 6,170 sf supermarket (TDC $600K, 2012)",
        "GC + MEP delivery: plumbing, sprinklers, HVAC, and electrical",
        "Clean inspections and tenant-ready turnover"
      ],
      image: projectOffice,
    },
  ];

  const additionalProjects = [
    {
      title: "Mixed-Use: 495 Flatbush Ave, Brooklyn",
      year: "2022",
      category: "mixed-use",
      size: "118,000 sf",
      tdc: "$10M",
      details: [
        "Office, retail, gym, and school spaces",
        "GC + consulting, plumbing, sprinklers, HVAC, and electrical",
        "Modernized systems and fully code-compliant delivery"
      ],
    },
    {
      title: "Mixed-Use: 774 Broadway, Brooklyn",
      year: "2025",
      category: "mixed-use",
      size: "56,357 sf",
      tdc: "$6M",
      details: [
        "New construction mixed-use program",
        "GC + consulting, plumbing, sprinklers, HVAC, and electrical",
        "Turnkey systems and code-compliant occupancy"
      ],
    },
    {
      title: "Restaurant Rehabilitation: 2458 Webster Ave, Bronx",
      year: "2017",
      category: "restaurants-retail",
      size: "16,000 sf",
      details: [
        "Full rehabilitation with MEP upgrades and sprinklers",
        "GC + consulting, plumbing, HVAC, and electrical",
        "Safer operations and modern code compliance"
      ],
    },
    {
      title: "Restaurant Renovation: 10 Reed St, Manhattan",
      year: "2007",
      category: "restaurants-retail",
      size: "8,000 sf",
      details: [
        "Interior renovation with HVAC and electrical upgrades",
        "Sprinkler coordination and code compliance",
        "Tenant-ready turnover"
      ],
    },
    {
      title: "Restaurant Renovation: 3795 Tenth Ave, Manhattan",
      year: "2016",
      category: "restaurants-retail",
      size: "9,800 sf",
      details: [
        "Interior renovation and MEP modernization",
        "Sprinkler coordination and code compliance",
        "Improved comfort and efficiency"
      ],
    },
    {
      title: "Juvenile Center Buildout: 3030 Bruner Ave, Bronx",
      year: "2017",
      category: "education",
      size: "9,891 sf",
      tdc: "$2.7M",
      details: [
        "Complete buildout with GC + MEP",
        "Secure, code-compliant facility delivery"
      ],
    },
    {
      title: "Juvenile Center Buildout: 133-23 127th St, Ozone Park, Queens",
      year: "—",
      category: "education",
      size: "10,294 sf",
      tdc: "$3.8M",
      details: [
        "Complete buildout with GC + MEP",
        "Agency coordination and inspections"
      ],
    },
    {
      title: "Mixed-Use Renovation: 276 Hudson St, Hackensack, NJ",
      year: "2019",
      category: "mixed-use",
      tdc: "$500K",
      details: [
        "Building-wide renovation with MEP and sprinklers",
        "Safer, modernized systems and finishes"
      ],
    },
    {
      title: "Residential Rehabilitation: 983 Amsterdam Ave, Manhattan",
      year: "2019",
      category: "housing",
      size: "10 units",
      tdc: "$300K",
      details: [
        "Unit rehab with plumbing, HVAC, and electrical upgrades",
        "Compliance-focused delivery, minimal disruption"
      ],
    },
    {
      title: "Residential + Commercial Rehabilitation: 1196 Metropolitan Ave, Brooklyn",
      year: "2013",
      category: "housing",
      size: "6 units + 2 commercial floors",
      tdc: "$300K",
      details: [
        "Multi-use rehabilitation with MEP and sprinklers",
        "Code-compliant handoff and improved building performance"
      ],
    },
  ];

  const filteredFeaturedProjects = activeFilter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.category === activeFilter);

  const filteredAdditionalProjects = activeFilter === 'all' 
    ? additionalProjects 
    : additionalProjects.filter(p => p.category === activeFilter);

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
            <p className="text-lg text-muted-foreground max-w-2xl">
              Recent work showcasing our commitment to quality and performance across sectors
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl mb-8">
              Experience Highlights
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* Featured Projects */}
            <div className="space-y-16 mb-20">
              {filteredFeaturedProjects.map((project, i) => (
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
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-sm mb-4">
                          <span className="text-accent font-medium">{project.year}</span>
                          <span className="text-accent">•</span>
                          <span className="text-accent font-medium">{project.size}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-[0.6rem] flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Projects */}
            {filteredAdditionalProjects.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl mb-8">
                  Additional Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredAdditionalProjects.map((project, i) => (
                    <Card key={i} className="p-6 border-border">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm mb-4 text-accent font-medium">
                        <span>{project.year}</span>
                        {project.size && (
                          <>
                            <span>•</span>
                            <span>{project.size}</span>
                          </>
                        )}
                        {project.tdc && (
                          <>
                            <span>•</span>
                            <span>TDC {project.tdc}</span>
                          </>
                        )}
                      </div>
                      <ul className="space-y-3">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-[0.6rem] flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary mx-auto">Ready to start your project?</h2>
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
