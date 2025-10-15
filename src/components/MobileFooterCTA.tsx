import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MobileFooterCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
      <div className="grid grid-cols-2 gap-3 p-4">
        <Button asChild variant="ghost" size="lg" className="h-14 text-base">
          <a href="tel:2015255365">
            <Phone className="h-5 w-5 mr-2" />
            Call (201) 525-5365
          </a>
        </Button>
        <Button asChild size="lg" className="h-14 text-base">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileFooterCTA;
