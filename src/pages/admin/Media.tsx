import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// Import all asset images
import heroConstruction from "@/assets/hero-construction.jpg";
import fullWidthServices from "@/assets/full-width-services.jpg";
import fullWidthWhoWeAre from "@/assets/full-width-who-we-are.jpg";
import howWeDeliver from "@/assets/how-we-deliver.jpg";
import interstitial1 from "@/assets/interstitial-1.jpg";
import interstitial2 from "@/assets/interstitial-2.jpg";
import projectDaycare from "@/assets/project-daycare.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectOffice from "@/assets/project-office.jpg";
import knovaLogo from "@/assets/knova.svg";
import knovaReverse from "@/assets/knova-reverse.svg";

type Media = Database["public"]["Tables"]["cms_media"]["Row"];

// Static asset images that are part of the project
const assetImages = [
  { name: "Hero Construction", url: heroConstruction },
  { name: "Full Width Services", url: fullWidthServices },
  { name: "Full Width Who We Are", url: fullWidthWhoWeAre },
  { name: "How We Deliver", url: howWeDeliver },
  { name: "Interstitial 1", url: interstitial1 },
  { name: "Interstitial 2", url: interstitial2 },
  { name: "Project Daycare", url: projectDaycare },
  { name: "Project Health", url: projectHealth },
  { name: "Project Office", url: projectOffice },
  { name: "Knova Logo", url: knovaLogo },
  { name: "Knova Logo Reverse", url: knovaReverse },
];

const Media = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading media",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("cms-media")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("cms_media")
        .insert([{
          filename: file.name,
          storage_path: filePath,
          url: publicUrl,
          mime_type: file.type,
          size_bytes: file.size,
          alt_text: file.name,
        }]);

      if (dbError) throw dbError;

      toast({
        title: "Upload successful",
        description: "File has been uploaded successfully.",
      });

      loadMedia();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (item: Media) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("cms-media")
        .remove([item.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("cms_media")
        .delete()
        .eq("id", item.id);

      if (dbError) throw dbError;

      toast({
        title: "File deleted",
        description: "The file has been successfully deleted.",
      });

      loadMedia();
    } catch (error: any) {
      toast({
        title: "Error deleting file",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "The file URL has been copied to clipboard.",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your media files
          </p>
        </div>
        <div>
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,video/*,.pdf"
          />
          <Button
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>

      {/* Project Assets Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Project Assets</h2>
          <p className="text-sm text-muted-foreground">
            Images included in your project's assets folder
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assetImages.map((asset, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">Project Asset</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyUrl(asset.url)}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Uploaded Media Section */}
      {media.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Uploaded Media</h2>
            <p className="text-sm text-muted-foreground">
              Files uploaded through the CMS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {item.mime_type.startsWith("image/") ? (
                      <img
                        src={item.url}
                        alt={item.alt_text || item.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium truncate">{item.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {(item.size_bytes / 1024).toFixed(1)} KB
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyUrl(item.url)}
                        className="flex-1"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
