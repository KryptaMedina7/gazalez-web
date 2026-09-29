import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/lexend";
import "./globals.css";
import "./gazal-gradients.css";
import "./gazal-forest.css";
import { Header, Footer } from "@/components/shell";
import { site } from "@/lib/site";
import { BrandIntro } from "@/components/ui/brand-intro";
import { ContentMotion } from "@/components/ui/content-motion";
import { PageMotion } from "@/components/ui/page-motion";
import { SocialLinks } from "@/components/ui/social-links";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GAZAL · De subproducto a solución",
    template: "%s | GAZAL",
  },
  description:
    "Valorización industrial, nutrición animal y ciencia aplicada. Gazalez e Hija SpA, Coronel, Biobío, Chile.",
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    images: [
      {
        url: "/assets/forest/social.jpg",
        width: 1200,
        height: 630,
        alt: "GAZAL, naturaleza y nuevas posibilidades. Paisaje conceptual.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/assets/gazal/favicon.png",
    apple: "/assets/gazal/apple-touch-icon.png",
  },
};
export const viewport: Viewport = {
  themeColor: "#edf3eb",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration="manual";`,
          }}
        />
      </head>
      <body>
        <BrandIntro />
        <PageMotion />
        <ContentMotion />
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: Enter nature to discover industrial transformation. OWN-WORLD: supplied GAZAL serif lockup, photographic forest depth, pale green gradients and forest ink. STORY: step between foliage, understand solutions, explore scientific evidence, contact the team. FIRST VIEWPORT: full-width forest with independent near fern wings, left semantic headline and primary solution action. FORM: user-pinned forest revision 2026-09-29, existing catalogue retained. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <SocialLinks
          links={[{ platform: "mail", href: `mailto:${site.email}` }]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              legalName: site.legalName,
              url: site.url,
              logo: `${site.url}/assets/gazal/gazal-principal-transparente.png`,
              taxID: site.rut,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Coronel",
                addressRegion: "Biobío",
                addressCountry: "CL",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
