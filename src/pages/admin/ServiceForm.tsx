import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react";

const contentSectionSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  service_type: z.enum(['general', 'facility_management']).default('general'),
  hero_title: z.string().optional(),
  hero_subtitle: z.string().optional(),
  details: z.string().optional(),
  featured: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
  content: z.object({
    benefits: z.array(contentSectionSchema).default([]),
    common_services: z.array(contentSectionSchema).default([]),
    scenarios: z.array(contentSectionSchema).default([]),
  }).default({ benefits: [], common_services: [], scenarios: [] }),
});

type FormValues = z.infer<typeof formSchema>;

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      icon: "",
      service_type: "general",
      hero_title: "",
      hero_subtitle: "",
      details: "",
      featured: false,
      display_order: 0,
      content: {
        benefits: [],
        common_services: [],
        scenarios: [],
      },
    },
  });

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_services")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        const content = (data.content as any) || { benefits: [], common_services: [], scenarios: [] };
        
        form.reset({
          title: data.title,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          service_type: (data.service_type as any) || "general",
          hero_title: data.hero_title || "",
          hero_subtitle: data.hero_subtitle || "",
          details: data.details || "",
          featured: data.featured || false,
          display_order: data.display_order || 0,
          content: {
            benefits: content.benefits || [],
            common_services: content.common_services || [],
            scenarios: content.scenarios || [],
          },
        });
        
        if (data.icon_url) {
          setIconPreview(data.icon_url);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error loading service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleIconUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `service-icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('cms-media')
        .getPublicUrl(filePath);

      setIconPreview(publicUrl);
      
      // If editing, update the service with the new icon
      if (id) {
        const { error: updateError } = await supabase
          .from("cms_services")
          .update({ icon_url: publicUrl })
          .eq("id", id);

        if (updateError) throw updateError;

        toast({
          title: "Icon uploaded",
          description: "The service icon has been updated.",
        });
      }

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Error uploading icon",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleIconFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('svg')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an SVG file.",
        variant: "destructive",
      });
      return;
    }

    setIconFile(file);
    await handleIconUpload(file);
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      let icon_url = iconPreview;
      
      // Upload icon if there's a new file and we're creating a new service
      if (iconFile && !id) {
        icon_url = await handleIconUpload(iconFile);
      }

      if (id) {
        const { error } = await supabase
          .from("cms_services")
          .update({
            title: values.title,
            slug: values.slug,
            description: values.description,
            icon: values.icon,
            service_type: values.service_type,
            hero_title: values.hero_title,
            hero_subtitle: values.hero_subtitle,
            details: values.details,
            featured: values.featured,
            display_order: values.display_order,
            content: values.content,
            icon_url: icon_url || undefined
          })
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Service updated",
          description: "The service has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from("cms_services")
          .insert([{ 
            title: values.title,
            slug: values.slug,
            description: values.description,
            icon: values.icon,
            service_type: values.service_type,
            hero_title: values.hero_title,
            hero_subtitle: values.hero_subtitle,
            details: values.details,
            featured: values.featured,
            display_order: values.display_order,
            status: "draft" as const,
            content: values.content,
            icon_url: icon_url || undefined
          }]);

        if (error) throw error;

        toast({
          title: "Service created",
          description: "The service has been successfully created.",
        });
      }

      navigate("/admin/services");
    } catch (error: any) {
      toast({
        title: id ? "Error updating service" : "Error creating service",
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
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/services")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {id ? "Edit Service" : "New Service"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          if (!form.getValues("slug")) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (Lucide icon name)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Hammer, Wrench, Building" />
                    </FormControl>
                    <FormDescription>
                      Fallback icon name if no SVG is uploaded
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Custom SVG Icon (Optional)</FormLabel>
                <div className="flex items-center gap-4">
                  {iconPreview && (
                    <div className="relative">
                      <img 
                        src={iconPreview} 
                        alt="Icon preview" 
                        className="h-12 w-12 object-contain border rounded p-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                        onClick={() => {
                          setIconPreview(null);
                          setIconFile(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div>
                    <Input
                      type="file"
                      accept=".svg"
                      onChange={handleIconFileChange}
                      disabled={uploading}
                      className="max-w-xs"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload an SVG icon (will be displayed at 28x28px)
                    </p>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
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

              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Construction</SelectItem>
                        <SelectItem value="facility_management">Facility Management</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hero_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Title (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Leave empty to use main title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hero_subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Subtitle (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Sections */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold">Content Sections</h3>

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Benefits</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = form.getValues("content.benefits");
                        form.setValue("content.benefits", [
                          ...current,
                          { icon: "", title: "", description: "" },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                  {form.watch("content.benefits").map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Benefit {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const current = form.getValues("content.benefits");
                              form.setValue(
                                "content.benefits",
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormField
                          control={form.control}
                          name={`content.benefits.${index}.icon`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., Shield" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`content.benefits.${index}.title`}
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
                          name={`content.benefits.${index}.description`}
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
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Common Services */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Common Services</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = form.getValues("content.common_services");
                        form.setValue("content.common_services", [
                          ...current,
                          { icon: "", title: "", description: "" },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                  {form.watch("content.common_services").map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Service {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const current = form.getValues("content.common_services");
                              form.setValue(
                                "content.common_services",
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormField
                          control={form.control}
                          name={`content.common_services.${index}.icon`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., Wrench" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`content.common_services.${index}.title`}
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
                          name={`content.common_services.${index}.description`}
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
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Scenarios */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Scenarios</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = form.getValues("content.scenarios");
                        form.setValue("content.scenarios", [
                          ...current,
                          { icon: "", title: "", description: "" },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Scenario
                    </Button>
                  </div>
                  {form.watch("content.scenarios").map((_, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Scenario {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const current = form.getValues("content.scenarios");
                              form.setValue(
                                "content.scenarios",
                                current.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormField
                          control={form.control}
                          name={`content.scenarios.${index}.icon`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., Building" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`content.scenarios.${index}.title`}
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
                          name={`content.scenarios.${index}.description`}
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 cursor-pointer">Featured</FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : id ? "Update Service" : "Create Service"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/services")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;
