"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AppUser = {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string;
  roles: string[];
};

type AppContextType = {
  user: AppUser;
  mode: "personal" | "public";
  setMode: (mode: "personal" | "public") => void;
  setUser: (user: AppUser) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  userXp: number;
  addXp: (amount: number) => void;
  streakDays: number;
};

const DEFAULT_FOUNDER: AppUser = {
  id: "user_founder_raylab",
  display_name: "Fondateur RayLab",
  email: "founder@raylab.tech",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  roles: ["super_admin", "editor", "learner"],
};

const DEFAULT_LEARNER: AppUser = {
  id: "user_alex_learner",
  display_name: "Alexandre Dubois",
  email: "alexandre@example.com",
  avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  roles: ["learner"],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser>(DEFAULT_FOUNDER);
  const [mode, setMode] = useState<"personal" | "public">("personal");
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [userXp, setUserXp] = useState(850);
  const [streakDays, setStreakDays] = useState(7);

  useEffect(() => {
    const savedMode = localStorage.getItem("raylab_mode");
    if (savedMode === "personal" || savedMode === "public") {
      setMode(savedMode);
    }
    const savedXp = localStorage.getItem("raylab_xp");
    if (savedXp) {
      setUserXp(parseInt(savedXp, 10));
    }
  }, []);

  const handleSetMode = (newMode: "personal" | "public") => {
    setMode(newMode);
    localStorage.setItem("raylab_mode", newMode);
  };

  const addXp = (amount: number) => {
    setUserXp((prev) => {
      const next = prev + amount;
      localStorage.setItem("raylab_xp", next.toString());
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        mode,
        setMode: handleSetMode,
        setUser,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        userXp,
        addXp,
        streakDays,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
