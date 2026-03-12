import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiwi Connect Digital | Digital Marketing Agency, Bhopal",
  description: "Kiwi Connect Digital - Premier digital marketing agency in Bhopal. SEO, Social Media, Brand Strategy, Paid Campaigns and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        {children}
      </body>
    </html>
  );
}