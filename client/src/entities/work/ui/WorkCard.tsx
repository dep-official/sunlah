'use client';

import Link from 'next/link';
import type { Work } from '../model/types';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="overflow-hidden bg-gray-100 group size-full aspect-square">
      <Link 
        href={`/works/${work.slug}`}
        className="block size-full"
        aria-label={`View project: ${work.title}`}
      >
        <div className="relative w-full h-full ">
          <img src={work.src} alt={work.title} className='object-cover w-full h-full ' />
          <div 
            className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/20" 
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  );
} 