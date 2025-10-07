import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["cms_projects"]["Row"];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("cms_projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });

      loadProjects();
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      const { error } = await supabase
        .from("cms_projects")
        .update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: newStatus === "published" ? "Project published" : "Project unpublished",
        description: `The project is now ${newStatus}.`,
      });

      loadProjects();
    } catch (error: any) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your project portfolio
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Badge variant={project.status === "published" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                    {project.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.category} • {project.year} • {project.size}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.details.slice(0, 3).map((detail, idx) => (
                      <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                        {detail}
                      </span>
                    ))}
                    {project.details.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.details.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(project.id, project.status)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {project.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Link to={`/admin/projects/${project.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Link to="/admin/projects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Projects;