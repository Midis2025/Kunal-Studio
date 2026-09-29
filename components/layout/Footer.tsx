import { TLink } from "@/components/motion/PageTransition";
import { nav, studio } from "@/data/studio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-night text-ivory grain">
      <div className="wrap pt-24 md:pt-36">
        <p className="label text-ivory/50" data-reveal="fade">
          The next chapter
        </p>
        <TLink href="/contact" className="group mt-6 block" aria-label="Let's create something timeless — begin an enquiry">
          <span className="block font-serif t-display leading-[0.92]" data-reveal="split">
            Let&rsquo;s create
            <br />
            <em className="text-stone transition-colors duration-700 group-hover:text-ivory">something timeless.</em>
          </span>
          <span className="cta mt-8 text-ivory/80 group-hover:text-ivory">
            Begin the conversation <span className="cta-arrow" aria-hidden>→</span>
          </span>
        </TLink>

        <div className="mt-24 grid gap-12 border-t border-ivory/15 pt-12 sm:grid-cols-2 lg:grid-cols-12 md:mt-32">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl leading-none tracking-tight">
              Studio Kunal
              <br />
              <span className="italic text-stone">Photography</span>
            </p>
            <ul className="label mt-8 space-y-1 text-ivory/60">
              {studio.regions.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="label mb-5 text-ivory/50">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {nav.map((l) => (
                <li key={l.href}>
                  <TLink href={l.href} className="link-draw inline-block py-1.5">
                    {l.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label mb-5 text-ivory/50">Say hello</p>
            <a href={`mailto:${studio.email}`} className="link-draw inline-block break-all py-1.5">
              {studio.email}
            </a>
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="link-draw mt-1 block w-fit py-1.5">
              WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <p className="label mb-5 text-ivory/50">Follow</p>
            <a href={studio.social.instagram} target="_blank" rel="noopener noreferrer" className="link-draw block w-fit py-1.5">
              Instagram
            </a>
            <a href={studio.social.youtube} target="_blank" rel="noopener noreferrer" className="link-draw block w-fit py-1.5">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-serif leading-[0.8] tracking-[-0.04em] text-ivory/[0.06]"
        style={{ fontSize: "clamp(4rem, 23vw, 26rem)" }}
      >
        KUNAL
      </p>

      <div className="wrap flex flex-col gap-3 border-t border-ivory/10 py-6 text-[0.72rem] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Studio Kunal Photography. All photographs and films copyright Studio Kunal Photography.</p>
        <div className="flex gap-6">
          <TLink href="/privacy" className="link-draw py-2">
            Privacy
          </TLink>
          <span>Bookings open {studio.bookings}</span>
        </div>
      </div>
    </footer>
  );
}
