import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, PawPrint } from "lucide-react";
import fullWidthWhoWeAre from "@/assets/full-width-who-we-are.jpg";

const WhoWeAre = () => {
  const certifications = [
    "MBE 66751",
    "EPA Certified Firm NAT-F220339-1",
    "NYC DCA HIC 1453885-DCA",
    "NYC DOB GC 605715",
    "Mechanical Refrigeration 1818006017",
    "NYC DOB Reg 002869",
  ];

  const values = [
    {
      title: "People",
      desc: "Build environments where communities thrive",
    },
    {
      title: "Quality",
      desc: "Pursue excellence with continuous improvement",
    },
    {
      title: "Integrity",
      desc: "Do the right thing and own the outcome",
    },
    {
      title: "Stewardship",
      desc: "Exceed expectations to create lasting value",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-0 relative">
          <div className="w-full relative">
            <img
              src={fullWidthWhoWeAre}
              alt="KNova team and leadership"
              className="w-full h-[420px] md:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 2, 14, 0.6)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl" style={{ backgroundColor: 'rgba(250, 250, 250, 0.95)' }}>
                <div className="p-8 md:p-12 lg:p-16">
                  <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">About us</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
                    Building Trust. Delivering Quality.
                  </h1>
                  <p className="text-base text-muted-foreground max-w-2xl">
                    MBE-certified general contractor with deep MEP expertise serving New York and New Jersey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-6" style={{ lineHeight: '1.7' }}>
              KNova Contractors is a Certified Minority Business Enterprise (MBE), licensed and insured general contractor serving New York and New Jersey. We deliver code-compliant, high-value projects for nonprofits, government agencies, housing developers, and commercial, industrial, and private residential clients.
            </p>
            <p className="text-xl md:text-2xl text-foreground" style={{ lineHeight: '1.7' }}>
              We also partner with property management companies to provide facility management, preventive maintenance, and 24/7 reactive service. Our GC-led delivery is strengthened by advanced MEP capabilities and proven acumen in HVAC, electrical, and plumbing. We keep schedules tight and deliver quality results on budget and on schedule.
            </p>
          </div>
        </section>


        {/* Mission & Values */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-6xl mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">MISSION & VALUES</p>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary text-center mx-auto">Build trusted spaces that perform</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">People</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We build environments where communities can thrive
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">Quality</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We pursue excellence with continuous improvement
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">Integrity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We do the right thing and own the outcome
                </p>
              </Card>
              <Card className="p-6 bg-background border-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">Stewardship</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We exceed expectations to create long-term value
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-6xl mx-auto text-center">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">LEADERSHIP TEAM</p>
            <h2 className="text-3xl md:text-4xl mb-12 text-primary text-center mx-auto">Accountability at the top,<br />reliability in the field</h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Keily J. Nova */}
              <Card className="p-8 lg:p-10 border-border bg-background transition-shadow text-left">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-1">Keily J. Nova</h3>
                  <p className="text-base text-accent font-medium">Founder and President</p>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Keily brings 20+ years in construction with deep MEP expertise that anchors KNova's delivery. Licensed in New York and New Jersey, he leads field operations with a focus on safety, quality, and performance.
                  </p>
                  <p>
                    His background spans high-efficiency HVAC design and retrofits including heat pumps and ventilation, electrical power distribution and lighting controls, and plumbing and piping for domestic water, sanitary, and gas.
                  </p>
                  <p>
                    Teams rely on his clear direction, precise coordination, and clean handoffs. He has managed ground-up builds and full gut renovations across residential, commercial, institutional, and medical facilities.
                  </p>
                  <p>
                    Keily is known for disciplined scheduling, code-first execution, and tenant-safe phasing that reduces downtime. He sets standards on site, communicates issues early, and drives projects to close with minimal punch lists and predictable outcomes.
                  </p>
                </div>
              </Card>

              {/* Lymaris Albors */}
              <Card className="p-8 lg:p-10 border-border bg-background transition-shadow text-left">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-1">Lymaris Albors</h3>
                  <p className="text-base text-accent font-medium">Co-Founder</p>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Lymaris brings 20+ years of nonprofit executive leadership to KNova, guiding growth with a focus on quality, compliance, and sustainability. Her expertise in operations and strategic partnerships helps deliver projects with integrity and accountability.
                  </p>
                  <p>
                    Formerly CEO of one of the nation's largest Hispanic-led nonprofits, she oversaw a multi-state network with $650M in revenue and $1.3B in assets.
                  </p>
                  <p>
                    She also brings a strong foundation in construction, affordable, supportive, and transitional housing development, property and asset management, and capital expansions for primary and behavioral health care and community facilities, including nursing homes, senior centers, and multi-purpose art spaces.
                  </p>
                </div>
              </Card>
            </div>

            {/* Office & Field Assistance */}
            <Card className="mt-8 p-8 lg:p-10 border-border bg-gradient-to-br from-accent/5 to-accent/10 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <PawPrint className="h-6 w-6 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Office & Field Assistance</h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Luna and Lady — our on-site morale officers and the namesake of a side business we own, Luna and Lady Cleaning Services.
                  </p>
                  <a
                    href="https://lunaladycleaning.com"
                    className="text-base text-accent hover:underline inline-flex items-center gap-2 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Luna and Lady Cleaning Services →
                  </a>
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
                <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">CONSULTANTS & SUBJECT EXPERTS</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We collaborate with experienced consultants and subject-matter experts to accelerate approvals, resolve complex site conditions, and deliver compliant, predictable outcomes.
                </p>
              </div>

              {/* Social Impact */}
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">SOCIAL IMPACT</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a family-owned company rooted in humble beginnings, our faith and values guide our work. In 2018, we donated land to a local church in the Dominican Republic to enable a new temple and community center. As we grow, we reinvest in the communities we serve—because building better places starts with investing in people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-20 px-6 md:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <p className="uppercase text-sm tracking-wider text-accent font-medium mb-4">CERTIFICATIONS</p>
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">Professional credentials</h2>
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
            <h2 className="text-3xl md:text-4xl mb-8 text-primary">Ready to start your project?</h2>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
