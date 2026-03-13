import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/utils";

const TrustedBySection = () => {
  const trustedBy = [
    "הילטון",
    "דן אירועים",
    "אווניו",
    "קונבנשן",
    "גני אירועים",
    "פסטיגל",
  ];

  return (
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
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3">
          {trustedBy.map((name, i) => (
            <motion.span
              key={name}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className="text-base sm:text-lg font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrustedBySection;
