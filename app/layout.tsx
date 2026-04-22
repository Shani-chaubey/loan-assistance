import type { Metadata } from "next";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";

export const metadata: Metadata = {
  title: "Payloan - Banking & Business Loan",
  description: "Payloan – Banking & Business Loan HTML5 Responsive Template",
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/payloan-icon.css" />
        <link rel="stylesheet" href="/css/icofont.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/slick.css" />
        <link rel="stylesheet" href="/css/owl.theme.css" />
        <link rel="stylesheet" href="/css/owl.carousel.css" />
        <link rel="stylesheet" href="/css/preset.css" />
        <link rel="stylesheet" href="/css/theme.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body>
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
