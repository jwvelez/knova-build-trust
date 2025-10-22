import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServicePageSettings {
  id?: string;
  hero_image?: string;
  hero_eyebrow?: string;
  hero_title?: string;
  hero_description?: string;
  services_section_title?: string;
  services_section_description?: string;
  gc_title?: string;
  gc_description?: string;
  consulting_title?: string;
  consulting_description?: string;
  consulting_image?: string;
  fm_title?: string;
  fm_description?: string;
  fm_preventive_title?: string;
  fm_reactive_title?: string;
  fm_reactive_description?: string;
  emergency_cta_title?: string;
  emergency_cta_description?: string;
  emergency_cta_button_text?: string;
  final_cta_title?: string;
  final_cta_button1_text?: string;
  final_cta_button2_text?: string;
}

const ServicePageEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<ServicePageSettings>({});
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_service_page")
        .select("*")
        .single();

      if (error) throw error;
      setSettings(data || {});
    } catch (error: any) {
      console.error("Error loading settings:", error);
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
    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_service_page")
        .upsert({
          ...settings,
          id: settings.id || undefined,
        });

      if (error) throw error;

      toast({
        title: "Changes saved",
        description: "Service page settings have been updated successfully.",
      });

      await loadSettings();
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving changes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ServicePageSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Page Editor</h1>
          <p className="text-muted-foreground mt-1">
            Edit the main content sections of the Services page
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="gc">General Construction</TabsTrigger>
          <TabsTrigger value="consulting">Consulting</TabsTrigger>
          <TabsTrigger value="fm">Facility Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner at the top of the page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero_image">Hero Image URL</Label>
                <Input
                  id="hero_image"
                  value={settings.hero_image || ""}
                  onChange={(e) => updateField("hero_image", e.target.value)}
                  placeholder="Leave empty to use default"
                />
              </div>
              <div>
                <Label htmlFor="hero_eyebrow">Eyebrow Text</Label>
                <Input
                  id="hero_eyebrow"
                  value={settings.hero_eyebrow || ""}
                  onChange={(e) => updateField("hero_eyebrow", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_title">Title</Label>
                <Input
                  id="hero_title"
                  value={settings.hero_title || ""}
                  onChange={(e) => updateField("hero_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_description">Description</Label>
                <Textarea
                  id="hero_description"
                  value={settings.hero_description || ""}
                  onChange={(e) => updateField("hero_description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final CTA Section</CardTitle>
              <CardDescription>Bottom call-to-action section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="final_cta_title">Title</Label>
                <Input
                  id="final_cta_title"
                  value={settings.final_cta_title || ""}
                  onChange={(e) => updateField("final_cta_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="final_cta_button1_text">Primary Button Text</Label>
                <Input
                  id="final_cta_button1_text"
                  value={settings.final_cta_button1_text || ""}
                  onChange={(e) => updateField("final_cta_button1_text", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="final_cta_button2_text">Secondary Button Text</Label>
                <Input
                  id="final_cta_button2_text"
                  value={settings.final_cta_button2_text || ""}
                  onChange={(e) => updateField("final_cta_button2_text", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Overview Section</CardTitle>
              <CardDescription>Blue section with three service categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="services_section_title">Section Title</Label>
                <Input
                  id="services_section_title"
                  value={settings.services_section_title || ""}
                  onChange={(e) => updateField("services_section_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="services_section_description">Section Description</Label>
                <Textarea
                  id="services_section_description"
                  value={settings.services_section_description || ""}
                  onChange={(e) => updateField("services_section_description", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gc" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Construction Section</CardTitle>
              <CardDescription>First main content section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gc_title">Section Title</Label>
                <Input
                  id="gc_title"
                  value={settings.gc_title || ""}
                  onChange={(e) => updateField("gc_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gc_description">Section Description</Label>
                <Textarea
                  id="gc_description"
                  value={settings.gc_description || ""}
                  onChange={(e) => updateField("gc_description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consulting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consulting Section</CardTitle>
              <CardDescription>Consulting and permitting section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="consulting_title">Section Title</Label>
                <Input
                  id="consulting_title"
                  value={settings.consulting_title || ""}
                  onChange={(e) => updateField("consulting_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="consulting_description">Section Description</Label>
                <Textarea
                  id="consulting_description"
                  value={settings.consulting_description || ""}
                  onChange={(e) => updateField("consulting_description", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="consulting_image">Section Image URL</Label>
                <Input
                  id="consulting_image"
                  value={settings.consulting_image || ""}
                  onChange={(e) => updateField("consulting_image", e.target.value)}
                  placeholder="Leave empty to use default"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facility Maintenance Section</CardTitle>
              <CardDescription>Facility maintenance and emergency response section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fm_title">Section Title</Label>
                <Input
                  id="fm_title"
                  value={settings.fm_title || ""}
                  onChange={(e) => updateField("fm_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fm_description">Section Description</Label>
                <Textarea
                  id="fm_description"
                  value={settings.fm_description || ""}
                  onChange={(e) => updateField("fm_description", e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="fm_preventive_title">Preventive Maintenance Tab Title</Label>
                <Input
                  id="fm_preventive_title"
                  value={settings.fm_preventive_title || ""}
                  onChange={(e) => updateField("fm_preventive_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fm_reactive_title">Reactive Maintenance Tab Title</Label>
                <Input
                  id="fm_reactive_title"
                  value={settings.fm_reactive_title || ""}
                  onChange={(e) => updateField("fm_reactive_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fm_reactive_description">Reactive Maintenance Description</Label>
                <Textarea
                  id="fm_reactive_description"
                  value={settings.fm_reactive_description || ""}
                  onChange={(e) => updateField("fm_reactive_description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>24/7 Emergency CTA</CardTitle>
              <CardDescription>Call-to-action box for emergency services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emergency_cta_title">CTA Title</Label>
                <Input
                  id="emergency_cta_title"
                  value={settings.emergency_cta_title || ""}
                  onChange={(e) => updateField("emergency_cta_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergency_cta_description">CTA Description</Label>
                <Textarea
                  id="emergency_cta_description"
                  value={settings.emergency_cta_description || ""}
                  onChange={(e) => updateField("emergency_cta_description", e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="emergency_cta_button_text">Button Text</Label>
                <Input
                  id="emergency_cta_button_text"
                  value={settings.emergency_cta_button_text || ""}
                  onChange={(e) => updateField("emergency_cta_button_text", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ServicePageEditor;
