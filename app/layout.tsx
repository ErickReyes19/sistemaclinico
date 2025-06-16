import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Poppins-Light.ttf",
  variable: "--font-Poppins-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/Poppins-Light.ttf",
  variable: "--font-Poppins-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Clinicas",
  description: "Sisetma de clinica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
