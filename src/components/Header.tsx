"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Lock, LogIn, UserPlus, Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50",
        "after:absolute after:bottom-0 after:inset-x-0 after:h-[2px]",
        "after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:opacity-60",
      )}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <CalendarDays className="size-5 text-primary transition-transform hover:scale-110" />
            <span className="font-mono font-bold tracking-tight text-lg">
              EventLock
            </span>
          </Link>

          {/* Desktop Auth */}
          <nav
            aria-label="ניווט ראשי"
            className="hidden md:flex items-center gap-2"
          >
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    <LogIn className="size-4" />
                    כניסה
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    <UserPlus className="size-4" />
                    הרשמה
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="תפריט"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              aria-label="ניווט ראשי"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="flex flex-col gap-2 px-4 py-4">
                {isSignedIn ? (
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="w-full justify-center">
                        <LogIn className="size-4" />
                        כניסה
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full justify-center">
                        <UserPlus className="size-4" />
                        הרשמה
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
