import { create } from 'zustand';

type LanguageStore = {
  language: 'ko' | 'en';
  setLanguage: (language: 'ko' | 'en') => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'ko',
  setLanguage: (language) => set({ language }),
})); 