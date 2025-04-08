'use client';

import Image from 'next/image';
import type { PeopleImageType } from '../model/types';

interface PeopleImageProps {
  image: PeopleImageType;
  className?: string;
}

export function PeopleImage({ image, className }: PeopleImageProps) {
  const size = image.size || 60;
  
  return (
    <div className={`size-[${size}px] ${className}`}>
      <Image
        src={image.src}
        alt={`Figure ${image.id}`}
        width={size}
        height={size}
        className="w-full h-auto"
      />
    </div>
  );
} 