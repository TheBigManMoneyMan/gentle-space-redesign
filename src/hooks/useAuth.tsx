import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type RoleStatus = "idle" | "checking" | "admin" | "non_admin" | "error";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  roleStatus: RoleStatus;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [roleStatus, setRoleStatus] = useState<RoleStatus>("idle");

  // Synchronous-only auth listener — NO database queries here
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          setRoleStatus("idle");
        }
        setIsAuthInitialized(true);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        setRoleStatus("idle");
      }
      setIsAuthInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Separate effect for role checking — runs when user changes
  useEffect(() => {
    if (!user?.id) {
      setRoleStatus("idle");
      return;
    }

    let cancelled = false;
    setRoleStatus("checking");

    const checkRole = async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error("Role check failed:", error);
          setRoleStatus("error");
        } else {
          setRoleStatus(data ? "admin" : "non_admin");
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Role check exception:", e);
          setRoleStatus("error");
        }
      }
    };

    checkRole();
    return () => { cancelled = true; };
  }, [user?.id]);

  const isAdmin = roleStatus === "admin";
  const isLoading = !isAuthInitialized || (!!user && roleStatus === "checking");

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error as Error | null };
  }, []);

  const signOut = useCallback(async () => {
    setRoleStatus("idle");
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, roleStatus, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
