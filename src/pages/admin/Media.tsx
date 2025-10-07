import { Card, CardContent } from "@/components/ui/card";

const Media = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-muted-foreground mt-1">
          Manage your media files
        </p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Media library coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Media;
