import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/lexend";
import "./globals.css";
import "./gazal-gradients.css";
import "./gazal-forest.css";
import "./gazal-video-intro.css";
import "./gazal-surfaces.css";
import { Header, Footer } from "@/components/shell";
import { site, socialImage } from "@/lib/site";
import { BrandIntro } from "@/components/ui/brand-intro";
import { ContentMotion } from "@/components/ui/content-motion";
import { PageMotion } from "@/components/ui/page-motion";
import { SocialLinks } from "@/components/ui/social-links";
import { ReadingProgress } from "@/components/ui/reading-progress";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GAZAL · Nutrición animal y valorización industrial",
    template: "%s | GAZAL",
  },
  description:
    "Valorización industrial, nutrición animal y ciencia aplicada. Gazalez e Hija SpA, Coronel, Biobío, Chile.",
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    images: [socialImage],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      {
        url: "/assets/gazal/favicon-v3-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/gazal/favicon-v3-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/gazal/favicon-v3-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/assets/gazal/favicon-v3.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/assets/gazal/apple-touch-icon-v3.png",
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
        <noscript>
          <style>
            {
              ".video-intro,.enquiry,.enquiry-loading{display:none!important}html:has(.video-intro){overflow:auto;scrollbar-width:auto}"
            }
          </style>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration="manual";try{if(sessionStorage.getItem("gazal-intro-seen")==="1")document.documentElement.dataset.introSeen="true"}catch{}`,
          }}
        />
      </head>
      <body>
        <BrandIntro />
        <PageMotion />
        <ContentMotion />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <ReadingProgress />
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
