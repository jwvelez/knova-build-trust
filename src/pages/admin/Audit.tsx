import { Card, CardContent } from "@/components/ui/card";

const Audit = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Log</h1>
        <p className="text-muted-foreground mt-1">
          Track all changes made to your content
        </p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Audit log coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Audit;
