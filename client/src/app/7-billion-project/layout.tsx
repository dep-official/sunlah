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
        <div className="container py-32 mx-auto lg:mt-20">
         {children}
        </div>
  );
}
