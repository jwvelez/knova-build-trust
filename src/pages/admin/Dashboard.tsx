import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Wrench, Image, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    pages: 0,
    projects: 0,
    services: 0,
    media: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [pagesResult, projectsResult, servicesResult, mediaResult] = await Promise.all([
      supabase.from("cms_pages").select("id", { count: "exact", head: true }),
      supabase.from("cms_projects").select("id", { count: "exact", head: true }),
      supabase.from("cms_services").select("id", { count: "exact", head: true }),
      supabase.from("cms_media").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      pages: pagesResult.count || 0,
      projects: projectsResult.count || 0,
      services: servicesResult.count || 0,
      media: mediaResult.count || 0,
    });
  };

  const statCards = [
    { icon: FileText, label: "Pages", value: stats.pages, href: "/admin/pages", color: "text-blue-500" },
    { icon: Briefcase, label: "Projects", value: stats.projects, href: "/admin/projects", color: "text-green-500" },
    { icon: Wrench, label: "Services", value: stats.services, href: "/admin/services", color: "text-purple-500" },
    { icon: Image, label: "Media Files", value: stats.media, href: "/admin/media", color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your CMS. Manage all your website content from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} to={card.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/projects/new">
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Add New Project
              </Button>
            </Link>
            <Link to="/admin/services/new">
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </Link>
            <Link to="/admin/media">
              <Button variant="outline" className="w-full justify-start">
                <Image className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Preview</CardTitle>
            <CardDescription>View your live website</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Website
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;