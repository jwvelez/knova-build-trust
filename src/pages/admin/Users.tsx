import { Card, CardContent } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users & Roles</h1>
        <p className="text-muted-foreground mt-1">
          Manage user access and permissions
        </p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">User management coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
