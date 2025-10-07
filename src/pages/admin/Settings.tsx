import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  site_description: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal("")),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  brand_color: z.string().optional(),
  navigation: z.string().optional(),
  footer_content: z.string().optional(),
  social_links: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_title: "",
      site_description: "",
      contact_email: "",
      contact_phone: "",
      address: "",
      logo_url: "",
      favicon_url: "",
      brand_color: "#0F172A",
      navigation: "[]",
      footer_content: "{}",
      social_links: "{}",
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setSettingsId(data.id);
        form.reset({
          site_title: data.site_title,
          site_description: data.site_description || "",
          contact_email: data.contact_email || "",
          contact_phone: data.contact_phone || "",
          address: data.address || "",
          logo_url: data.logo_url || "",
          favicon_url: data.favicon_url || "",
          brand_color: data.brand_color || "#0F172A",
          navigation: JSON.stringify(data.navigation, null, 2),
          footer_content: JSON.stringify(data.footer_content, null, 2),
          social_links: JSON.stringify(data.social_links, null, 2),
        });
      }
    } catch (error: any) {
      toast({
        title: "Error loading settings",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      let navigation = [];
      let footer_content = {};
      let social_links = {};

      try {
        navigation = values.navigation ? JSON.parse(values.navigation) : [];
        footer_content = values.footer_content ? JSON.parse(values.footer_content) : {};
        social_links = values.social_links ? JSON.parse(values.social_links) : {};
      } catch (e) {
        throw new Error("Invalid JSON in one of the fields");
      }

      const settingsData = {
        site_title: values.site_title,
        site_description: values.site_description || null,
        contact_email: values.contact_email || null,
        contact_phone: values.contact_phone || null,
        address: values.address || null,
        logo_url: values.logo_url || null,
        favicon_url: values.favicon_url || null,
        brand_color: values.brand_color || "#0F172A",
        navigation,
        footer_content,
        social_links,
      };

      if (settingsId) {
        const { error } = await supabase
          .from("cms_site_settings")
          .update(settingsData)
          .eq("id", settingsId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("cms_site_settings")
          .insert([settingsData])
          .select()
          .single();

        if (error) throw error;
        if (data) setSettingsId(data.id);
      }

      toast({
        title: "Settings saved",
        description: "Site settings have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure global site settings
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="site_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="site_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Color</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="logo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="favicon_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favicon URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings (JSON)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="navigation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Navigation</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} className="font-mono text-sm" />
                    </FormControl>
                    <FormDescription>
                      JSON array of navigation items
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="footer_content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} className="font-mono text-sm" />
                    </FormControl>
                    <FormDescription>
                      JSON object for footer configuration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social_links"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Links</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} className="font-mono text-sm" />
                    </FormControl>
                    <FormDescription>
                      JSON object with social media links
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
