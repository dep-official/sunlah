import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/widgets";
import { ScrollToTop } from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: "Sun Lah",
  description: "Art",
  icons: {
		icon: "/favicon.png",
	},
};


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto lg:mt-20">
      <ScrollToTop />
      <Header />
      <div className="py-32">
        {children}
      </div>
    </div>
  );
}
