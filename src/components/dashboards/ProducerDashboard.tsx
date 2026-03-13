"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, CheckCircle2, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LeadsTable from "@/components/dashboards/LeadsTable";
import type { useUser } from "@clerk/nextjs";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;

const cards = [
  { title: "אירועים בהפקה", stat: "0 אירועים פעילים", icon: Calendar, color: "bg-blue-100 text-blue-600" },
  { title: "רשת ספקים", stat: "0 ספקים ברשת", icon: Building2, color: "bg-violet-100 text-violet-600" },
  { title: "משימות", stat: "0 משימות פתוחות", icon: CheckCircle2, color: "bg-amber-100 text-amber-600" },
  { title: "דוחות", stat: "צפה בנתונים", icon: BarChart, color: "bg-green-100 text-green-600" },
];

export default function ProducerDashboard({ user }: { user: User }) {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-2"
      >
        שלום {user.firstName}, מוכן לנהל את האירועים?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-muted-foreground text-lg mb-8"
      >
        הנה סקירה מהירה של החשבון שלך
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-base">{card.title}</p>
                  <p className="text-muted-foreground text-sm">{card.stat}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <LeadsTable title="לידים פוטנציאליים" />
      </div>
    </div>
  );
}
