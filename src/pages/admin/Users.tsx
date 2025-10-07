import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];
type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  role?: AppRole;
  role_id?: string;
}

const Users = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      const usersMap = new Map<string, UserWithRole>();

      userRoles?.forEach((ur) => {
        usersMap.set(ur.user_id, {
          id: ur.user_id,
          email: `User ${ur.user_id.slice(0, 8)}`,
          created_at: ur.created_at,
          role: ur.role,
          role_id: ur.id,
        });
      });

      setUsers(Array.from(usersMap.values()));
    } catch (error: any) {
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (
    userId: string,
    roleId: string | undefined,
    newRole: AppRole
  ) => {
    try {
      if (roleId) {
        const { error } = await supabase
          .from("user_roles")
          .update({ role: newRole })
          .eq("id", roleId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .insert([{ user_id: userId, role: newRole }]);

        if (error) throw error;
      }

      toast({
        title: "Role updated",
        description: "User role has been updated successfully.",
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm("Are you sure you want to remove this user's role?")) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", roleId);

      if (error) throw error;

      toast({
        title: "Role removed",
        description: "User role has been removed.",
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error removing role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role?: AppRole): "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin":
        return "default";
      case "editor":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage user roles and permissions
        </p>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No users with roles yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">User ID: {user.id.slice(0, 8)}...</p>
                      {user.role && (
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Select
                      value={user.role || "viewer"}
                      onValueChange={(value) =>
                        handleRoleChange(user.id, user.role_id, value as AppRole)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    {user.role_id && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRole(user.role_id!)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Role Descriptions</h3>
          <div className="space-y-2 text-sm">
            <div>
              <Badge variant="default" className="mr-2">
                Admin
              </Badge>
              <span className="text-muted-foreground">
                Full access to all features including user management
              </span>
            </div>
            <div>
              <Badge variant="secondary" className="mr-2">
                Editor
              </Badge>
              <span className="text-muted-foreground">
                Can manage content (pages, projects, services, media)
              </span>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">
                Viewer
              </Badge>
              <span className="text-muted-foreground">
                Read-only access to the admin panel
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
