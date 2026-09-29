import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // WebP only: AVIF is ~10× slower to encode on first request, which on a fresh
    // deploy left photo cards sitting on their blur placeholder while scrolling.
    formats: ["image/webp"],
    // Photographs are migrated at max 2400px on the long edge
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
    qualities: [60, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  // Preserve SEO equity from the legacy wfolio URLs
  async redirects() {
    return [
      { source: "/aman-mrinal", destination: "/portfolio/aman-mrinal", permanent: true },
      { source: "/nooreen-jugraj", destination: "/portfolio/nooreen-jugraj", permanent: true },
      { source: "/deep-payal", destination: "/portfolio/deep-payal", permanent: true },
      { source: "/varinder-param-at-noor-mahal", destination: "/portfolio/varinder-param-noor-mahal", permanent: true },
      { source: "/the-house-of-rituals-india", destination: "/portfolio/house-of-rituals-india", permanent: true },
      { source: "/the-fashion-vault", destination: "/portfolio/the-fashion-vault", permanent: true },
      { source: "/akshita-rajat-a-lovestory-from-toronto-downtown", destination: "/portfolio/akshita-rajat-toronto", permanent: true },
      { source: "/raman-akash-love-straight-outta-panjab", destination: "/portfolio/raman-akash-punjab", permanent: true },
      { source: "/cinematicfilms", destination: "/films", permanent: true },
      { source: "/investment", destination: "/experience#investment", permanent: true },
      { source: "/testimonials", destination: "/experience#kind-words", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/main", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
