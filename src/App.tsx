import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import WhoWeAre from "./pages/WhoWeAre";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminServices from "./pages/admin/Services";
import ServiceForm from "./pages/admin/ServiceForm";
import ServiceItems from "./pages/admin/ServiceItems";
import ServiceItemForm from "./pages/admin/ServiceItemForm";
import HomepageEditor from "./pages/admin/HomepageEditor";
import WhoWeAreEditor from "./pages/admin/WhoWeAreEditor";
import ContactEditor from "./pages/admin/ContactEditor";
import ServicesPageEditor from "./pages/admin/ServicesPageEditor";
import NavigationEditor from "./pages/admin/NavigationEditor";
import FooterEditor from "./pages/admin/FooterEditor";
import Pages from "./pages/admin/Pages";
import PageForm from "./pages/admin/PageForm";
import HomePageEditor from "./pages/admin/HomePageEditor";
import Media from "./pages/admin/Media";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

// Component to handle password recovery redirects globally
const PasswordRecoveryHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Only run on initial mount and when hash changes
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');

    // If we have a recovery token, redirect to auth page
    if (type === 'recovery' && accessToken) {
      navigate('/auth' + window.location.hash);
      return;
    }

    // If we have an auth error (like expired token), show error and redirect to auth
    if (error && location.pathname !== '/auth') {
      toast({
        title: "Reset Link Invalid",
        description: errorDescription?.replace(/\+/g, ' ') || "The password reset link has expired or is invalid. Please request a new one.",
        variant: "destructive",
      });
      // Clear the hash and redirect to auth page
      window.history.replaceState(null, '', '/auth');
      navigate('/auth');
    }
  }, [navigate, location.pathname, toast]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PasswordRecoveryHandler />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<Pages />} />
            <Route path="pages/new" element={<PageForm />} />
            <Route path="pages/home/edit" element={<HomePageEditor />} />
            <Route path="pages/services/edit" element={<ServicesPageEditor />} />
            <Route path="pages/who-we-are/edit" element={<WhoWeAreEditor />} />
            <Route path="pages/contact/edit" element={<ContactEditor />} />
            <Route path="pages/:id" element={<PageForm />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id" element={<ProjectForm />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/:id" element={<ServiceForm />} />
            <Route path="service-items" element={<ServiceItems />} />
            <Route path="service-items/new" element={<ServiceItemForm />} />
            <Route path="service-items/:id" element={<ServiceItemForm />} />
            <Route path="media" element={<Media />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
