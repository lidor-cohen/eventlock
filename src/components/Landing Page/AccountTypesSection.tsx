import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Globe,
  Heart,
  Star,
} from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { fadeUp, scaleIn } from "@/lib/utils";
import { UserType, useUserStore } from "@/store/user-store";

const AccountTypesSection = () => {
  const accountTypes = [
    {
      icon: Heart,
      title: "לקוח",
      subtitle: "מחפש שירותים לאירוע",
      color: "from-rose-500/10 to-pink-500/10",
      border: "border-rose-200/60",
      iconColor: "text-rose-500",
      userType: "client" as UserType,
      features: [
        "גלה ספקים מובילים באזור שלך",
        "קבל הצעות מחיר מותאמות אישית",
        "נהל את כל האירוע במקום אחד",
        "דירוגים וביקורות אמיתיות",
      ],
    },
    {
      icon: Briefcase,
      title: "ספק שירות",
      subtitle: "צלם, DJ, קייטרינג ועוד",
      color: "from-primary/10 to-indigo-500/10",
      border: "border-primary/20",
      iconColor: "text-primary",
      userType: "provider" as UserType,
      features: [
        "קבל לידים איכותיים ישירות",
        "הצג תיק עבודות מקצועי",
        "נהל לוח זמנים והזמנות",
        "כלי ניהול עסקי מתקדמים",
      ],
      popular: true,
    },
    {
      icon: Building2,
      title: "מפיק אירועים",
      subtitle: "ניהול והפקת אירועים",
      color: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-200/60",
      iconColor: "text-amber-600",
      userType: "producer" as UserType,
      features: [
        "רשת ספקים מאומתים",
        "ניהול פרויקטים מקצה לקצה",
        "דוחות ואנליטיקס בזמן אמת",
        "תקשורת ישירה עם כל הצדדים",
      ],
    },
  ];
  const setPendingUserType = useUserStore((s) => s.setPendingUserType);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-xs tracking-wide">
            <Globe className="size-3 ml-1" />
            מותאם אישית
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            חוויה מותאמת לכל משתמש
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            בין אם אתה מחפש ספק, מציע שירות או מפיק — הפלטפורמה מתאימה את עצמה
            אליך.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {accountTypes.map((type, i) => (
            <motion.div
              key={type.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="relative group"
            >
              {type.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground shadow-md shadow-primary/25 text-xs px-3">
                    <Star className="size-3 ml-1" />
                    הכי פופולרי
                  </Badge>
                </div>
              )}
              <div
                className={`relative h-full rounded-2xl border ${type.border} bg-gradient-to-br ${type.color} p-[1px] hover:shadow-xl transition-all duration-500`}
              >
                <div className="h-full bg-white rounded-[15px] p-7 sm:p-8 flex flex-col">
                  <div
                    className={`inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br ${type.color} mb-5`}
                  >
                    <type.icon className={`size-6 ${type.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{type.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {type.subtitle}
                  </p>
                  <ul className="space-y-3 flex-1">
                    {type.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2
                          className={`size-4 mt-0.5 shrink-0 ${type.iconColor}`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div onClick={() => setPendingUserType(type.userType)}>
                    <SignUpButton mode="modal">
                      <Button
                        variant={type.popular ? "default" : "outline"}
                        className="w-full mt-8"
                      >
                        התחל עכשיו
                        <ArrowLeft className="size-4 mr-1" />
                      </Button>
                    </SignUpButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AccountTypesSection;
