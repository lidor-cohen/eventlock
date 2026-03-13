"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Users,
  Calendar,
  CheckCircle2,
  Star,
  Building2,
  Briefcase,
  Heart,
  Zap,
  TrendingUp,
  Clock,
  Globe,
} from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import CircularGallery from "@/components/CircularGallery";
import Ballpit from "@/components/Ballpit";
import { useUserStore, type UserType } from "@/store/user-store";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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

const steps = [
  {
    num: "01",
    title: "בחר סוג חשבון",
    desc: "לקוח, ספק שירות או מפיק — כל אחד מקבל חוויה מותאמת.",
    icon: Users,
  },
  {
    num: "02",
    title: "הירשם בקלות",
    desc: "התחבר עם אימייל, גוגל, פייסבוק או טלפון תוך שניות.",
    icon: Zap,
  },
  {
    num: "03",
    title: "התחל לעבוד",
    desc: "דאשבורד אישי, ניהול לידים והזדמנויות עסקיות — הכל מוכן.",
    icon: TrendingUp,
  },
];

const eventGalleryItems = [
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    text: "חתונה",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    text: "ברית מילה",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    text: "יום הולדת",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    text: "מסיבת אירוסין",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    text: "כנס עסקי",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=600&fit=crop",
    text: "בר מצווה",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    text: "מסיבת רווקות",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
    text: "אירוע חברה",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",
    text: "חגיגת חג",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    text: "הופעה חיה",
  },
];

const trustedBy = [
  "הילטון",
  "דן אירועים",
  "אווניו",
  "קונבנשן",
  "גני אירועים",
  "פסטיגל",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const setPendingUserType = useUserStore((s) => s.setPendingUserType);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* ═══════════════════  HERO  ═══════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Ballpit background */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
          <Ballpit
            count={100}
            gravity={0.01}
            friction={0.997}
            wallBounce={0.95}
            followCursor={false}
            colors={[0x6366f1, 0xa855f7, 0xec4899]}
            ambientColor={0xffffff}
            ambientIntensity={1.5}
            lightIntensity={150}
            minSize={0.3}
            maxSize={0.8}
            maxVelocity={0.1}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />

        <div className="relative z-[2] mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero content */}
          <div className="flex-1 text-center lg:text-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Badge
                variant="secondary"
                className="mb-8 px-4 py-1.5 text-sm font-medium bg-white/60 backdrop-blur-sm border border-primary/15 text-primary shadow-sm"
              >
                <Sparkles className="size-3.5 ml-1.5" />
                הפלטפורמה המובילה לניהול אירועים בישראל
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground"
            >
              כל האירוע שלך
              <br />
              <span className="bg-gradient-to-l from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                במקום אחד
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              EventLock מחברת בין לקוחות, ספקי שירות ומפיקי אירועים בפלטפורמה
              אחת חכמה — כדי שתוכלו להתמקד במה שחשוב באמת.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="text-base px-8 h-13 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  התחל בחינם
                  <ArrowLeft className="size-4 mr-2" />
                </Button>
              </SignUpButton>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 h-13 bg-white/50 backdrop-blur-sm border-border/60 hover:bg-white/80 transition-all duration-300"
              >
                למד עוד
              </Button>
            </motion.div>
          </div>

          {/* Hero visual — scrollable event gallery */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="w-full lg:flex-1 mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-[450px]">
              <CircularGallery
                items={eventGalleryItems}
                bend={1}
                textColor="#000000"
                borderRadius={0.05}
                font="bold 24px Open Sans"
                scrollSpeed={2}
                scrollEase={0.05}
              />
            </div>
            {/* Glow effect under gallery */}
            <div className="absolute -bottom-6 inset-x-8 h-12 bg-primary/8 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  TRUSTED BY  ═══════════════════ */}
      <section className="py-16 border-t border-border/30">
        <div className="mx-auto max-w-5xl px-4">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            נבחרו על ידי המותגים המובילים בתעשיית האירועים
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((name, i) => (
              <motion.span
                key={name}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                className="text-lg font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  HOW IT WORKS  ═══════════════════ */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 text-xs tracking-wide">
              <Clock className="size-3 ml-1" />
              פשוט ומהיר
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              שלושה צעדים להתחלה
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              ההרשמה לוקחת פחות מדקה. בחר, התחבר, והתחל.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl border border-border/40 p-8 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500">
                  {/* Step number */}
                  <span className="absolute -top-4 right-6 font-mono text-5xl font-black text-primary/8 group-hover:text-primary/15 transition-colors duration-500 select-none">
                    {step.num}
                  </span>
                  <div className="relative">
                    <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-primary/8 group-hover:bg-primary/12 transition-colors duration-300">
                      <step.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-4 w-8 border-t-2 border-dashed border-primary/15" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  ACCOUNT TYPES  ═══════════════════ */}
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
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm"
                        >
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

      {/* ═══════════════════  EVENTS GALLERY  ═══════════════════ */}
      <section className="relative bg-foreground overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 pt-24 sm:pt-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-4"
          >
            <Badge
              variant="outline"
              className="mb-4 text-xs tracking-wide border-background/20 text-background/70"
            >
              <Calendar className="size-3 ml-1" />
              סוגי אירועים
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-background">
              לכל אירוע — יש לנו פתרון
            </h2>
            <p className="mt-4 text-background/50 text-lg max-w-xl mx-auto">
              מחתונות מפוארות ועד ימי הולדת אינטימיים — EventLock מלווה כל סוג
              של אירוע.
            </p>
          </motion.div>
        </div>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            items={eventGalleryItems}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            font="bold 28px Open Sans"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </section>

      {/* ═══════════════════  FOOTER  ═══════════════════ */}
      <footer className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <span className="font-mono font-bold text-sm">EventLock</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                אודות
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                תנאי שימוש
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                פרטיות
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                צור קשר
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} EventLock. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
}
