import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./markdown.css";
import { cookies } from "next/headers";
import ClientLayout from "@/components/ui/client-layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SPYArb",
  description: "Statistical arbitrage for SPY using predictive modeling.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar:state")?.value === "true" ||
    cookieStore.get("sidebar:state") === undefined;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout defaultOpen={defaultOpen}>{children}</ClientLayout>
      </body>
    </html>
  );
}
