import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, PawPrint } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import fullWidthWhoWeAre from "@/assets/full-width-who-we-are.jpg";

interface WhoWeAreContent {
  hero_eyebrow?: string;
  hero_heading?: string;
  hero_description?: string;
  hero_image?: string;
  overview_paragraph_1?: string;
  overview_paragraph_2?: string;
  mission_heading?: string;
  value_1_title?: string;
  value_1_description?: string;
  value_2_title?: string;
  value_2_description?: string;
  value_3_title?: string;
  value_3_description?: string;
  value_4_title?: string;
  value_4_description?: string;
  leadership_heading?: string;
  leader_1_name?: string;
  leader_1_title?: string;
  leader_1_bio?: string;
  leader_1_image?: string;
  leader_2_name?: string;
  leader_2_title?: string;
  leader_2_bio?: string;
  leader_2_image?: string;
  office_assistance_heading?: string;
  office_assistance_description?: string;
  office_assistance_link?: string;
  consultants_heading?: string;
  consultants_description?: string;
  social_impact_heading?: string;
  social_impact_description?: string;
  certifications_heading?: string;
  certifications?: string[];
  cta_heading?: string;
  cta_button_text?: string;
}

const WhoWeAre = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<WhoWeAreContent>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_who_we_are")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(data as WhoWeAreContent);
      }
    } catch (error) {
      console.error("Error loading Who We Are content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="py-16 px-6 space-y-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = content.hero_image || fullWidthWhoWeAre;
  const certifications = content.certifications || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-0 relative">
          <div className="w-full relative">
            <img
              src={heroImage}
              alt="KNova team and leadership"
              className="w-full h-[420px] md:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-0">
              <div className="container-narrow w-full">
                <div className="w-full max-w-4xl p-8 md:p-12 lg:p-16" style={{ backgroundColor: 'rgba(250, 250, 250, 0.95)' }}>
                  <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">
                    {content.hero_eyebrow || "About us"}
                  </p>
                  <h1 className="text-[34px] leading-[38px] md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight mb-4 text-foreground">
                    {content.hero_heading || "Building Trust. Delivering Quality."}
                  </h1>
                  <p className="text-base text-muted-foreground max-w-2xl">
                    {content.hero_description || "MBE-certified general contractor with deep MEP expertise serving New York and New Jersey"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <p className="text-xl md:text-2xl font-semibold text-foreground" style={{ lineHeight: '1.7' }}>
                {content.overview_paragraph_1 || "KNova Contractors is a Certified Minority Business Enterprise (MBE), licensed and insured general contractor serving New York and New Jersey. We deliver code-compliant, high-value projects for nonprofits, government agencies, housing developers, and commercial, industrial, and private residential clients."}
              </p>
              <p className="text-xl md:text-2xl text-foreground" style={{ lineHeight: '1.7' }}>
                {content.overview_paragraph_2 || "We also partner with property management companies to provide facility management, preventive maintenance, and 24/7 reactive service. Our GC-led delivery is strengthened by advanced MEP capabilities and proven acumen in HVAC, electrical, and plumbing. We keep schedules tight and deliver quality results on budget and on schedule."}
              </p>
            </div>
          </div>
        </section>


        {/* Mission & Values */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-6xl mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">MISSION & VALUES</p>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary text-center mx-auto">
              {content.mission_heading || "Build trusted spaces that perform"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {content.value_1_title || "People"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.value_1_description || "We build environments where communities can thrive"}
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {content.value_2_title || "Quality"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.value_2_description || "We pursue excellence with continuous improvement"}
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {content.value_3_title || "Integrity"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.value_3_description || "We do the right thing and own the outcome"}
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {content.value_4_title || "Stewardship"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.value_4_description || "We exceed expectations to create long-term value"}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-6xl mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">LEADERSHIP TEAM</p>
            <h2 className="text-3xl md:text-4xl mb-12 text-primary text-center mx-auto">
              {content.leadership_heading || "Accountability at the top, reliability in the field"}
            </h2>

            <div className="flex justify-center">
              {/* Keily J. Nova */}
              <Card className="p-8 lg:p-10 border-border bg-background transition-shadow text-left max-w-2xl w-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-1">
                    {content.leader_1_name || "Keily J. Nova"}
                  </h3>
                  <p className="text-base text-accent font-medium">
                    {content.leader_1_title || "Owner & President"}
                  </p>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {content.leader_1_bio || "Keily brings 20+ years in construction with deep MEP expertise that anchors KNova's delivery. Licensed in New York and New Jersey, he leads field operations with a focus on safety, quality, and performance.\n\nHis background spans high-efficiency HVAC design and retrofits including heat pumps and ventilation, electrical power distribution and lighting controls, and plumbing and piping for domestic water, sanitary, and gas.\n\nTeams rely on his clear direction, precise coordination, and clean handoffs. He has managed ground-up builds and full gut renovations across residential, commercial, institutional, and medical facilities.\n\nKeily is known for disciplined scheduling, code-first execution, and tenant-safe phasing that reduces downtime. He sets standards on site, communicates issues early, and drives projects to close with minimal punch lists and predictable outcomes."}
                </div>
              </Card>
            </div>

            {/* Office & Field Assistance */}
            <Card className="mt-8 p-8 lg:p-10 border-border bg-gradient-to-br from-accent/5 to-accent/10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <PawPrint className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {content.office_assistance_heading || "Office & Field Assistance"}
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">
                    {content.office_assistance_description || "Luna and Lady — our on-site morale officers and the namesake of a side business we own, Luna and Lady Cleaning Services."}
                  </p>
                  {content.office_assistance_link && (
                    <a
                      href={content.office_assistance_link}
                      className="text-base text-accent hover:underline inline-flex items-center gap-2 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Luna and Lady Cleaning Services →
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Consultants & Social Impact */}
        <section className="py-12 md:py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Consultants */}
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">
                  {content.consultants_heading || "CONSULTANTS & SUBJECT EXPERTS"}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.consultants_description || "We collaborate with experienced consultants and subject-matter experts to accelerate approvals, resolve complex site conditions, and deliver compliant, predictable outcomes."}
                </p>
              </div>

              {/* Social Impact */}
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">
                  {content.social_impact_heading || "SOCIAL IMPACT"}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.social_impact_description || "As a family-owned company rooted in humble beginnings, our faith and values guide our work. In 2018, we donated land to a local church in the Dominican Republic to enable a new temple and community center. As we grow, we reinvest in the communities we serve—because building better places starts with investing in people."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">CERTIFICATIONS</p>
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">
              {content.certifications_heading || "Professional credentials"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-8 text-primary mx-auto">
              {content.cta_heading || "Ready to start your project?"}
            </h2>
            <Button size="lg" asChild>
              <Link to="/contact">
                {content.cta_button_text || "Contact Us Today"}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
