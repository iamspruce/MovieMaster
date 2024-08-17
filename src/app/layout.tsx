import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

import RootLayoutClient from "./RootLayoutClient";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MovieMaster",
  description:
    "MovieMaster PWA helps you find the latest movies with an easy search by genre, year, and more. It works smoothly on any device, even offline, giving you a great movie browsing experience.",
  manifest: "/web.manifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
