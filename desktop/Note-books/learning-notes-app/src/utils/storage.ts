import type { Language } from "../types/notes";

const STORAGE_KEY = "learning-notes";

export const getLanguages = (): Language[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

export const saveLanguages = (languages: Language[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(languages));
};