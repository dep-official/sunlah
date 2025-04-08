'use client';

import { Header } from '@/widgets';
import { WorkList } from '@/widgets/work-list/ui/WorkList';
import { works } from '@/shared/data/works';

export default function Works() {
  return (
    <div className="min-h-screen p-8 bg-white font-nicholas">
      <Header />
      <section>
        <div>
          <p>Images</p>
          <span>CV</span>
        </div>
        <div>
          <p>7 Billion Project</p>
          <span>And more</span>
        </div>
      </section>
      <main className="relative mx-auto my-16 max-w-7xl">
        <WorkList works={works} />
      </main>
    </div>
  );
}
