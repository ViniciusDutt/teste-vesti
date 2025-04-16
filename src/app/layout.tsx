import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--roboto-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sua Marca",
  description: "SUA MARCA!\r\nSUA MARCA!\r\nSUA MARCA!",
  icons: {
    icon: "https://cdn.vesti.mobi/companies/icons/243/0ec63cc6-04cb-4400-a0e9-5703eeed20e4/icone_clawsome_192-jpg.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
