import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ServicesPageSettings {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  services_section_title: string;
  services_section_description: string;
  gc_title: string;
  gc_description: string;
  consulting_title: string;
  consulting_description: string;
  consulting_image: string;
  fm_title: string;
  fm_description: string;
  fm_preventive_title: string;
  fm_reactive_title: string;
  fm_reactive_description: string;
  emergency_cta_title: string;
  emergency_cta_description: string;
  emergency_cta_button_text: string;
  final_cta_title: string;
  final_cta_button1_text: string;
  final_cta_button2_text: string;
}

const ServicesPageEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageId, setPageId] = useState<string>("");
  const [settings, setSettings] = useState<ServicesPageSettings>({
    hero_eyebrow: "",
    hero_title: "",
    hero_description: "",
    hero_image: "",
    services_section_title: "",
    services_section_description: "",
    gc_title: "",
    gc_description: "",
    consulting_title: "",
    consulting_description: "",
    consulting_image: "",
    fm_title: "",
    fm_description: "",
    fm_preventive_title: "",
    fm_reactive_title: "",
    fm_reactive_description: "",
    emergency_cta_title: "",
    emergency_cta_description: "",
    emergency_cta_button_text: "",
    final_cta_title: "",
    final_cta_button1_text: "",
    final_cta_button2_text: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("id, sections")
        .eq("slug", "services")
        .single();

      if (error) throw error;

      if (data) {
        setPageId(data.id);
        const sections = data.sections as any;
        if (sections && typeof sections === "object") {
          setSettings(sections as ServicesPageSettings);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error loading settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageId) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_pages")
        .update({
          sections: settings as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Services page settings saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ServicesPageSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!pageId) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No settings found for Services page</p>
        <Button onClick={() => navigate("/admin/pages")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Services Page</h1>
            <p className="text-muted-foreground mt-1">Manage all Services page content</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Eyebrow Text</label>
            <Input
              value={settings.hero_eyebrow}
              onChange={(e) => updateField("hero_eyebrow", e.target.value)}
              placeholder="What we do"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Hero Title</label>
            <Input
              value={settings.hero_title}
              onChange={(e) => updateField("hero_title", e.target.value)}
              placeholder="Building systems that just work"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Hero Description</label>
            <Textarea
              value={settings.hero_description}
              onChange={(e) => updateField("hero_description", e.target.value)}
              placeholder="Hero description"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Hero Image URL</label>
            <Input
              value={settings.hero_image}
              onChange={(e) => updateField("hero_image", e.target.value)}
              placeholder="Image URL"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Section Title</label>
            <Input
              value={settings.services_section_title}
              onChange={(e) => updateField("services_section_title", e.target.value)}
              placeholder="Comprehensive construction and MEP expertise"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Section Description</label>
            <Input
              value={settings.services_section_description}
              onChange={(e) => updateField("services_section_description", e.target.value)}
              placeholder="Choose a category to learn more"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Construction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={settings.gc_title}
              onChange={(e) => updateField("gc_title", e.target.value)}
              placeholder="General Construction"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={settings.gc_description}
              onChange={(e) => updateField("gc_description", e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consulting & Permitting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={settings.consulting_title}
              onChange={(e) => updateField("consulting_title", e.target.value)}
              placeholder="Consulting and Permitting"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={settings.consulting_description}
              onChange={(e) => updateField("consulting_description", e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Image URL</label>
            <Input
              value={settings.consulting_image}
              onChange={(e) => updateField("consulting_image", e.target.value)}
              placeholder="Image URL"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facility Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={settings.fm_title}
              onChange={(e) => updateField("fm_title", e.target.value)}
              placeholder="Facility Maintenance & Emergency Response"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={settings.fm_description}
              onChange={(e) => updateField("fm_description", e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Preventive Maintenance Title</label>
            <Input
              value={settings.fm_preventive_title}
              onChange={(e) => updateField("fm_preventive_title", e.target.value)}
              placeholder="Preventive Maintenance"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Reactive Services Title</label>
            <Input
              value={settings.fm_reactive_title}
              onChange={(e) => updateField("fm_reactive_title", e.target.value)}
              placeholder="Reactive Maintenance Services"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Reactive Services Description</label>
            <Textarea
              value={settings.fm_reactive_description}
              onChange={(e) => updateField("fm_reactive_description", e.target.value)}
              placeholder="Description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency CTA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={settings.emergency_cta_title}
              onChange={(e) => updateField("emergency_cta_title", e.target.value)}
              placeholder="24/7 Facility Emergency Services"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={settings.emergency_cta_description}
              onChange={(e) => updateField("emergency_cta_description", e.target.value)}
              placeholder="Description"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Button Text</label>
            <Input
              value={settings.emergency_cta_button_text}
              onChange={(e) => updateField("emergency_cta_button_text", e.target.value)}
              placeholder="Request 24/7 Service"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Final CTA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={settings.final_cta_title}
              onChange={(e) => updateField("final_cta_title", e.target.value)}
              placeholder="Ready to start your project?"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Button 1 Text</label>
            <Input
              value={settings.final_cta_button1_text}
              onChange={(e) => updateField("final_cta_button1_text", e.target.value)}
              placeholder="Contact Us"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Button 2 Text</label>
            <Input
              value={settings.final_cta_button2_text}
              onChange={(e) => updateField("final_cta_button2_text", e.target.value)}
              placeholder="See projects"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPageEditor;
