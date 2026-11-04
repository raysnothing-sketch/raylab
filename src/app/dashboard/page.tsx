import React from "react";
import { getUserDashboard } from "@/lib/data";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  // Default to RayLab founder account
  const dashboardData = await getUserDashboard("user_founder_raylab");

  if (!dashboardData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-ivory">
        Utilisateur non trouvé.
      </div>
    );
  }

  return <DashboardClient dashboardData={dashboardData} />;
}
