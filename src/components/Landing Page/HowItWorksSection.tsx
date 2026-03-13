import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Users, Zap } from "lucide-react";
import { fadeUp } from "@/lib/utils";

const HowItWorksSection = () => {
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

  return (
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
  );
};
export default HowItWorksSection;
