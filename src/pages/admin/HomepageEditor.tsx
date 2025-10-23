import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Upload, X } from "lucide-react";

interface HomepageSettings {
  id?: string;
  hero_heading: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_image: string;
  deliver_eyebrow: string;
  deliver_heading: string;
  deliver_description: string;
  deliver_background_image: string;
  deliver_value_1_icon: string;
  deliver_value_1_title: string;
  deliver_value_1_description: string;
  deliver_value_2_icon: string;
  deliver_value_2_title: string;
  deliver_value_2_description: string;
  deliver_value_3_icon: string;
  deliver_value_3_title: string;
  deliver_value_3_description: string;
  services_eyebrow: string;
  services_heading: string;
  services_description: string;
  services_cta_text: string;
  industries_eyebrow: string;
  industries_heading: string;
  industries_description: string;
  interstitial_1_image: string;
  interstitial_1_alt: string;
  interstitial_2_image: string;
  interstitial_2_alt: string;
  final_cta_heading: string;
  final_cta_button_text: string;
}

const HomepageEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState<HomepageSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_homepage_sections")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data as HomepageSettings);
      }
    } catch (error) {
      console.error("Error loading homepage settings:", error);
      toast.error("Failed to load homepage settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_homepage_sections")
        .upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Homepage settings saved successfully");
    } catch (error) {
      console.error("Error saving homepage settings:", error);
      toast.error("Failed to save homepage settings");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof HomepageSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleImageUpload = async (field: keyof HomepageSettings, file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `homepage/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('cms-media')
        .getPublicUrl(filePath);

      updateField(field, publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (field: keyof HomepageSettings) => {
    updateField(field, "");
  };

  if (loading) {
    return (
      <div className="container-narrow py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="container-narrow py-8">
        <p>No homepage settings found.</p>
      </div>
    );
  }

  return (
    <div className="container-narrow py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Homepage Editor</h1>
      </div>

      <div className="mb-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="how-we-deliver">How We Deliver</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="interstitials">Interstitials</TabsTrigger>
          <TabsTrigger value="cta">Final CTA</TabsTrigger>
        </TabsList>

        {/* Hero Tab */}
        <TabsContent value="hero">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Hero Heading</Label>
              <Input
                value={settings.hero_heading}
                onChange={(e) => updateField("hero_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Description</Label>
              <Textarea
                value={settings.hero_description || ""}
                onChange={(e) => updateField("hero_description", e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary CTA Text</Label>
                <Input
                  value={settings.hero_cta_primary}
                  onChange={(e) => updateField("hero_cta_primary", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary CTA Text</Label>
                <Input
                  value={settings.hero_cta_secondary}
                  onChange={(e) => updateField("hero_cta_secondary", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload("hero_image", e.target.files[0])}
                  disabled={uploading}
                  className="flex-1"
                />
                {settings.hero_image && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImage("hero_image")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {settings.hero_image && (
                <div className="mt-2">
                  <img src={settings.hero_image} alt="Hero" className="h-32 w-auto object-cover rounded" />
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* How We Deliver Tab */}
        <TabsContent value="how-we-deliver">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Background Image</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload("deliver_background_image", e.target.files[0])}
                  disabled={uploading}
                  className="flex-1"
                />
                {settings.deliver_background_image && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImage("deliver_background_image")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {settings.deliver_background_image && (
                <div className="mt-2">
                  <img src={settings.deliver_background_image} alt="How We Deliver Background" className="h-32 w-auto object-cover rounded" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={settings.deliver_eyebrow}
                onChange={(e) => updateField("deliver_eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.deliver_heading}
                onChange={(e) => updateField("deliver_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Description</Label>
              <Textarea
                value={settings.deliver_description || ""}
                onChange={(e) => updateField("deliver_description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 1</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.deliver_value_1_icon}
                  onChange={(e) => updateField("deliver_value_1_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.deliver_value_1_title || ""}
                  onChange={(e) => updateField("deliver_value_1_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.deliver_value_1_description || ""}
                  onChange={(e) => updateField("deliver_value_1_description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 2</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.deliver_value_2_icon}
                  onChange={(e) => updateField("deliver_value_2_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.deliver_value_2_title || ""}
                  onChange={(e) => updateField("deliver_value_2_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.deliver_value_2_description || ""}
                  onChange={(e) => updateField("deliver_value_2_description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 3</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.deliver_value_3_icon}
                  onChange={(e) => updateField("deliver_value_3_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.deliver_value_3_title || ""}
                  onChange={(e) => updateField("deliver_value_3_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.deliver_value_3_description || ""}
                  onChange={(e) => updateField("deliver_value_3_description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={settings.services_eyebrow}
                onChange={(e) => updateField("services_eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.services_heading || ""}
                onChange={(e) => updateField("services_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Description</Label>
              <Textarea
                value={settings.services_description || ""}
                onChange={(e) => updateField("services_description", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Button Text</Label>
              <Input
                value={settings.services_cta_text}
                onChange={(e) => updateField("services_cta_text", e.target.value)}
              />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Individual service cards are managed in the <strong>Service Items</strong> section.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Industries Tab */}
        <TabsContent value="industries">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={settings.industries_eyebrow}
                onChange={(e) => updateField("industries_eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.industries_heading || ""}
                onChange={(e) => updateField("industries_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Description</Label>
              <Textarea
                value={settings.industries_description || ""}
                onChange={(e) => updateField("industries_description", e.target.value)}
                rows={3}
              />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Individual industry cards are managed separately (coming soon).
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Interstitials Tab */}
        <TabsContent value="interstitials">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Interstitial Image 1</h3>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload("interstitial_1_image", e.target.files[0])}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {settings.interstitial_1_image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeImage("interstitial_1_image")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {settings.interstitial_1_image && (
                  <div className="mt-2">
                    <img src={settings.interstitial_1_image} alt="Interstitial 1" className="h-32 w-auto object-cover rounded" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input
                  value={settings.interstitial_1_alt}
                  onChange={(e) => updateField("interstitial_1_alt", e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Interstitial Image 2</h3>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload("interstitial_2_image", e.target.files[0])}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {settings.interstitial_2_image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeImage("interstitial_2_image")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {settings.interstitial_2_image && (
                  <div className="mt-2">
                    <img src={settings.interstitial_2_image} alt="Interstitial 2" className="h-32 w-auto object-cover rounded" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input
                  value={settings.interstitial_2_alt}
                  onChange={(e) => updateField("interstitial_2_alt", e.target.value)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Final CTA Tab */}
        <TabsContent value="cta">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input
                value={settings.final_cta_heading}
                onChange={(e) => updateField("final_cta_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={settings.final_cta_button_text}
                onChange={(e) => updateField("final_cta_button_text", e.target.value)}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default HomepageEditor;