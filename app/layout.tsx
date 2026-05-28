import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deep ❤️ Devanshi — Will You Marry Me?",
  description: "A love story written in the stars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}