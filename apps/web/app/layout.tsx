import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "figmail",
  description: "think figma, but for email",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Toaster />
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
