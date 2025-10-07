import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  year: z.string().min(1, "Year is required"),
  category: z.string().min(1, "Category is required"),
  size: z.string().optional(),
  description: z.string().optional(),
});

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    year: new Date().getFullYear().toString(),
    category: "",
    size: "",
    description: "",
    details: [""],
    image_url: "",
    featured: false,
  });

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          year: data.year,
          category: data.category,
          size: data.size || "",
          description: data.description || "",
          details: data.details.length > 0 ? data.details : [""],
          image_url: data.image_url || "",
          featured: data.featured,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error loading project",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const addDetail = () => {
    setFormData({ ...formData, details: [...formData.details, ""] });
  };

  const removeDetail = (index: number) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validate
      projectSchema.parse(formData);

      const projectData = {
        ...formData,
        details: formData.details.filter((d) => d.trim() !== ""),
        updated_at: new Date().toISOString(),
      };

      let error;
      if (id) {
        ({ error } = await supabase
          .from("cms_projects")
          .update(projectData)
          .eq("id", id));
      } else {
        ({ error } = await supabase
          .from("cms_projects")
          .insert([projectData]));
      }

      if (error) throw error;

      toast({
        title: id ? "Project updated" : "Project created",
        description: `The project has been successfully ${id ? "updated" : "created"}.`,
      });

      navigate("/admin/projects");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving project",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/projects")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold">{id ? "Edit" : "New"} Project</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">URL-friendly version of the title</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Commercial, Healthcare, Education"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="e.g., 7,800 sf"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Project Details</Label>
              {formData.details.map((detail, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={detail}
                    onChange={(e) => handleDetailChange(index, e.target.value)}
                    placeholder="Enter a detail"
                  />
                  {formData.details.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeDetail(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addDetail}>
                Add Detail
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="/assets/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/projects")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;