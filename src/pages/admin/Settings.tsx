import { Card, CardContent } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure global site settings
        </p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Site settings coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
