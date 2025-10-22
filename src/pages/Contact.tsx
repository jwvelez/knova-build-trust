import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("sections")
        .eq("slug", "contact")
        .maybeSingle();

      if (error) throw error;
      if (data?.sections) setContent(data.sections);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      location: "",
      message: ""
    });
  };
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="flex-1">
          <section className="pt-10 pb-10 md:pt-12 md:pb-12 bg-secondary/30">
            <div className="container-narrow">
              <Skeleton className="h-32 w-3/4" />
            </div>
          </section>
          <section className="pt-10 pb-20">
            <div className="container-narrow">
              <Skeleton className="h-96" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-10 pb-10 md:pt-12 md:pb-12 bg-secondary/30">
          <div className="container-narrow text-left md:text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4 text-left">{content.hero_eyebrow || 'Contact'}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 ml-0">
              {content.hero_heading || "Let's discuss your project"}
            </h1>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="pt-10 pb-20 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Address</p>
                        <p className="text-muted-foreground">
                          {content.address_line_1 || '252 Hudson St'}<br />
                          {content.address_line_2 || 'Hackensack, NJ 07601'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a href={`tel:${(content.phone || '(201) 525-5365').replace(/[^0-9]/g, '')}`} className="text-muted-foreground hover:text-accent transition-colors">
                          {content.phone || '(201) 525-5365'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <a href={`mailto:${content.email || 'info@knovacontractors.com'}`} className="text-muted-foreground hover:text-accent transition-colors">
                          {content.email || 'info@knovacontractors.com'}
                        </a>
                      </div>
                    </div>
                  </div>
              </div>

              {/* 24/7 Service Card */}
              <Card className="p-6 bg-background border-2 border-primary mt-5">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1 text-base">{content.emergency_service_title || '24/7 Service & Emergency Dispatch'}</h3>
                    <p className="text-sm text-primary/80">
                      {content.emergency_service_description || 'Emergency repairs and troubleshooting available around the clock'}
                    </p>
                  </div>
                </div>
                <a href={`tel:${(content.emergency_service_phone || '(201) 525-5365').replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="text-lg font-bold">{content.emergency_service_phone || '(201) 525-5365'}</span>
                </a>
              </Card>
            </div>

              {/* Request Form */}
              <Card className="p-8 border-border">
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="name" required value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Your name" className="h-12 text-base placeholder:text-muted-foreground" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input id="email" type="email" required value={formData.email} onChange={e => handleChange("email", e.target.value)} placeholder="your@email.com" className="h-12 text-base placeholder:text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">Phone</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="(555) 123-4567" className="h-12 text-base placeholder:text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-base">
                      Project Type <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.projectType} onValueChange={value => handleChange("projectType", value)} required>
                      <SelectTrigger id="projectType" className="h-12 text-base">
                        <SelectValue placeholder="Select project type" className="placeholder:text-muted-foreground" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general-construction">General Construction</SelectItem>
                        <SelectItem value="hvac">HVAC Systems</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="facility-management">Facility Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">Location</Label>
                    <Input id="location" value={formData.location} onChange={e => handleChange("location", e.target.value)} placeholder="City, State" className="h-12 text-base placeholder:text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">
                      Project Details <span className="text-destructive">*</span>
                    </Label>
                    <Textarea id="message" required value={formData.message} onChange={e => handleChange("message", e.target.value)} placeholder="Tell us about your project scope and requirements..." className="min-h-36 text-base placeholder:text-muted-foreground" />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Contact;