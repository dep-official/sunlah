'use client';

import { Header } from '@/widgets';
import { WorkList } from '@/widgets/work-list/ui/WorkList';
import { works } from '@/shared/data/works';

export default function Works() {
  return (
    <div className="min-h-screen bg-white p-8 font-nicholas">
      <Header />
      <main className="max-w-7xl mx-auto mt-16 relative">
        <WorkList works={works} />
      </main>
    </div>
  );
}
