"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <body className="flex min-h-full flex-col font-sans">
      {!isDashboard && <Navbar />}
      <main className="flex-1 h-full">{children}</main>
      {!isDashboard && <Footer />}
    </body>
  );
}
