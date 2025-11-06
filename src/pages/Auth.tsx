import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import knovaLogo from "@/assets/knova.svg";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [isUpdatePasswordMode, setIsUpdatePasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check for password recovery hash in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');

    if (type === 'recovery' && accessToken) {
      setIsUpdatePasswordMode(true);
      // Clear the hash from URL
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    // Check for error in hash (expired token, etc)
    const error = hashParams.get('error');
    if (error) {
      const errorDescription = hashParams.get('error_description');
      toast({
        title: "Reset Link Invalid",
        description: errorDescription?.replace(/\+/g, ' ') || "The password reset link has expired or is invalid. Please request a new one.",
        variant: "destructive",
      });
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleAuth = async () => {
    try {
      setLoading(true);
      
      // Validate input
      authSchema.parse({ email, password });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "An error occurred during authentication",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      
      // Validate email
      const emailSchema = z.string().email("Invalid email address");
      emailSchema.parse(email);

      const redirectUrl = `${window.location.origin}/auth`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      toast({
        title: "Reset email sent!",
        description: "Check your email for the password reset link.",
      });
      
      setIsResetMode(false);
      setEmail("");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to send reset email",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);

      // Validate passwords
      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been successfully updated.",
      });

      setIsUpdatePasswordMode(false);
      setNewPassword("");
      setConfirmPassword("");
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={knovaLogo} alt="Knova" className="h-12 mx-auto mb-6" />
          <CardTitle>CMS Admin</CardTitle>
          <CardDescription>
            {isUpdatePasswordMode 
              ? "Enter your new password" 
              : isResetMode 
                ? "Reset your password" 
                : "Sign in to manage your content"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isUpdatePasswordMode ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdatePassword()}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleUpdatePassword}
                  disabled={loading}
                >
                  {loading ? "Updating password..." : "Update Password"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                {!isResetMode && (
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                    />
                  </div>
                )}
                <Button
                  className="w-full"
                  onClick={isResetMode ? handleResetPassword : handleAuth}
                  disabled={loading}
                >
                  {loading 
                    ? (isResetMode ? "Sending reset link..." : "Signing in...") 
                    : (isResetMode ? "Send Reset Link" : "Sign In")
                  }
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(!isResetMode);
                    setPassword("");
                  }}
                  disabled={loading}
                  className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isResetMode ? "Back to sign in" : "Forgot password?"}
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;