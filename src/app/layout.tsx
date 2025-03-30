import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7 Billion Project",
  description: "Art Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sfe3gei.css" />
      </head>
      <body className="font-nicholas">
        {children}
      </body>
    </html>
  );
}
