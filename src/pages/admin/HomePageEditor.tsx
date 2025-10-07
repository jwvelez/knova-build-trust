import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  // Hero Section
  hero_eyebrow: z.string().optional(),
  hero_heading: z.string().min(1, "Hero heading is required"),
  hero_description: z.string().min(1, "Hero description is required"),
  hero_cta_primary: z.string().optional(),
  hero_cta_secondary: z.string().optional(),
  hero_phone: z.string().optional(),
  
  // Trust Badges
  trust_badges: z.string().optional(),
  
  // How We Deliver
  how_we_deliver_eyebrow: z.string().optional(),
  how_we_deliver_heading: z.string().optional(),
  how_we_deliver_description: z.string().optional(),
  value_prop_1_title: z.string().optional(),
  value_prop_1_desc: z.string().optional(),
  value_prop_2_title: z.string().optional(),
  value_prop_2_desc: z.string().optional(),
  value_prop_3_title: z.string().optional(),
  value_prop_3_desc: z.string().optional(),
  
  // Services Teaser
  services_eyebrow: z.string().optional(),
  services_heading: z.string().optional(),
  services_description: z.string().optional(),
  
  // Industries
  industries_eyebrow: z.string().optional(),
  industries_heading: z.string().optional(),
  industries_description: z.string().optional(),
  
  // Projects
  projects_eyebrow: z.string().optional(),
  projects_heading: z.string().optional(),
  projects_description: z.string().optional(),
  
  // CTA
  cta_heading: z.string().optional(),
  cta_description: z.string().optional(),
  cta_button_text: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const HomePageEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hero_eyebrow: "General Contracting + Building Systems",
      hero_heading: "Construction you can trust, building systems that just work",
      hero_description: "MBE-certified, licensed, and insured general contractor for New York and New Jersey with deep HVAC, electrical, and plumbing expertise",
      hero_cta_primary: "Request a bid",
      hero_cta_secondary: "Explore services",
      hero_phone: "(201) 525-5365",
      trust_badges: "MBE certified, Fully licensed and insured, NYC DOB compliant, EPA Certified Firm",
      how_we_deliver_eyebrow: "Our Approach",
      how_we_deliver_heading: "How we deliver",
      how_we_deliver_description: "Proven process, predictable outcomes at every stage",
      value_prop_1_title: "GC leadership — from preconstruction to closeout",
      value_prop_1_desc: "Full lifecycle support: budgeting, scheduling, and on-site coordination",
      value_prop_2_title: "MEP depth — HVAC, electrical, plumbing delivered right",
      value_prop_2_desc: "In-house expertise for integrated mechanical and electrical systems",
      value_prop_3_title: "Compliance first — predictable schedules and inspections",
      value_prop_3_desc: "EPA, NYC DOB, MBE certified. Proactive permitting and inspections management",
      services_eyebrow: "What we do",
      services_heading: "From new builds to building systems, one team delivers",
      services_description: "Comprehensive construction and MEP services tailored to your project needs",
      industries_eyebrow: "Who we serve",
      industries_heading: "Built for the places people live, learn, heal, and work",
      industries_description: "Serving diverse sectors with specialized expertise",
      projects_eyebrow: "Results over rhetoric",
      projects_heading: "Featured Projects",
      projects_description: "Recent work showcasing our commitment to quality and performance",
      cta_heading: "Let's Build Something Great Together",
      cta_description: "Ready to start your project? Get in touch with our team today.",
      cta_button_text: "Request a Consultation",
    },
  });

  useEffect(() => {
    loadHomePage();
  }, []);

  const loadHomePage = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("slug", "home")
        .limit(1)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setPageId(data.id);
        console.log('Loaded page data:', data);
        console.log('Sections data:', data.sections);
        const sections = data.sections as any || {};
        console.log('Parsed sections:', sections);
        form.reset({
          hero_eyebrow: sections.hero_eyebrow || "",
          hero_heading: sections.hero_heading || "",
          hero_description: sections.hero_description || "",
          hero_cta_primary: sections.hero_cta_primary || "",
          hero_cta_secondary: sections.hero_cta_secondary || "",
          hero_phone: sections.hero_phone || "",
          trust_badges: sections.trust_badges || "",
          how_we_deliver_eyebrow: sections.how_we_deliver_eyebrow || "",
          how_we_deliver_heading: sections.how_we_deliver_heading || "",
          how_we_deliver_description: sections.how_we_deliver_description || "",
          value_prop_1_title: sections.value_prop_1_title || "",
          value_prop_1_desc: sections.value_prop_1_desc || "",
          value_prop_2_title: sections.value_prop_2_title || "",
          value_prop_2_desc: sections.value_prop_2_desc || "",
          value_prop_3_title: sections.value_prop_3_title || "",
          value_prop_3_desc: sections.value_prop_3_desc || "",
          services_eyebrow: sections.services_eyebrow || "",
          services_heading: sections.services_heading || "",
          services_description: sections.services_description || "",
          industries_eyebrow: sections.industries_eyebrow || "",
          industries_heading: sections.industries_heading || "",
          industries_description: sections.industries_description || "",
          projects_eyebrow: sections.projects_eyebrow || "",
          projects_heading: sections.projects_heading || "",
          projects_description: sections.projects_description || "",
          cta_heading: sections.cta_heading || "",
          cta_description: sections.cta_description || "",
          cta_button_text: sections.cta_button_text || "",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error loading homepage",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      console.log('Form values to save:', values);
      const pageData: any = {
        title: "Home",
        slug: "home",
        sections: values,
        status: "published",
      };

      // Only include version for updates, not inserts
      if (pageId) {
        console.log('Updating existing page:', pageId);
        const { error } = await supabase
          .from("cms_pages")
          .update({ sections: values })
          .eq("id", pageId);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
      } else {
        console.log('Creating new page');
        const { data, error } = await supabase
          .from("cms_pages")
          .insert([pageData])
          .select()
          .single();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        if (data) {
          console.log('Created page:', data);
          setPageId(data.id);
        }
      }

      toast({
        title: "Homepage saved",
        description: "Homepage content has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving homepage",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/pages")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Homepage</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="hero_eyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow Text</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="General Contracting + Building Systems" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hero_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Heading</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hero_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hero_cta_primary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary CTA Text</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hero_cta_secondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary CTA Text</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hero_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trust_badges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trust Badges</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* How We Deliver Section */}
          <Card>
            <CardHeader>
              <CardTitle>How We Deliver Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="how_we_deliver_eyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="how_we_deliver_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="how_we_deliver_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 mt-6">
                <h4 className="font-semibold">Value Proposition 1</h4>
                <FormField
                  control={form.control}
                  name="value_prop_1_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value_prop_1_desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="font-semibold">Value Proposition 2</h4>
                <FormField
                  control={form.control}
                  name="value_prop_2_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value_prop_2_desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="font-semibold">Value Proposition 3</h4>
                <FormField
                  control={form.control}
                  name="value_prop_3_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value_prop_3_desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card>
            <CardHeader>
              <CardTitle>Services Teaser Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="services_eyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Industries Section */}
          <Card>
            <CardHeader>
              <CardTitle>Industries Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="industries_eyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industries_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industries_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <CardTitle>Projects Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="projects_eyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projects_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projects_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card>
            <CardHeader>
              <CardTitle>Final CTA Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="cta_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cta_button_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Homepage"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/pages")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HomePageEditor;
