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
  emergency_service_title: string;
  emergency_service_description: string;
  emergency_service_phone: string;
  emergency_service_cta: string;
  form_name_label: string;
  form_email_label: string;
  form_phone_label: string;
  form_company_label: string;
  form_service_label: string;
  form_message_label: string;
  form_submit_text: string;
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
          <h2 className="text-xl font-semibold">24/7 Emergency Service Card</h2>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={settings.emergency_service_title}
              onChange={(e) => updateField("emergency_service_title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={settings.emergency_service_description || ""}
              onChange={(e) => updateField("emergency_service_description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Emergency Phone</Label>
            <Input
              value={settings.emergency_service_phone}
              onChange={(e) => updateField("emergency_service_phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Button Text</Label>
            <Input
              value={settings.emergency_service_cta}
              onChange={(e) => updateField("emergency_service_cta", e.target.value)}
            />
          </div>
        </Card>

        {/* Form Labels */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Form Field Labels</h2>
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
              <Label>Company Field Label</Label>
              <Input
                value={settings.form_company_label}
                onChange={(e) => updateField("form_company_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Service Type Label</Label>
              <Input
                value={settings.form_service_label}
                onChange={(e) => updateField("form_service_label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Message Field Label</Label>
              <Input
                value={settings.form_message_label}
                onChange={(e) => updateField("form_message_label", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Submit Button Text</Label>
            <Input
              value={settings.form_submit_text}
              onChange={(e) => updateField("form_submit_text", e.target.value)}
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