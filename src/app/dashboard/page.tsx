"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ClientDashboard from "@/components/dashboards/ClientDashboard";
import ProviderDashboard from "@/components/dashboards/ProviderDashboard";
import ProducerDashboard from "@/components/dashboards/ProducerDashboard";
import type { UserType } from "@/store/user-store";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;

const dashboards: Record<UserType, React.FC<{ user: User }>> = {
  client: ClientDashboard,
  provider: ProviderDashboard,
  producer: ProducerDashboard,
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userType = user?.unsafeMetadata?.userType as UserType | undefined;

  useEffect(() => {
    if (!isLoaded) return;
    if (!userType) {
      router.replace("/onboarding");
    }
  }, [isLoaded, userType, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (!userType) return null;

  const Dashboard = dashboards[userType];

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <Dashboard user={user!} />
      </main>
    </div>
  );
}
