import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Database } from "@/integrations/supabase/types";

type SEORecord = Database["public"]["Tables"]["cms_seo"]["Row"];

const SEO = () => {
  const [seoRecords, setSeoRecords] = useState<SEORecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    entity_type: "page",
    entity_id: "",
    title: "",
    description: "",
    keywords: [] as string[],
    canonical_url: "",
    og_image: "",
    og_type: "website",
    robots_index: true,
    robots_follow: true,
    structured_data: {},
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSEORecords();
  }, []);

  const loadSEORecords = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_seo")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSeoRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading SEO records",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const seoData = {
        ...formData,
        entity_id: formData.entity_id || null,
      };

      let error;
      if (editingId) {
        ({ error } = await supabase
          .from("cms_seo")
          .update(seoData)
          .eq("id", editingId));
      } else {
        ({ error } = await supabase
          .from("cms_seo")
          .insert([seoData]));
      }

      if (error) throw error;

      toast({
        title: editingId ? "SEO updated" : "SEO created",
        description: "SEO settings have been saved successfully.",
      });

      resetForm();
      loadSEORecords();
    } catch (error: any) {
      toast({
        title: "Error saving SEO",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (record: SEORecord) => {
    setEditingId(record.id);
    setFormData({
      entity_type: record.entity_type,
      entity_id: record.entity_id || "",
      title: record.title,
      description: record.description || "",
      keywords: record.keywords || [],
      canonical_url: record.canonical_url || "",
      og_image: record.og_image || "",
      og_type: record.og_type || "website",
      robots_index: record.robots_index ?? true,
      robots_follow: record.robots_follow ?? true,
      structured_data: record.structured_data || {},
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this SEO record?")) return;

    try {
      const { error } = await supabase
        .from("cms_seo")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "SEO deleted",
        description: "SEO record has been deleted.",
      });

      loadSEORecords();
    } catch (error: any) {
      toast({
        title: "Error deleting SEO",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      entity_type: "page",
      entity_id: "",
      title: "",
      description: "",
      keywords: [],
      canonical_url: "",
      og_image: "",
      og_type: "website",
      robots_index: true,
      robots_follow: true,
      structured_data: {},
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage SEO metadata for pages and content
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit" : "Add"} SEO Record</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entity_type">Entity Type *</Label>
                <Select
                  value={formData.entity_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, entity_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entity_id">Entity ID (optional)</Label>
                <Input
                  id="entity_id"
                  value={formData.entity_id}
                  onChange={(e) =>
                    setFormData({ ...formData, entity_id: e.target.value })
                  }
                  placeholder="Leave empty for global settings"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Meta Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                maxLength={60}
                required
              />
              <p className="text-xs text-muted-foreground">
                {formData.title.length}/60 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/160 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={formData.keywords.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keywords: e.target.value.split(",").map((k) => k.trim()).filter(k => k),
                  })
                }
                placeholder="construction, contractor, building"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={formData.canonical_url}
                  onChange={(e) =>
                    setFormData({ ...formData, canonical_url: e.target.value })
                  }
                  placeholder="https://example.com/page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={formData.og_image}
                  onChange={(e) =>
                    setFormData({ ...formData, og_image: e.target.value })
                  }
                  placeholder="/images/og-image.jpg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="robots_index"
                  checked={formData.robots_index}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, robots_index: checked })
                  }
                />
                <Label htmlFor="robots_index">Allow Indexing</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="robots_follow"
                  checked={formData.robots_follow}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, robots_follow: checked })
                  }
                />
                <Label htmlFor="robots_follow">Allow Following</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update" : "Create"} SEO
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing SEO Records</h2>
        {seoRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No SEO records yet</p>
            </CardContent>
          </Card>
        ) : (
          seoRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded">
                        {record.entity_type}
                      </span>
                      {record.entity_id && (
                        <span className="text-xs text-muted-foreground">
                          ID: {record.entity_id}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{record.title}</h3>
                    {record.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {record.description}
                      </p>
                    )}
                    {record.keywords && record.keywords.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {record.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-secondary rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SEO;
