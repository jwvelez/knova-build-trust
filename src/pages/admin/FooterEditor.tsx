import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface FooterSettings {
  id?: string;
  logo_url: string;
  contact_heading: string;
  address_line_1: string;
  address_line_2: string;
  phone: string;
  email: string;
  company_description: string;
  links_heading: string;
  certifications: string[];
  copyright_text: string;
}

const FooterEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_footer_content")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data as FooterSettings);
      }
    } catch (error) {
      console.error("Error loading footer settings:", error);
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
        .from("cms_footer_content")
        .upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Footer settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof FooterSettings, value: any) => {
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
        <h1 className="text-3xl font-bold">Footer Editor</h1>
      </div>

      <div className="mb-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Contact Section */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Contact Section</h2>
          <div className="space-y-2">
            <Label>Contact Heading</Label>
            <Input
              value={settings.contact_heading}
              onChange={(e) => updateField("contact_heading", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 1</Label>
            <Input
              value={settings.address_line_1}
              onChange={(e) => updateField("address_line_1", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 2</Label>
            <Input
              value={settings.address_line_2}
              onChange={(e) => updateField("address_line_2", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={settings.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
        </Card>

        {/* Company Description */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Company Description</h2>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={settings.company_description || ""}
              onChange={(e) => updateField("company_description", e.target.value)}
              rows={3}
            />
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <div className="space-y-2">
            <Label>Quick Links Heading</Label>
            <Input
              value={settings.links_heading}
              onChange={(e) => updateField("links_heading", e.target.value)}
            />
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Quick links are managed in the <strong>Navigation Editor</strong>.
            </p>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <div className="space-y-4">
            <Label>Certifications List</Label>
            {settings.certifications.map((cert, index) => (
              <Input
                key={index}
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
              />
            ))}
          </div>
        </Card>

        {/* Copyright */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Copyright</h2>
          <div className="space-y-2">
            <Label>Copyright Text</Label>
            <Input
              value={settings.copyright_text || ""}
              onChange={(e) => updateField("copyright_text", e.target.value)}
              placeholder="Leave empty for auto-generated copyright"
            />
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default FooterEditor;