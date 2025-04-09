import type { Metadata } from "next";
import "@/app/globals.css";
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: "Sun Lah",
  description: "Art",
  icons: {
		icon: "/favicon.png",
	},
};

const AudioPlayer = dynamic(
  () => import('@/features/audio-player').then(mod => mod.AudioPlayer),
  { ssr: false }
);

export default function BillionProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sfe3gei.css" />
      </head>
      <body className="container mx-auto lg:mt-20">
        <div className="py-32">
         {children}
        </div>
      </body>
    </html>
  );
}
