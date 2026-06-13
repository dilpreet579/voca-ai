import type { Metadata } from "next";
import { Inter, Poppins, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const dmSerifText = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "VocaAI - AI-Powered Customer Service, On Call 24/7",
  description: "VocaAI gives your business a dedicated number with a smart voice agent that schedules, responds, and organizes — all automatically.",
  keywords: ["AI", "customer service", "voice agent", "appointment scheduling", "business automation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${poppins.variable} ${dmSerifText.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
