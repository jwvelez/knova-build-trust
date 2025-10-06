import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Building2, Users, Heart } from "lucide-react";
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
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline mb-4">About us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 max-w-4xl">
              Building Trust. Delivering Quality.
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              MBE-certified general contractor with deep MEP expertise serving New York and New Jersey
            </p>
          </div>
        </section>

        {/* Full-Width Image Band */}
        <section className="py-0 bg-secondary/30 relative">
          <div className="w-full relative">
            <img
              src={fullWidthWhoWeAre}
              alt="KNova team and leadership"
              className="w-full h-[420px] md:h-[600px] lg:h-[900px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/15"></div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-2xl md:text-3xl mb-2">Overview</h2>
            <p className="text-base text-muted-foreground mb-6">Licensed, insured, and ready to deliver</p>
            <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                KNova Contractors is a Certified Minority Business Enterprise and a licensed, insured general contractor serving New York and New Jersey. We deliver code-compliant, high-value projects for nonprofits, government agencies, housing developers, and commercial, industrial, and private residential clients.
              </p>
              <p className="text-lg">
                We partner with property management teams to provide facility management, preventive maintenance, and 24/7 reactive service. Our GC-led delivery is strengthened by advanced MEP capabilities and proven acumen in HVAC, electrical, and plumbing.
              </p>
              <p className="text-lg">
                We keep schedules tight and deliver quality results on budget and on schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-2xl md:text-3xl mb-2">Our Story</h2>
            <p className="text-base text-muted-foreground mb-6">Building since 2009 with the same values</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Founded in 2009 with a small crew of electricians, carpenters, and painters. Today we build, renovate, and manage properties across New York and New Jersey.
              </p>
              <p className="font-medium text-primary text-lg">
                The mindset from day one still applies: build well, operate better, and treat clients like long-term partners.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl mb-2">Mission & Values</h2>
              <p className="text-lg text-muted-foreground mb-6">What drives our work</p>
              <p className="text-xl md:text-2xl font-semibold text-primary mb-8">
                Mission: Build trusted spaces that perform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="p-6 border-border">
                  <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-base text-muted-foreground">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow max-w-6xl">
            <h2 className="text-2xl md:text-3xl mb-2">Leadership</h2>
            <p className="text-lg text-muted-foreground mb-12">Experience you can trust</p>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Keily J. Nova */}
              <Card className="p-8 lg:p-10 border-border bg-background hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">Keily J. Nova</h3>
                    <p className="text-base text-accent font-medium">Founder and President</p>
                  </div>
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
              <Card className="p-8 lg:p-10 border-border bg-background hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">Lymaris Albors</h3>
                    <p className="text-base text-accent font-medium">Co-Founder</p>
                  </div>
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
            <Card className="mt-8 p-8 lg:p-10 border-border bg-gradient-to-br from-accent/5 to-accent/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office & Field Assistance</h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Luna and Lady — our on-site morale officers and the namesake of a side business we own, Luna and Lady Cleaning Services.
                  </p>
                  <a
                    href="#"
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

        {/* Certifications */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-2xl md:text-3xl mb-2">Certifications</h2>
            <p className="text-base text-muted-foreground mb-8">Licensed and compliant across all work</p>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
