import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Red_Hat_Display, Baloo_2 } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const redHat = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Goodness for All | Iedereen een gezonde maaltijd",
  description: "Samen maken we een einde aan honger in Rotterdam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${jakarta.variable} ${redHat.variable} ${baloo.variable}`}>
      <head>
        {/* Material Symbols Outlined — icon glyphs used across every page */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="text-evergreen overflow-x-hidden">{children}</body>
    </html>
  );
}
