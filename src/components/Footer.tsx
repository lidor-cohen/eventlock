import React from "react";
import { Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <span className="font-mono font-bold text-sm">EventLock</span>
          </div>
          <nav className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
  );
};
export default Footer;
