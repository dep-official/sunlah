'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from './MenuItem';
import { menuItems } from '../model/menu';

export function Header() {
  return (
    <>
      <header className="flex items-start justify-between mb-12">
        <p className="text-2xl">
          <Link href="/">
            <Image src="/logo.svg" alt="Sun Lah" className='w-12 h-12 lg:w-16 lg:h-16' width={64} height={64} />
          </Link>
        </p>
        <div className="gap-1 lg:gap-2 text-sm flex font-verdana [&>*]:text-[6px] leading-[10px] lg:text-[12px] lg:leading-[25px]">
          <button>Kor</button>
          <span>/</span>
          <button>Eng</button>
        </div>
      </header>

      <nav className='font-verdana text-[6px] leading-[10px] lg:text-[12px] lg:leading-[25px]'>
        <ul className='flex flex-col'>
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
} 