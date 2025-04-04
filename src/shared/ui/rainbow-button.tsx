import React from 'react';

import { cn } from '@/shared/utils/cn';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({ children, className, ...props }: RainbowButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-md border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',

        'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-5/6 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(theme(spacing.2))]',

        'bg-secondary hover:bg-secondary/80 text-secondary-foreground ,linear-gradient(var(--background)_50%,rgba(var(--background-rgb),0.6)_80%,rgba(var(--background-rgb),0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]',

        'bg-secondary hover:bg-secondary/80  text-secondary-foreground ,linear-gradient(var(--background)_50%,rgba(var(--background-rgb),0.6)_80%,rgba(var(--background-rgb),0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]',

        className
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  );
}
