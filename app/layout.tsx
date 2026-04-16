import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RALLY — Know Your Game",
  description: "A dynamic rating that moves with your game. Get matched to your level. Build your performance identity on court.",
  openGraph: {
    title: "RALLY — Know Your Game",
    description: "Performance identity for padel & tennis. Coming soon to Madrid.",
    url: "https://rallyrating.app",
    siteName: "Rally",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
