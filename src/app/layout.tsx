import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { PageLoader } from "@/components/layout/PageLoader/PageLoader";
import "@/styles/main.scss";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Leads come in. Then what happens? | GoCWGL Revenue Engine & CRM",
    template: "%s | GoCWGL",
  },
  description:
    "GoCWGL builds the pipeline, funnel, automation and daily reporting system that catches every lead — plus your own custom CRM and client portal that you own outright, instead of renting one by the month.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
