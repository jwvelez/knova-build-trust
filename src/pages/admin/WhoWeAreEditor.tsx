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

interface WhoWeAreSettings {
  id?: string;
  hero_eyebrow: string;
  hero_heading: string;
  hero_description: string;
  hero_image: string;
  overview_paragraph_1: string;
  overview_paragraph_2: string;
  mission_heading: string;
  value_1_title: string;
  value_1_description: string;
  value_2_title: string;
  value_2_description: string;
  value_3_title: string;
  value_3_description: string;
  value_4_title: string;
  value_4_description: string;
  leadership_heading: string;
  leader_1_name: string;
  leader_1_title: string;
  leader_1_bio: string;
  leader_1_image: string;
  leader_2_name: string;
  leader_2_title: string;
  leader_2_bio: string;
  leader_2_image: string;
  office_assistance_heading: string;
  office_assistance_description: string;
  office_assistance_link: string;
  consultants_heading: string;
  consultants_description: string;
  social_impact_heading: string;
  social_impact_description: string;
  certifications_heading: string;
  certifications: string[];
  cta_heading: string;
  cta_button_text: string;
}

const WhoWeAreEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<WhoWeAreSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_who_we_are")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data as WhoWeAreSettings);
      }
    } catch (error) {
      console.error("Error loading who we are settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_who_we_are")
        .upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Who We Are settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof WhoWeAreSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const updateCertification = (index: number, value: string) => {
    if (!settings) return;
    const newCerts = [...settings.certifications];
    newCerts[index] = value;
    updateField("certifications", newCerts);
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
        <p>No settings found.</p>
      </div>
    );
  }

  return (
    <div className="container-narrow py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Who We Are Editor</h1>
      </div>

      <div className="mb-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="values">Mission & Values</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="other">Other Sections</TabsTrigger>
          <TabsTrigger value="certs">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={settings.hero_eyebrow}
                onChange={(e) => updateField("hero_eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input
                value={settings.hero_heading}
                onChange={(e) => updateField("hero_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={settings.hero_description || ""}
                onChange={(e) => updateField("hero_description", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Image URL</Label>
              <Input
                value={settings.hero_image || ""}
                onChange={(e) => updateField("hero_image", e.target.value)}
                placeholder="Leave empty to use default"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="overview">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Paragraph 1</Label>
              <Textarea
                value={settings.overview_paragraph_1 || ""}
                onChange={(e) => updateField("overview_paragraph_1", e.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Paragraph 2</Label>
              <Textarea
                value={settings.overview_paragraph_2 || ""}
                onChange={(e) => updateField("overview_paragraph_2", e.target.value)}
                rows={6}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="values">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.mission_heading || ""}
                onChange={(e) => updateField("mission_heading", e.target.value)}
              />
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Value 1: {settings.value_1_title}</h3>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_1_description || ""}
                  onChange={(e) => updateField("value_1_description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Value 2: {settings.value_2_title}</h3>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_2_description || ""}
                  onChange={(e) => updateField("value_2_description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Value 3: {settings.value_3_title}</h3>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_3_description || ""}
                  onChange={(e) => updateField("value_3_description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Value 4: {settings.value_4_title}</h3>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.value_4_description || ""}
                  onChange={(e) => updateField("value_4_description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leadership">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.leadership_heading || ""}
                onChange={(e) => updateField("leadership_heading", e.target.value)}
              />
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Leader 1</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={settings.leader_1_name}
                  onChange={(e) => updateField("leader_1_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={settings.leader_1_title}
                  onChange={(e) => updateField("leader_1_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={settings.leader_1_bio || ""}
                  onChange={(e) => updateField("leader_1_bio", e.target.value)}
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL (optional)</Label>
                <Input
                  value={settings.leader_1_image || ""}
                  onChange={(e) => updateField("leader_1_image", e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Leader 2</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={settings.leader_2_name}
                  onChange={(e) => updateField("leader_2_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Title (optional)</Label>
                <Input
                  value={settings.leader_2_title || ""}
                  onChange={(e) => updateField("leader_2_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={settings.leader_2_bio || ""}
                  onChange={(e) => updateField("leader_2_bio", e.target.value)}
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL (optional)</Label>
                <Input
                  value={settings.leader_2_image || ""}
                  onChange={(e) => updateField("leader_2_image", e.target.value)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Office Assistance</h3>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  value={settings.office_assistance_heading}
                  onChange={(e) => updateField("office_assistance_heading", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.office_assistance_description || ""}
                  onChange={(e) => updateField("office_assistance_description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Link URL</Label>
                <Input
                  value={settings.office_assistance_link}
                  onChange={(e) => updateField("office_assistance_link", e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Consultants</h3>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  value={settings.consultants_heading}
                  onChange={(e) => updateField("consultants_heading", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.consultants_description || ""}
                  onChange={(e) => updateField("consultants_description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Social Impact</h3>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  value={settings.social_impact_heading}
                  onChange={(e) => updateField("social_impact_heading", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.social_impact_description || ""}
                  onChange={(e) => updateField("social_impact_description", e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="certs">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.certifications_heading || ""}
                onChange={(e) => updateField("certifications_heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={settings.certifications_heading}
                onChange={(e) => updateField("certifications_heading", e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label>Certifications</Label>
              {settings.certifications.map((cert, index) => (
                <Input
                  key={index}
                  value={cert}
                  onChange={(e) => updateCertification(index, e.target.value)}
                />
              ))}
            </div>
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Call to Action</h3>
              <div className="space-y-2">
                <Label>CTA Heading</Label>
                <Input
                  value={settings.cta_heading}
                  onChange={(e) => updateField("cta_heading", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA Button Text</Label>
                <Input
                  value={settings.cta_button_text}
                  onChange={(e) => updateField("cta_button_text", e.target.value)}
                />
              </div>
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

export default WhoWeAreEditor;