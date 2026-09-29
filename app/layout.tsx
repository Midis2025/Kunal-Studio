import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { TransitionProvider } from "@/components/motion/PageTransition";
import Reveals from "@/components/motion/Reveals";
import ShutterIntro from "@/components/motion/ShutterIntro";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL, studio } from "@/data/studio";
import { moments } from "@/data/weddings";
import { photo } from "@/lib/photos";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const text = Manrope({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Studio Kunal Photography — Wedding Photography & Films · North America & India",
    template: "%s · Studio Kunal Photography",
  },
  description: studio.description,
  applicationName: studio.name,
  authors: [{ name: studio.name }],
  openGraph: {
    type: "website",
    siteName: studio.name,
    locale: "en_CA",
    url: "/",
    images: [{ url: "/images/deep-payal/18.jpg", width: 2400, height: 1600, alt: "Studio Kunal Photography" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

// Motion is opt-in: the class that hides pre-reveal content is only added when the
// visitor hasn't asked for reduced motion. A watchdog removes it if scripts fail.
const motionBoot = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('js-motion')},4000);try{if(!sessionStorage.getItem('sk-intro')){d.classList.add('intro');window.__introDelay=1.1;setTimeout(function(){d.classList.remove('intro')},4500)}}catch(e){}}}catch(e){}})();`;

const menuImages = {
  "/portfolio": photo("fashion-vault", 31, ""),
  "/films": photo("raman-akash", 43, ""),
  "/about": photo("nooreen-jugraj", 29, ""),
  "/journal": photo("varinder-param", 7, ""),
  "/contact": { ...moments.lakeside, alt: "" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <ShutterIntro />
        <TransitionProvider>
          <Header menuImages={menuImages} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
        <SmoothScroll />
        <Reveals />
        <Cursor />
      </body>
    </html>
  );
}
