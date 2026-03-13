"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/Landing Page/HeroSection";
import TrustedBySection from "@/components/Landing Page/TrustedBySection";
import HowItWorksSection from "@/components/Landing Page/HowItWorksSection";
import AccountTypesSection from "@/components/Landing Page/AccountTypesSection";
import ProfileCardsSection from "@/components/Landing Page/ProfileCardsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <AccountTypesSection />
      <TrustedBySection />
      <ProfileCardsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
