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

interface ContactSettings {
  id?: string;
  hero_eyebrow: string;
  hero_heading: string;
  address_line_1: string;
  address_line_2: string;
  phone: string;
  email: string;
  service_247_heading: string;
  service_247_description: string;
  service_247_phone: string;
  form_heading: string;
  form_name_label: string;
  form_email_label: string;
  form_phone_label: string;
  form_project_type_label: string;
  form_location_label: string;
  form_timeline_label: string;
  form_budget_label: string;
  form_message_label: string;
  form_submit_button: string;
  form_success_message: string;
}

const ContactEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<ContactSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_contact_info")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data as ContactSettings);
      }
    } catch (error) {
      console.error("Error loading contact settings:", error);
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
        .from("cms_contact_info")
        .upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Contact settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ContactSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : null);
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
        <h1 className="text-3xl font-bold">Contact Page Editor</h1>
      </div>

      <div className="mb-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Hero Section</h2>
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
        </Card>

        {/* Contact Information */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Contact Information</h2>
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

        {/* 24/7 Service Card */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">24/7 Service Card</h2>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={settings.service_247_heading}
              onChange={(e) => updateField("service_247_heading", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={settings.service_247_description || ""}
              onChange={(e) => updateField("service_247_description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>24/7 Service Phone</Label>
            <Input
              value={settings.service_247_phone}
              onChange={(e) => updateField("service_247_phone", e.target.value)}
            />
          </div>
        </Card>

        {/* Form Labels */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Form Labels</h2>
          <div className="space-y-2">
            <Label>Form Heading</Label>
            <Input
              value={settings.form_heading}
              onChange={(e) => updateField("form_heading", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name Field Label</Label>
              <Input
                value={settings.form_name_label}
                onChange={(e) => updateField("form_name_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Field Label</Label>
              <Input
                value={settings.form_email_label}
                onChange={(e) => updateField("form_email_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Field Label</Label>
              <Input
                value={settings.form_phone_label}
                onChange={(e) => updateField("form_phone_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Project Type Label</Label>
              <Input
                value={settings.form_project_type_label}
                onChange={(e) => updateField("form_project_type_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Location Label</Label>
              <Input
                value={settings.form_location_label}
                onChange={(e) => updateField("form_location_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Timeline Label</Label>
              <Input
                value={settings.form_timeline_label}
                onChange={(e) => updateField("form_timeline_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Budget Label</Label>
              <Input
                value={settings.form_budget_label}
                onChange={(e) => updateField("form_budget_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Message Label</Label>
              <Input
                value={settings.form_message_label}
                onChange={(e) => updateField("form_message_label", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Submit Button Text</Label>
            <Input
              value={settings.form_submit_button}
              onChange={(e) => updateField("form_submit_button", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Success Message</Label>
            <Input
              value={settings.form_success_message}
              onChange={(e) => updateField("form_success_message", e.target.value)}
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

export default ContactEditor;