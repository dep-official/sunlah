'use client';

import { Header } from '@/widgets';
import { EventList } from '@/features/events';

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8 font-nicholas">
      <Header />
      <EventList />
    </div>
  );
} 