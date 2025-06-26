import { useEffect, useState } from 'react';

export function useTheme(): { theme: 'light' | 'dark'; toggleTheme: () => void } {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: 'light' | 'dark') => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
