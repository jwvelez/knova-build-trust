import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import projectOffice from "@/assets/project-office.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [additionalProjects, setAdditionalProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_projects")
        .select("*")
        .eq("status", "published")
        .order("display_order");

      if (error) throw error;
      
      if (data) {
        const featured = data.filter(p => p.featured);
        const additional = data.filter(p => !p.featured);
        
        // Map old local filenames to imports, otherwise use the URL directly
        const getImageUrl = (imageUrl: string | null) => {
          if (!imageUrl) return projectOffice;
          
          // If it's a full URL (uploaded file), use it directly
          if (imageUrl.startsWith('http')) return imageUrl;
          
          // Otherwise map old filenames to local imports
          const imageMap: Record<string, string> = {
            'project-office.jpg': projectOffice,
            'project-health.jpg': projectHealth,
            'project-daycare.jpg': projectDaycare,
          };
          
          return imageMap[imageUrl] || projectOffice;
        };
        
        setFeaturedProjects(featured.map(p => ({
          ...p,
          image: getImageUrl(p.image_url)
        })));
        setAdditionalProjects(additional);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'housing', label: 'Housing' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'mixed-use', label: 'Mixed-Use' },
    { id: 'restaurants-retail', label: 'Restaurants & Retail' },
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
            {loading ? (
              <div className="space-y-16 mb-20">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
              </div>
            ) : (
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
                          {project.details.map((detail: string, idx: number) => (
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
            )}

            {/* Additional Projects */}
            {!loading && filteredAdditionalProjects.length > 0 && (
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
                      </div>
                      <ul className="space-y-3">
                        {project.details.map((detail: string, idx: number) => (
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
