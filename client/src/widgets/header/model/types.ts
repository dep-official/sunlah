export interface MenuItem {
  label: string;
  path: string;
  isItalic?: boolean;
  children?: MenuItem[];
} 