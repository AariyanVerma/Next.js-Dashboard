import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Dashboard",
  description: "Dashboard tutorial app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ isolation: "isolate" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
