"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore, type UserType } from "@/store/user-store";

const typeDetails: Record<
  UserType,
  {
    icon: typeof Heart;
    title: string;
    subtitle: string;
    color: string;
    border: string;
    iconColor: string;
  }
> = {
  client: {
    icon: Heart,
    title: "לקוח",
    subtitle: "מחפש שירותים לאירוע",
    color: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-200/60",
    iconColor: "text-rose-500",
  },
  provider: {
    icon: Briefcase,
    title: "ספק שירות",
    subtitle: "צלם, DJ, קייטרינג ועוד",
    color: "from-primary/10 to-indigo-500/10",
    border: "border-primary/20",
    iconColor: "text-primary",
  },
  producer: {
    icon: Building2,
    title: "מפיק אירועים",
    subtitle: "ניהול והפקת אירועים",
    color: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-200/60",
    iconColor: "text-amber-600",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { pendingUserType, setPendingUserType } = useUserStore();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.unsafeMetadata?.userType) {
      router.replace("/dashboard");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (pendingUserType) {
      setSelectedType(pendingUserType);
    }
  }, [pendingUserType]);

  const handleConfirm = async () => {
    if (!selectedType || !user) return;
    setSaving(true);
    try {
      await user.update({
        unsafeMetadata: { userType: selectedType },
      });
      setPendingUserType(null);
      router.replace("/dashboard");
    } catch {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div className="space-y-4 w-full max-w-md px-4">
          <div className="h-8 w-48 mx-auto bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-64 mx-auto bg-muted animate-pulse rounded" />
          <div className="grid gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-muted animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (user?.unsafeMetadata?.userType) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            ברוך הבא ל-EventLock
          </h1>
          <p className="text-muted-foreground text-lg">
            {selectedType
              ? "אשר את סוג החשבון שלך כדי להמשיך"
              : "בחר את סוג החשבון שלך כדי להתחיל"}
          </p>
        </motion.div>

        <div className="grid gap-4">
          {(Object.entries(typeDetails) as [UserType, (typeof typeDetails)[UserType]][]).map(
            ([key, detail], i) => {
              const Icon = detail.icon;
              const isSelected = selectedType === key;

              return (
                <motion.button
                  key={key}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  onClick={() => setSelectedType(key)}
                  className={`relative w-full text-start rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `${detail.border} bg-gradient-to-br ${detail.color} shadow-lg`
                      : "border-border/40 bg-white hover:border-border hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br ${detail.color}`}
                    >
                      <Icon className={`size-5 ${detail.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{detail.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {detail.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className={`size-6 ${detail.iconColor}`} />
                    )}
                  </div>
                </motion.button>
              );
            },
          )}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-8"
        >
          <Button
            size="lg"
            className="w-full h-13 text-base shadow-lg shadow-primary/20"
            disabled={!selectedType || saving}
            onClick={handleConfirm}
          >
            {saving ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                שומר...
              </>
            ) : (
              <>
                המשך לדאשבורד
                <ArrowLeft className="size-4 mr-2" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
