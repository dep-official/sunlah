'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuItem as MenuItemType } from '../model/types';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);
  const hasActiveChild = item.children?.some(child => 
    pathname.includes(child.path.replace('/', ''))
  );

  // pathname에 'works'가 포함되어 있는지 확인
  const isWorksPage = pathname.includes('works');

  useEffect(() => {
    // works 페이지가 아닐 때만 메뉴를 닫음
    if (!isWorksPage) {
      setIsOpen(false);
    }
  }, [pathname, isWorksPage]);

  // works 페이지일 때는 항상 메뉴가 열리도록 설정
  useEffect(() => {
    if (isWorksPage && item.children) {
      setIsOpen(true);
    }
  }, [isWorksPage, item.children]);

  if (item.children) {
    return (
      <li className='relative flex items-start'>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center transition-all ${
            item.isItalic ? 'italic' : ''
          } ${hasActiveChild ? 'font-bold' : ''}`}
        >
          {item.label}
        </button>
        {/* isWorksPage가 true이거나 isOpen이 true일 때 하위메뉴 표시 */}
        {(isWorksPage || isOpen) && (
          <ul className='absolute ml-20 lg:ml-32 '>
            {item.children.map((child) => (
              <li key={child.path}>
                <Link 
                  href={child.path}
                  className={`italic ${
                    pathname.includes(child.path.replace('/', '')) ? 'font-bold' : ''
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link 
        href={item.path}
        className={`${
          item.isItalic ? 'italic' : ''
        } ${isActive(item.path) ? 'font-bold' : ''}`}
      >
        {item.label}
      </Link>
    </li>
  );
} 