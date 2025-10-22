import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["cms_services"]["Row"];

const categories = [
  { value: "service_anchor", label: "Service Anchors" },
  { value: "general_construction", label: "General Construction" },
  { value: "consulting", label: "Consulting" },
  { value: "fm_benefits", label: "FM Benefits" },
  { value: "fm_common_services", label: "FM Common Services" },
  { value: "fm_scenarios", label: "FM Scenarios" },
];

const ServiceItems = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_services")
        .select("*")
        .order("category", { ascending: true })
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error("Error loading services:", error);
      toast({
        title: "Error loading services",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from("cms_services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Item deleted",
        description: "The item has been successfully deleted.",
      });

      loadServices();
    } catch (error: any) {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderServiceCard = (service: Service) => (
    <Card key={service.id}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <Badge variant="outline">{service.icon}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">Order: {service.display_order}</Badge>
              <Badge variant={service.status === "published" ? "default" : "secondary"}>
                {service.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Link to={`/admin/service-items/${service.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(service.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Service Items</h1>
          <p className="text-muted-foreground mt-1">
            Manage individual service items, benefits, and scenarios
          </p>
        </div>
        <Link to="/admin/service-items/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="service_anchor" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="space-y-4">
            {services
              .filter((s) => s.category === cat.value)
              .map((service) => renderServiceCard(service))}

            {services.filter((s) => s.category === cat.value).length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No items in this category yet</p>
                  <Link to="/admin/service-items/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ServiceItems;
