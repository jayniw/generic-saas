"use client";
import { createClient } from "@/lib/client";
import { PUBLIC_ROUTES } from "@/lib/public-routes";
import { redirect, usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { User } from "@supabase/supabase-js";

export interface UserContextValue {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching user session:", error);
      setUser(null);
      setLoading(false);
      return;
    }
    setUser(data?.session?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const pathname = usePathname();

  useEffect(() => {
    console.log("CTX loading:", loading, "user:", user, "pathname:", pathname);
    const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
    if (!loading && !user && !isPublic) {
      redirect("/auth/login");
    }
  }, [loading, user, pathname]);

  const value = useMemo(() => ({ user, loading, refreshUser }), [user, loading, refreshUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
