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
        width: 1200,
        height: 630,
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
