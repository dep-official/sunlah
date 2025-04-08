'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Work } from '../model/types';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="group size-full overflow-hidden bg-gray-100">
      <Link 
        href={work.link}
        className="block size-full"
        aria-label={`View project: ${work.title}`}
      >
        <div className="relative size-full">
          <Image
            src={work.src}
            alt={work.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={85}
          />
          <div 
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" 
            aria-hidden="true"
          />
          
          <div 
            className="absolute inset-0 flex items-end p-4 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            <div className="bg-white/80 backdrop-blur-sm p-3 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <h3 className="text-lg inline-block font-medium">
                {work.title}
              </h3>
              <p className="text-sm mt-1 text-gray-700">{work.year}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
} 