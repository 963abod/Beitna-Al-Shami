import type { Metadata } from "next";
import { Cairo, Tajawal, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800"],
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "بيتنا الشامي | Baitna Al-Shami - Luxury Syrian & Levantine Cuisine",
  description: "Authentic Damascene courtyard dining experience with handcrafted Syrian grills, mezze, and real-time online table reservations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} ${plusJakarta.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[var(--bg-dark)] text-[var(--ivory)] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
