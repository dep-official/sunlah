'use client';

import { PeopleImage } from '@/entities/people';
import { PEOPLE_IMAGES } from '@/entities/people/model/types';

const POSITIONS = [
  'top-[10%] right-[3%]',
  'top-[30%] left-[1%]',
  'top-[50%] right-[5%]',
  'top-[70%] left-[4%]',
  'top-[90%] right-[1%]',
];

export function PeopleList() {
  return (
    <>
      {PEOPLE_IMAGES.map((image, index) => (
        <PeopleImage
          key={image.id}
          image={image}
          className={`absolute ${POSITIONS[index % POSITIONS.length]} z-10`}
        />
      ))}
    </>
  );
} 