import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooterCTA from "@/components/MobileFooterCTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  projectType: z.string().min(1, "Project type is required"),
  location: z.string().trim().max(100, "Location must be less than 100 characters").optional(),
  timeline: z.string().trim().max(50, "Timeline must be less than 50 characters").optional(),
  budget: z.string().trim().max(50, "Budget must be less than 50 characters").optional(),
  message: z.string().trim().min(1, "Project details are required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      setErrors({});
      toast.success("Thanks — our team will reach out within one business day.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        timeline: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <MobileFooterCTA />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline">CONTACT</p>
            <h1 className="mb-4">Let's discuss your project</h1>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Contact Information */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <p className="text-muted-foreground">
                        252 Hudson St<br />
                        Hackensack, NJ 07601
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href="tel:2015255365" className="text-muted-foreground hover:text-accent transition-colors">
                        (201) 525-5365
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href="mailto:info@knovacontractors.com" className="text-muted-foreground hover:text-accent transition-colors">
                        info@knovacontractors.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* 24/7 Service Card */}
                <Card className="p-8 bg-primary text-white border-0 rounded-2xl">
                  <div className="flex items-start gap-4 mb-4">
                    <Clock className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white mb-2">24/7 Service & Emergency Dispatch</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Emergency repairs and troubleshooting available around the clock
                      </p>
                    </div>
                  </div>
                  <div className="pl-10">
                    <a href="tel:1234567890" className="text-xl font-semibold text-white hover:text-white/80 transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </Card>
              </div>

              {/* Right: Request Form */}
              <Card className="p-8 lg:p-10 border-2 rounded-2xl">
                <h2 className="text-[28px] leading-[36px] mb-8">Request a Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your name"
                      className="h-12 text-base rounded-xl"
                      aria-label="Name"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="h-12 text-base rounded-xl"
                        aria-label="Email"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                        className="h-12 text-base rounded-xl"
                        aria-label="Phone"
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-base font-medium">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                      <SelectTrigger id="projectType" className="h-12 text-base rounded-xl" aria-label="Project type">
                        <SelectValue placeholder="Select project type" />
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
                    {errors.projectType && <p className="text-sm text-destructive">{errors.projectType}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-base font-medium">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="City, State"
                        className="h-12 text-base rounded-xl"
                        aria-label="Location"
                      />
                      {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-base font-medium">Timeline</Label>
                      <Input
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleChange("timeline", e.target.value)}
                        placeholder="e.g., Q2 2025"
                        className="h-12 text-base rounded-xl"
                        aria-label="Timeline"
                      />
                      {errors.timeline && <p className="text-sm text-destructive">{errors.timeline}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-base font-medium">Budget Range</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      placeholder="Optional"
                      className="h-12 text-base rounded-xl"
                      aria-label="Budget range"
                    />
                    {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">Project Details *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your project scope and requirements..."
                      className="min-h-36 text-base rounded-xl"
                      aria-label="Project details"
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
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
    </div>
  );
};

export default Contact;
