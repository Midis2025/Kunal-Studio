import type { Metadata } from "next";
import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Studio Kunal Photography handles the personal information you share through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

// NOTE: plain-language notice drafted for launch — have it reviewed for your jurisdictions (e.g. PIPEDA, DPDP Act) before going live.
export default function PrivacyPage() {
  return (
    <section data-theme="light" className="wrap pb-24 pt-[calc(var(--header-h)+5rem)] md:pb-40 md:pt-[calc(var(--header-h)+8rem)]">
      <div className="mx-auto max-w-[42rem]">
        <p className="label text-ash">Last updated 29 September 2026</p>
        <h1 className="mt-6 font-serif t-display tracking-[-0.03em]">Privacy</h1>
        <div className="mt-12 space-y-6 text-ink/85 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          <p>
            {studio.name} respects your privacy. This notice explains what we collect through this website and how we use it.
          </p>
          <h2>What we collect</h2>
          <p>
            When you send an enquiry we receive the details you choose to share: your names, email, phone number (optional), event
            date and location, celebration type, guest count, the coverage you&rsquo;re interested in, how you found us, and your
            message.
          </p>
          <h2>How we use it</h2>
          <p>
            Only to reply to your enquiry, prepare a proposal and, if you book with us, to plan and deliver your photography and
            films. We never sell your information or share it for marketing.
          </p>
          <h2>Embedded films</h2>
          <p>
            Our films are hosted on YouTube. Players load in privacy-enhanced mode and only when you choose to play a film (a short
            muted preview may stream on large screens). YouTube&rsquo;s own privacy policy applies to those players.
          </p>
          <h2>Photographs</h2>
          <p>
            All photographs and films on this site are the work and copyright of {studio.name}. If you appear in an image and would like it removed, please contact us.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the information you&rsquo;ve shared at any time by writing to{" "}
            <a href={`mailto:${studio.email}`} className="link-line">
              {studio.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
