import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If already logged in as admin, redirect
  if (user && isAdmin) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({ title: isSignUp ? "Sign Up Failed" : "Login Failed", description: error.message, variant: "destructive" });
      return;
    }

    if (isSignUp) {
      toast({ title: "Account Created!", description: "You can now sign in. Ask the site owner to grant you admin access." });
      setIsSignUp(false);
      return;
    }

    setTimeout(() => {
      navigate("/admin");
    }, 500);
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
