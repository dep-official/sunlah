'use client';

import { WorkCard } from '@/entities/work/ui/WorkCard';
import type { Work } from '@/entities/work/model/types';

interface WorkListProps {
  works: Work[];
}

export function WorkList({ works }: WorkListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
} 