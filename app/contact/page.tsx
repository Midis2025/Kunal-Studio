import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/ui/JsonLd";
import Pic from "@/components/ui/Pic";
import { studio } from "@/data/studio";
import { moments } from "@/data/weddings";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Tell Us Your Story",
  description:
    "Enquire about wedding photography and films with Studio Kunal Photography — North America, India and destination weddings worldwide. Bookings open 2026–2027.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section data-theme="light" className="wrap grid gap-16 pb-24 pt-[calc(var(--header-h)+5rem)] md:grid-cols-12 md:pb-40 md:pt-[calc(var(--header-h)+8rem)]">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <p className="label" data-reveal="fade">
              Bookings open {studio.bookings}
            </p>
            <h1 className="mt-8 font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
              Tell us
              <br />
              <em className="normal-case">your story.</em>
            </h1>
            <p className="mt-10 max-w-sm t-lead" data-reveal="fade">
              We&rsquo;re so glad you found us. Share as much as you&rsquo;d like — it helps us understand your vision.
            </p>
            <div className="mt-12 hidden md:block" data-reveal="mask">
              <Pic p={moments.garden} sizes="30vw" className="w-3/4" />
            </div>
            <dl className="mt-12 grid gap-6 text-sm">
              <div>
                <dt className="label text-ash">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${studio.email}`} className="link-line break-all">
                    {studio.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-ash">WhatsApp</dt>
                <dd className="mt-1">
                  <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line">
                    {studio.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-ash">Based in</dt>
                <dd className="mt-1">North America · India · Worldwide</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-4">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
