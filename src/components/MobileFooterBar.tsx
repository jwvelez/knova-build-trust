import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MobileFooterBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg md:hidden">
      <div className="grid grid-cols-2 gap-2 p-3">
        <Button asChild variant="ghost" size="sm" className="h-12">
          <a href="tel:2015255365">
            <Phone className="h-4 w-4 mr-2" />
            Call (201) 525-5365
          </a>
        </Button>
        <Button asChild size="sm" className="h-12">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileFooterBar;
