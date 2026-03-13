"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Briefcase, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { useUser } from "@clerk/nextjs";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;

const cards = [
  { title: "האירועים שלי", stat: "0 אירועים פעילים", icon: Calendar, color: "bg-blue-100 text-blue-600" },
  { title: "ספקים שנשמרו", stat: "0 ספקים ברשימה", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { title: "הצעות מחיר", stat: "0 הצעות ממתינות", icon: Briefcase, color: "bg-amber-100 text-amber-600" },
  { title: "הודעות", stat: "0 הודעות חדשות", icon: MessageSquare, color: "bg-green-100 text-green-600" },
];

export default function ClientDashboard({ user }: { user: User }) {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-2"
      >
        שלום {user.firstName}, מוכן למצוא את הספקים המושלמים?
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
    </div>
  );
}
