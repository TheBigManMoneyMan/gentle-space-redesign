import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, isAdmin, user, isLoading, roleStatus, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Already authenticated as admin — redirect
  if (!isLoading && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Auth still initializing
  if (isLoading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  // Authenticated but checking role
  if (user && roleStatus === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Checking permissions...</p>
      </div>
    );
  }

  // Authenticated but NOT admin
  if (user && (roleStatus === "non_admin" || roleStatus === "error")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Your account does not have admin privileges.</p>
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);

      if (error) {
        toast({ title: isSignUp ? "Sign Up Failed" : "Login Failed", description: error.message, variant: "destructive" });
        setIsSubmitting(false);
        return;
      }

      if (isSignUp) {
        toast({ title: "Account Created!", description: "You can now sign in. Ask the site owner to grant you admin access." });
        setIsSignUp(false);
        setIsSubmitting(false);
        return;
      }

      // For sign-in: auth state change will trigger role check automatically.
      // isLoading will become true during role check, then resolve.
      // We keep isSubmitting true until the component re-renders with the new state.
      setIsSubmitting(false);
    } catch {
      toast({ title: "Login Failed", description: "An unexpected error occurred.", variant: "destructive" });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isSignUp ? "Create Account" : "Admin Login"}</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{isSignUp ? "Create an account to get started" : "Sign in to manage site content"}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-foreground mb-1">Email</label>
              <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-1">Password</label>
              <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-muted-foreground hover:text-accent transition-colors">
              {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
