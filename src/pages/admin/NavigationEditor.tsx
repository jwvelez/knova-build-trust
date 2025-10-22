import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Trash2 } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  path: string;
  display_order: number;
  status: string;
}

const NavigationEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_navigation")
        .select("*")
        .order("display_order");

      if (error) throw error;

      setNavItems(data || []);
    } catch (error) {
      console.error("Error loading navigation:", error);
      toast.error("Failed to load navigation");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: NavItem) => {
    try {
      const { error } = await supabase
        .from("cms_navigation")
        .update({
          label: item.label,
          path: item.path,
          display_order: item.display_order,
        })
        .eq("id", item.id);

      if (error) throw error;

      toast.success("Navigation item updated");
    } catch (error) {
      console.error("Error updating navigation item:", error);
      toast.error("Failed to update navigation item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this navigation item?")) return;

    try {
      const { error } = await supabase
        .from("cms_navigation")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNavItems(navItems.filter((item) => item.id !== id));
      toast.success("Navigation item deleted");
    } catch (error) {
      console.error("Error deleting navigation item:", error);
      toast.error("Failed to delete navigation item");
    }
  };

  const updateItem = (id: string, field: keyof NavItem, value: any) => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (loading) {
    return (
      <div className="container-narrow py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container-narrow py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Navigation Editor</h1>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Path</TableHead>
              <TableHead className="w-24">Order</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {navItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.label}
                    onChange={(e) => updateItem(item.id, "label", e.target.value)}
                    onBlur={() => handleSave(item)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.path}
                    onChange={(e) => updateItem(item.id, "path", e.target.value)}
                    onBlur={() => handleSave(item)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.display_order}
                    onChange={(e) =>
                      updateItem(item.id, "display_order", parseInt(e.target.value))
                    }
                    onBlur={() => handleSave(item)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default NavigationEditor;