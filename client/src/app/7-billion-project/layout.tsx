import type { Metadata } from "next";
import "@/app/globals.css";
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: "7 billion project",
  description: "Sun Lah",
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
