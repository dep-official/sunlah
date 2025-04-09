'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-start justify-between mb-12">
        <p className="text-2xl"><Link href="/"><Image src="/logo.svg" alt="Sun Lah" width={64} height={64} /></Link></p>
        <div className="hidden gap-2 text-sm lg:flex font-verdana text-[12px] leading-[25px]">
         <button>Kor</button>
          <span>/</span>
          <button>Eng</button>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block text-lg lg:hidden"
        >
          MENU
        </button>
      </header>

      <nav className='font-verdana text-[12px] leading-[25px]'>
          <ul className='flex flex-col'>
            <li ><Link href={''} className='italic font-bold'>Images</Link></li>
            <li ><Link href={'/cv'}>CV</Link></li>
          </ul>
      </nav>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-50 p-8 bg-white lg:hidden">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              Close
            </button>
          </div>
          <ul className="mt-20 space-y-4 text-xl">
            <li><Link href="">WORKS</Link></li>
            <li><Link href="">CV</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
} 