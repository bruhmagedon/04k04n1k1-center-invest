import type { ToasterProps } from 'sonner';

import { Toaster as Sonner } from 'sonner';

import { useTheme } from '../hooks/useTheme';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)'
        } as React.CSSProperties
      }
      className='toaster group'
      theme={theme as ToasterProps['theme']}
      {...props}
    />
  );
};

export { Toaster };
