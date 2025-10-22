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
import { ArrowLeft } from "lucide-react";

interface HomepageSettings {
  id?: string;
  hero_heading: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_image: string;
  trust_badges: string[];
  how_we_deliver_eyebrow: string;
  how_we_deliver_heading: string;
  how_we_deliver_description: string;
  how_we_deliver_image: string;
  logo_image: string;
  value_prop_1_icon: string;
  value_prop_1_title: string;
  value_prop_1_description: string;
  value_prop_2_icon: string;
  value_prop_2_title: string;
  value_prop_2_description: string;
  value_prop_3_icon: string;
  value_prop_3_title: string;
  value_prop_3_description: string;
  services_eyebrow: string;
  services_heading: string;
  services_description: string;
  services_cta_text: string;
  industries_eyebrow: string;
  industries_heading: string;
  industries_description: string;
  interstitial_1_url: string;
  interstitial_1_alt: string;
  interstitial_2_url: string;
  interstitial_2_alt: string;
  projects_eyebrow: string;
  projects_heading: string;
  projects_description: string;
  projects_cta_text: string;
  final_cta_heading: string;
  final_cta_button_text: string;
}

const HomepageEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const updateTrustBadge = (index: number, value: string) => {
    if (!settings) return;
    const newBadges = [...settings.trust_badges];
    newBadges[index] = value;
    updateField("trust_badges", newBadges);
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
              <Label>Hero Image URL</Label>
              <Input
                value={settings.hero_image || ""}
                onChange={(e) => updateField("hero_image", e.target.value)}
                placeholder="Leave empty to use default"
              />
            </div>
            <div className="space-y-4">
              <Label>Trust Badges</Label>
              {settings.trust_badges.map((badge, index) => (
                <Input
                  key={index}
                  value={badge}
                  onChange={(e) => updateTrustBadge(index, e.target.value)}
                />
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* How We Deliver Tab */}
        <TabsContent value="how-we-deliver">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={settings.how_we_deliver_eyebrow}
                onChange={(e) => updateField("how_we_deliver_eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.how_we_deliver_heading}
                onChange={(e) => updateField("how_we_deliver_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Description</Label>
              <Textarea
                value={settings.how_we_deliver_description || ""}
                onChange={(e) => updateField("how_we_deliver_description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 1</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.value_prop_1_icon}
                  onChange={(e) => updateField("value_prop_1_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.value_prop_1_title || ""}
                  onChange={(e) => updateField("value_prop_1_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_prop_1_description || ""}
                  onChange={(e) => updateField("value_prop_1_description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 2</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.value_prop_2_icon}
                  onChange={(e) => updateField("value_prop_2_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.value_prop_2_title || ""}
                  onChange={(e) => updateField("value_prop_2_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_prop_2_description || ""}
                  onChange={(e) => updateField("value_prop_2_description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-6">
              <h3 className="font-semibold text-lg">Value Proposition 3</h3>
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  value={settings.value_prop_3_icon}
                  onChange={(e) => updateField("value_prop_3_icon", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.value_prop_3_title || ""}
                  onChange={(e) => updateField("value_prop_3_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_prop_3_description || ""}
                  onChange={(e) => updateField("value_prop_3_description", e.target.value)}
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
                <Label>Image URL</Label>
                <Input
                  value={settings.interstitial_1_url || ""}
                  onChange={(e) => updateField("interstitial_1_url", e.target.value)}
                  placeholder="Leave empty to use default"
                />
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
                <Label>Image URL</Label>
                <Input
                  value={settings.interstitial_2_url || ""}
                  onChange={(e) => updateField("interstitial_2_url", e.target.value)}
                  placeholder="Leave empty to use default"
                />
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