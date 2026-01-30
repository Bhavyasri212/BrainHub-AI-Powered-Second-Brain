import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "BrainHub - Second Brain",
  description: "AI-Powered Knowledge Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0B0B] text-white antialiased flex flex-col min-h-screen">
        {/* 1. The Header/Navbar stays here and shows on every page */}
        <Header />

        {/* 2. Main Content Area (This handles the <Routes> part automatically) */}
        <main className="flex-1 pt-16">{children}</main>

        {/* 3. Footer stays here */}
        <Footer />
      </body>
    </html>
  );
}
