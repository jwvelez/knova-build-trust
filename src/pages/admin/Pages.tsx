import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Eye } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Page = Database["public"]["Tables"]["cms_pages"]["Row"];

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading pages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      const { error } = await supabase
        .from("cms_pages")
        .update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: newStatus === "published" ? "Page published" : "Page unpublished",
        description: `The page is now ${newStatus}.`,
      });

      loadPages();
    } catch (error: any) {
      toast({
        title: "Error updating page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getEditLink = (page: Page) => {
    if (page.slug === "home") {
      return `/admin/pages/home/edit`;
    }
    return `/admin/pages/${page.id}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground mt-1">
            Manage your website pages
          </p>
        </div>
        <Link to="/admin/pages/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{page.title}</h3>
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Slug: /{page.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(page.id, page.status)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {page.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Link to={getEditLink(page)}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {pages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No pages yet</p>
              <Link to="/admin/pages/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pages;
