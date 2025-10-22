import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "service_anchor", label: "Service Anchor" },
  { value: "general_construction", label: "General Construction" },
  { value: "consulting", label: "Consulting" },
  { value: "fm_benefits", label: "FM Benefits" },
  { value: "fm_common_services", label: "FM Common Services" },
  { value: "fm_scenarios", label: "FM Scenarios" },
];

const iconOptions = [
  "Wind", "Zap", "Droplet", "Flame", "Cable", "Building2", "Wrench",
  "DollarSign", "Clock", "Leaf", "Shield", "Calendar", "Lightbulb",
  "Plug", "Eye", "Home", "ArrowUp", "AlertTriangle", "CloudRain"
];

const ServiceItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "Wind",
    category: "general_construction",
    display_order: 1,
    status: "published" as "published" | "draft",
  });

  useEffect(() => {
    if (id && id !== "new") {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_services")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          icon: data.icon || "Wind",
          category: data.category || "general_construction",
          display_order: data.display_order || 1,
          status: (data.status as "published" | "draft") || "published",
        });
      }
    } catch (error: any) {
      console.error("Error loading service:", error);
      toast({
        title: "Error loading item",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      };

      if (id && id !== "new") {
        const { error } = await supabase
          .from("cms_services")
          .update(dataToSave)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cms_services")
          .insert([dataToSave]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Item ${id && id !== "new" ? "updated" : "created"} successfully.`,
      });

      navigate("/admin/service-items");
    } catch (error: any) {
      console.error("Error saving item:", error);
      toast({
        title: "Error saving item",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {id && id !== "new" ? "Edit" : "Create"} Service Item
        </h1>
        <p className="text-muted-foreground mt-1">
          {id && id !== "new" ? "Update" : "Add a new"} service item, benefit, or scenario
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Fill in the information for this service item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="icon">Icon (Lucide Icon Name)</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "published" | "draft") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Item"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/service-items")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceItemForm;
