import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Prajna World Tech | AI-Powered Digital Transformation",
  description:
    "Premium AI, cloud, automation, cybersecurity, web and app development services by Prajna World Tech.",
  openGraph: {
    title: "Prajna World Tech",
    description: "AI-powered digital transformation for ambitious businesses.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
