import { Loader } from '@/shared/ui/loader';
import { cn } from '@/shared/utils/cn';
import { ComponentProps } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
export const buttonVariants = cva(
  'cursor-pointer duration-200 rounded-sm transition-all leading-tight ease-in-out flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-default focus:outline-primary-active',
  {
    variants: {
      theme: {
        primary: 'dark:hover:bg-[#424247] active:bg-primary-active text-foreground hover:bg-zinc-200',
        secondary: 'bg-transparent active:bg-primary/30 text-primary hover:bg-primary/20',
        danger: 'bg-danger  hover:bg-danger-hover active:bg-danger-active',
        success: 'bg-success hover:bg-success-hover active:bg-success-active',
        outline: 'bg-transparent hover:bg-foreground/20 active:bg-foreground/30',
        unstyled: 'bg-transparent'
      },
      textStyle: {
        normal: 'font-medium',
        strong: 'font-bold',
        uppercase: 'font-semibold uppercase ',
        subtle: 'font-normal opacity-80'
      },
      size: {
        default: 'py-1.5 px-2.5',
        small: '',
        large: 'px-5 py-2.5',
        icon: 'size-6'
      }
    },
    defaultVariants: {
      textStyle: 'normal',
      theme: 'primary',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'prefix'>,
    VariantProps<typeof buttonVariants> {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Description
 * @param  prefix - Левая иконка
 * @param  postfix - Правая иконка
 * @param isLoading - Состояние загрузки
 * @param size - Тип размера кнопки
 * @param theme - Тип темы кнопки
 */
export const Button = ({
  theme,
  children,
  size,
  className,
  disabled,
  isLoading = false,
  textStyle,
  prefix,
  postfix,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ theme, size, textStyle }), className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader />}
      {prefix}
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {postfix}
    </button>
  );
};
