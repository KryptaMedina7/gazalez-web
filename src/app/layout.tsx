import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/lexend";
import "./globals.css";
import { Header, Footer } from "@/components/shell";
import { site } from "@/lib/site";
import { BrandIntro } from "@/components/ui/brand-intro";
import { ContentMotion } from "@/components/ui/content-motion";
import { PageMotion } from "@/components/ui/page-motion";
import { SocialLinks } from "@/components/ui/social-links";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GAZALEZ · De subproducto a solución",
    template: "%s | GAZALEZ",
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
        url: "/assets/materia-social.jpg",
        width: 1200,
        height: 630,
        alt: "GAZALEZ, visualización conceptual de transformación de la materia",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/gazalez-logo.png" },
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
              "<!-- THESIS: Industrial valorization connects material and application. OWN-WORLD: mint and sage fields, forest ink, editorial Manrope and Lexend, hairlines and material sculpture. STORY: understand the transformation, inspect solutions and evidence, prepare a technical enquiry. FIRST VIEWPORT: left editorial headline and action, right full-height granular ribbon, lower capability rail. FORM: brief-pinned Industrial Biotech Premium; seed 22ce3cc8, direction 7 superseded by explicit user direction. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
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
              logo: `${site.url}/assets/gazalez-logo.png`,
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
