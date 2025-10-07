import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["cms_services"]["Row"];

const Services = () => {
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
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
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
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase
        .from("cms_services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted.",
      });

      loadServices();
    } catch (error: any) {
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      const { error } = await supabase
        .from("cms_services")
        .update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: newStatus === "published" ? "Service published" : "Service unpublished",
        description: `The service is now ${newStatus}.`,
      });

      loadServices();
    } catch (error: any) {
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage your service offerings
          </p>
        </div>
        <Link to="/admin/services/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <Badge variant={service.status === "published" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                    {service.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Icon: {service.icon}
                  </p>
                  <p className="text-sm">{service.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(service.id, service.status)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {service.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Link to={`/admin/services/${service.id}`}>
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
        ))}

        {services.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No services yet</p>
              <Link to="/admin/services/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Services;