import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://mahinthjoe.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mahinth Joe Christensen",
    template: "%s | Mahinth Joe Christensen",
  },
  description:
    "Personal website of Mahinth Joe Christensen — developer, builder, and creator.",
  keywords: ["Mahinth Joe Christensen", "mahinthjoe", "developer"],
  authors: [{ name: "Mahinth Joe Christensen", url: BASE_URL }],
  creator: "Mahinth Joe Christensen",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Mahinth Joe Christensen",
    title: "Mahinth Joe Christensen",
    description:
      "Personal website of Mahinth Joe Christensen — developer, builder, and creator.",
    images: [
      {
        url: "/og-image.png",
        width: 801,
        height: 600,
        alt: "Mahinth Joe Christensen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahinth Joe Christensen",
    description:
      "Personal website of Mahinth Joe Christensen — developer, builder, and creator.",
    images: ["/og-image.png"],
    creator: "@mahinthjoe",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Mahinth Joe Christensen",
      url: BASE_URL,
      sameAs: ["https://x.com/mahinthjoe"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Mahinth Joe Christensen",
      publisher: { "@id": `${BASE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
