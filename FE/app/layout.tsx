import type { Metadata } from "next";
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
          <Header />
          <main className="page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
