import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rally — Performance Identity for Racket Sports",
  description: "The performance identity platform for serious racket sport players.",
  openGraph: {
    title: "Rally",
    description: "The performance identity platform for serious racket sport players.",
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
