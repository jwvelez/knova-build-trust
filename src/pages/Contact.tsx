import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    timeline: "",
    budget: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      location: "",
      timeline: "",
      budget: "",
      message: ""
    });
  };
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-10 pb-10 md:pt-12 md:pb-12 bg-secondary/30">
          <div className="container-narrow text-left md:text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4 text-left">Contact</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 ml-0">
              Let's discuss your project
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
                          252 Hudson St<br />
                          Hackensack, NJ 07601
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a href="tel:2015255365" className="text-muted-foreground hover:text-accent transition-colors">
                          (201) 525-5365
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <a href="mailto:info@knovacontractors.com" className="text-muted-foreground hover:text-accent transition-colors">
                          info@knovacontractors.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 24/7 Service Card */}
                <Card className="p-6 bg-background border-2 border-primary">
                  <div className="flex items-start gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-primary mb-1">24/7 Service & Emergency Dispatch</h3>
                      <p className="text-sm text-primary/80">
                        Emergency repairs and troubleshooting available around the clock
                      </p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <a href="tel:1234567890" className="text-lg font-semibold text-primary hover:text-accent transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </Card>
              </div>

              {/* Request Form */}
              <Card className="p-8 border-border">
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Name *</Label>
                    <Input id="name" required value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Your name" className="h-12 text-base" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={e => handleChange("email", e.target.value)} placeholder="your@email.com" className="h-12 text-base" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">Phone</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="(555) 123-4567" className="h-12 text-base" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-base">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={value => handleChange("projectType", value)}>
                      <SelectTrigger id="projectType" className="h-12 text-base">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-base">Location</Label>
                      <Input id="location" value={formData.location} onChange={e => handleChange("location", e.target.value)} placeholder="City, State" className="h-12 text-base" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-base">Timeline</Label>
                      <Input id="timeline" value={formData.timeline} onChange={e => handleChange("timeline", e.target.value)} placeholder="e.g., Q2 2025" className="h-12 text-base" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-base">Budget Range</Label>
                    <Input id="budget" value={formData.budget} onChange={e => handleChange("budget", e.target.value)} placeholder="Optional" className="h-12 text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Project Details *</Label>
                    <Textarea id="message" required value={formData.message} onChange={e => handleChange("message", e.target.value)} placeholder="Tell us about your project scope and requirements..." className="min-h-36 text-base" />
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