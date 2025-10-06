import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const WorkWithUs = () => {
  const vendorRequirements = [
    "Current general liability insurance",
    "Workers' compensation coverage",
    "Safety certifications and training records",
    "Previous project references",
    "Financial stability documentation",
  ];

  const careerBenefits = [
    "Growth-minded team culture",
    "Field and office opportunities",
    "Ongoing training and development",
    "Competitive compensation",
    "Family-owned business values",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <p className="overline mb-4">Work With Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8">
              Join our network of partners and talent
            </h1>
          </div>
        </section>

        {/* Vendors and Subcontractors */}
        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-3xl md:text-4xl mb-8">Vendors and Subcontractors</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Prequalification Requirements</h3>
                <div className="space-y-3">
                  {vendorRequirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-8 bg-secondary/30 border-border">
                <h3 className="text-xl font-semibold mb-4">How to Bid with KNova</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We maintain a network of qualified subcontractors and vendors who share our commitment to quality, safety, and timely delivery.
                  </p>
                  <p>
                    Our prequalification process ensures all partners meet our standards for insurance, bonding, and performance.
                  </p>
                  <p className="font-medium text-foreground">
                    Ready to join our network? Submit your prequalification package today.
                  </p>
                </div>
                <Button size="lg" className="mt-6" asChild>
                  <Link to="/contact">Start prequalification</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Careers */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow max-w-4xl">
            <h2 className="text-3xl md:text-4xl mb-8">Careers</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Why Join KNova?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {careerBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-8 border-border">
                <h3 className="text-xl font-semibold mb-4">Field and Office Roles</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We're always looking for skilled professionals to join our team. From field supervisors and HVAC technicians to project coordinators and estimators, we offer opportunities across construction and facilities management.
                  </p>
                  <p>
                    Our team members work on diverse projects spanning healthcare, housing, education, and commercial sectors throughout New York and New Jersey.
                  </p>
                  <p className="font-medium text-foreground">
                    Interested in building your career with us?
                  </p>
                </div>
                <Button size="lg" variant="outline" className="mt-6" asChild>
                  <Link to="/contact">See open roles</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-narrow">
            <Card className="p-12 text-center bg-primary text-primary-foreground">
              <h2 className="text-3xl md:text-4xl mb-4">Let's build something together</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you're a subcontractor, vendor, or looking to join our team, we'd love to hear from you.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get in touch</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WorkWithUs;
