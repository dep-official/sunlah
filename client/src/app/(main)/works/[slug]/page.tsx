import Image from 'next/image';
import { works } from '@/shared/data/works';
import { notFound } from 'next/navigation';

// 정적 경로 생성
export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export default function WorksDetailPage({ params }: { params: { slug: string } }) {
  const work = works.find(w => w.slug === params.slug);

  if (!work) {
    notFound();
  }

  return (
    <section className='flex flex-col lg:flex-row lg:gap-20'>
      <figure className="relative w-full lg:w-3/4">
         <img src={work.src} alt={work.title} className='object-cover w-full h-full' />
      </figure>
      <p className='w-full lg:w-1/4 mt-4 lg:mt-0 text-[12px] leading-[25px] font-seoul'>
        {work.title}
        {work.medium && `, ${work.medium}`}
        {work.dimensions && `, ${work.dimensions}`}
        {work.year && `, ${work.year}`}
      </p>
      
    </section>
  );
}
