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
    default: "Stop renting your CRM. Own it. | GoCWGL CRM",
    template: "%s | GoCWGL",
  },
  description:
    "GoCWGL builds your own CRM and client portal, on your domain and with your branding, that you own outright instead of renting one by the month. Plus custom-coded funnels, automation and a daily lead report.",
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
