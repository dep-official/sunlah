'use client';

import { Work } from '@/entities/work/model/types';
import { WorkCard } from '@/entities/work/ui/WorkCard';

interface WorkListProps {
  works: Work[];
}

export function WorkList({ works }: WorkListProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </div>
  );
} 