import React, { useEffect, useState } from "react";
import Ballpit from "@/components/Ballpit";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CircularGallery from "@/components/CircularGallery";
import { fadeUp } from "@/lib/utils";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Ballpit background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <Ballpit
          count={100}
          gravity={0.01}
          friction={0.997}
          wallBounce={0.95}
          followCursor={false}
          interactive={!isMobile}
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

      <div className="relative z-[2] w-full flex flex-col items-center gap-8">
        {/* Hero content */}
        <div className="w-full max-w-5xl px-4 text-center">
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
            className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            EventLock מחברת בין לקוחות, ספקי שירות ומפיקי אירועים בפלטפורמה אחת
            חכמה — כדי שתוכלו להתמקד במה שחשוב באמת.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="text-base px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
              >
                התחל בחינם
                <ArrowLeft className="size-4 ml-2" />
              </Button>
            </SignUpButton>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 bg-white/50 backdrop-blur-sm border-border/60 hover:bg-white/80 transition-all duration-300"
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
          className="w-full"
        >
          <div className="relative overflow-hidden h-[250px] sm:h-[320px] lg:h-[450px]">
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
  );
};
export default HeroSection;
