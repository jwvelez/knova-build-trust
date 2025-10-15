import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooterCTA from "@/components/MobileFooterCTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users as UsersIcon, Shield, Award } from "lucide-react";
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
      icon: UsersIcon,
      title: "People",
      desc: "Build environments where communities thrive",
    },
    {
      icon: Target,
      title: "Quality",
      desc: "Pursue excellence with continuous improvement",
    },
    {
      icon: Shield,
      title: "Integrity",
      desc: "Do the right thing and own the outcome",
    },
    {
      icon: Award,
      title: "Stewardship",
      desc: "Exceed expectations to create lasting value",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <MobileFooterCTA />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="w-full relative">
            <img
              src={fullWidthWhoWeAre}
              alt="KNova team and leadership"
              className="w-full h-[420px] md:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-4xl bg-white/95 rounded-2xl">
                <div className="p-8 md:p-12 lg:p-16">
                  <p className="overline">ABOUT US</p>
                  <h1 className="mb-4">Building Trust. Delivering Quality.</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    MBE-certified general contractor with deep MEP expertise serving New York and New Jersey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                KNova Contractors is a Certified Minority Business Enterprise (MBE), licensed and insured general contractor serving New York and New Jersey. We deliver code-compliant, high-value projects for nonprofits, government agencies, housing developers, and commercial, industrial, and private residential clients. We partner with property management teams to provide facility management, preventive maintenance, and 24/7 reactive service. Our GC-led delivery is strengthened by advanced MEP capabilities and proven acumen in HVAC, electrical, and plumbing. We keep schedules tight and deliver quality results on budget and on schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow max-w-4xl">
            <p className="overline">OUR STORY</p>
            <h2 className="mb-6">Building since 2009 with the same values</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Founded in 2009 with a small crew of electricians, carpenters, and painters. Today we build, renovate, and manage properties across New York and New Jersey.
              </p>
              <p className="font-semibold">
                The mindset from day one still applies: build well, operate better, and treat clients like long-term partners.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="overline">MISSION & VALUES</p>
              <h2 className="mb-4">What drives our work</h2>
              <p className="text-xl font-semibold text-foreground mb-8">
                Mission: Build trusted spaces that perform
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="p-6 text-center border-2 hover:border-accent transition-all duration-200 rounded-2xl">
                  <value.icon className="h-10 w-10 text-accent mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="max-w-3xl mx-auto mb-16">
              <p className="overline">LEADERSHIP TEAM</p>
              <h2 className="mb-4">Accountability at the top, reliability in the field</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Keily J. Nova */}
              <Card className="p-8 rounded-2xl border-2">
                <h3 className="mb-2">Keily J. Nova</h3>
                <p className="text-accent font-semibold mb-4">Founder & President</p>
                <p className="text-muted-foreground leading-relaxed">
                  Keily brings 20+ years of construction and MEP leadership, guiding projects from RFP through closeout with hands-on oversight that ensures quality, compliance, and predictable outcomes.
                </p>
              </Card>

              {/* Lymaris Albors */}
              <Card className="p-8 rounded-2xl border-2">
                <h3 className="mb-2">Lymaris Albors</h3>
                <p className="text-accent font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  Lymaris brings 20+ years managing complex commercial and residential projects with expertise across housing, education, healthcare, and multi-purpose art spaces.
                </p>
              </Card>
            </div>

            {/* Office & Field Assistance */}
            <Card className="p-8 bg-accent/5 border-2 border-accent/20 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <Heart className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Office & Field Assistance</h4>
                  <p className="text-muted-foreground mb-3">
                    <strong>Luna and Lady</strong> — our on-site morale officers and the namesake of a side business we own, Luna and Lady Cleaning Services.
                  </p>
                  <a 
                    href="https://lunaandladycleaningservices.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-medium"
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
            <h3 className="text-center mb-8 font-semibold">Certifications</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20"
                >
                  {cert}
                </span>
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
