import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = { themeColor: "#07402b" };

export const metadata: Metadata = {
  title: {
    default: "MARCHÉ OCASS — Le portail commercial de Touba",
    template: "%s | MARCHÉ OCASS",
  },
  description:
    "MARCHÉ OCASS est le premier portail marketplace de Touba. Ouvrez votre cantine en ligne, exposez vos produits et atteignez des milliers de clients locaux et de la diaspora. Abonnement à partir de 5 000 F CFA/mois.",
  keywords: [
    "marché en ligne Touba",
    "marketplace Touba Sénégal",
    "cantine en ligne Touba",
    "MARCHÉ OCASS",
    "vente en ligne Sénégal",
    "boutique Touba",
    "commerce mouride",
    "portail commercial Touba",
  ],
  metadataBase: new URL("https://marche-ocass.vercel.app"),
  openGraph: {
    title: "MARCHÉ OCASS — Le portail commercial de Touba",
    description: "Ouvrez votre cantine en ligne — vendez à Touba et partout au Sénégal. À partir de 5 000 F CFA/mois.",
    url: "https://marche-ocass.vercel.app",
    siteName: "MARCHÉ OCASS",
    locale: "fr_SN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MARCHÉ OCASS",
    description: "Le portail commercial de Touba — cantines, produits, services.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
