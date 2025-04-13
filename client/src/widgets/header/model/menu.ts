import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    label: 'Images',
    path: '/images',
    isItalic: true,
    children: [
      {
        label: '7 Billion Project',
        path: '/works/7-billion-project',
      },
      {
        label: 'And more',
        path: '/works/and-more',
      },
    ],
  },
  {
    label: 'CV',
    path: '/cv',
  },
]; 