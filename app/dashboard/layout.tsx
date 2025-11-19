import type { ReactNode } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav />

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
