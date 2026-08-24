import { IBM_Plex_Mono } from "next/font/google";
import "katex/dist/katex.min.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-cfa-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function CFALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${ibmPlexMono.variable} flex-1`}>{children}</div>
  );
}
