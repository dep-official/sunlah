'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-start mb-20">
        <p className="text-2xl"><Link href="/"><Image src="/logo.svg" alt="Sun Lah" width={72} height={72} /></Link></p>
        <div className="text-sm hidden lg:flex gap-2 font-verdana">
         <button>Kor</button>
          <span>/</span>
          <button>Eng</button>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-lg block lg:hidden"
        >
          MENU
        </button>
      </header>

      <nav className='font-verdana'>
          <ul className='flex gap-4 flex-col'>
            <li ><Link href={''} className='text-base font-bold italic'>Images</Link></li>
            <li ><Link href={'/cv'} className='text-base'>CV</Link></li>
          </ul>
      </nav>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav className="fixed inset-0 bg-white z-50 p-8 lg:hidden">
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