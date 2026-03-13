import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import { fadeUp } from "@/lib/utils";

const profiles = [
  {
    name: "DJ Nevo",
    title: "DJ & מוזיקה חיה",
    handle: "djnevo",
    status: "זמין לאירועים",
    contactText: "צור קשר",
    avatarUrl: "/profilecards/1.png",
    miniAvatarUrl: "/profilecards/1.png",
    // DJ — purple/violet
    innerGradient:
      "linear-gradient(145deg, hsla(262, 80%, 50%, 0.2) 0%, hsla(220, 90%, 60%, 0.1) 100%)",
    behindGlowColor: "rgba(139, 92, 246, 0.35)",
  },
  {
    name: "אורי מאירוביץ׳",
    title: "צלם אירועים",
    handle: "oriphotography",
    status: "זמין לאירועים",
    contactText: "צור קשר",
    avatarUrl: "/profilecards/2.png",
    miniAvatarUrl: "/profilecards/2.png",
    // Photographer — amber/orange
    innerGradient:
      "linear-gradient(145deg, hsla(35, 95%, 55%, 0.2) 0%, hsla(15, 90%, 55%, 0.1) 100%)",
    behindGlowColor: "rgba(245, 158, 11, 0.35)",
  },
  {
    name: "מישהי סינית",
    title: "קייטרינג יוקרתי",
    handle: "chinesecatering",
    status: "זמינה לאירועים",
    contactText: "צור קשר",
    avatarUrl: "/profilecards/3.png",
    miniAvatarUrl: "/profilecards/3.png",
    // Catering — emerald/teal
    innerGradient:
      "linear-gradient(145deg, hsla(158, 75%, 40%, 0.2) 0%, hsla(185, 80%, 45%, 0.1) 100%)",
    behindGlowColor: "rgba(16, 185, 129, 0.35)",
  },
];

const ProfileCardsSection = () => {
  return (
    <section
      className="relative py-20 sm:py-32 bg-zinc-950"
      style={{
        clipPath: "polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            הספקים הטובים ביותר
            <br />
            <span className="bg-gradient-to-l from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              במקום אחד
            </span>
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            מצאו את הצוות המושלם לאירוע שלכם — DJ, צלם, קייטרינג ועוד, הכל
            בפלטפורמה אחת.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.handle}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <ProfileCard
                name={profile.name}
                title={profile.title}
                handle={profile.handle}
                status={profile.status}
                contactText={profile.contactText}
                avatarUrl={profile.avatarUrl}
                miniAvatarUrl={profile.miniAvatarUrl}
                innerGradient={profile.innerGradient}
                behindGlowColor={profile.behindGlowColor}
                showUserInfo
                enableTilt
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCardsSection;
