'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center mb-20">
        <p className="text-2xl"><Link href="/"><Image src="/logo.svg" alt="Sun Lah" width={100} height={100} /></Link></p>
        <ul className="hidden lg:flex flex-row gap-8 items-center text-xl">
          <li><Link href="/works">WORKS</Link></li>
          <li><Link href="/cv">CV</Link></li>
        </ul>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-lg block lg:hidden"
        >
          MENU
        </button>
      </header>

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
            <li><Link href="/works">WORKS</Link></li>
            <li><Link href="/cv">CV</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
} 