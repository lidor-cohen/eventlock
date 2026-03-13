import type { Metadata, Viewport } from "next";
import { Open_Sans, Noto_Serif_Hebrew, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { DirectionProvider } from "@/components/ui/direction";
import { heIL } from "@clerk/localizations";
import { cn } from "@/lib/utils";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "hebrew"],
});

const notoSerifHebrew = Noto_Serif_Hebrew({
  variable: "--font-serif",
  subsets: ["latin", "hebrew"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "EventLock",
  description: "EventLock - האירוע הבא שלכם במרחק נגיעה",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📅</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={cn(
        "font-sans",
        openSans.variable,
        notoSerifHebrew.variable,
        ibmPlexMono.variable,
      )}
    >
      <body className="antialiased">
        <DirectionProvider dir="rtl">
          <ClerkProvider localization={heIL}>
            {children}
            <Toaster />
          </ClerkProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
