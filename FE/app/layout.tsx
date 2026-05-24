import type { Metadata } from "next";
import { Suspense } from "react";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Histour Next Prototype",
  description: "Story-based historical tourism frontend prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="page-shell">
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
