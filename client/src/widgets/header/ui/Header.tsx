'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from './MenuItem';
import { menuItems } from '../model/menu';
import { useLanguageStore } from '@/shared/store/language';

export function Header() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <>
      <header className="flex items-start justify-between mb-12">
        <p className="text-2xl">
          <Link href="/">
            <Image src="/logo.svg" alt="Sun Lah" className='lg:w-16 lg:h-16' width={64} height={64} />
          </Link>
        </p>
        <div className="gap-1 lg:gap-2 text-sm flex font-verdana  [&>*]:text-[12px] [&>*]:leading-[25px]">
          <button 
            onClick={() => setLanguage('ko')}
            className={language === 'ko' ? 'font-bold' : ''}
          >
            Kor
          </button>
          <span>/</span>
          <button 
            onClick={() => setLanguage('en')}
            className={language === 'en' ? 'font-bold' : ''}
          >
            Eng
          </button>
        </div>
      </header>

      <nav className='font-verdana text-[12px] leading-[25px]'>
        <ul className='flex flex-col'>
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
} 