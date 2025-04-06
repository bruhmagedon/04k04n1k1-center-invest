import type { ReactNode } from 'react';

import { createContext, useLayoutEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'dark' || stored === 'light') {
      return stored as Theme;
    }
    return defaultTheme;
  });

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {

      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const applySystemTheme = () => {
        root.classList.toggle('dark', darkQuery.matches);
      };

      applySystemTheme();

      darkQuery.addEventListener('change', applySystemTheme);
      return () => darkQuery.removeEventListener('change', applySystemTheme);
    }

    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === 'system') {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  };

  const value: ThemeProviderState = { theme, setTheme };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
