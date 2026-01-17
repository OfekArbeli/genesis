import React from 'react';
import { cn } from './ui/utils';

interface WegobyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function WegobyButton({ 
  variant = 'primary', 
  size = 'md',
  className,
  children,
  ...props 
}: WegobyButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-light-purple focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-gradient-to-r from-primary-pink to-light-purple text-foreground hover:shadow-lg active:scale-95': variant === 'primary',
          'border-2 border-light-purple text-foreground hover:bg-purple-50 dark:hover:bg-purple-900/20 active:bg-purple-100 dark:active:bg-purple-900/30': variant === 'secondary',
          'text-foreground hover:bg-accent active:bg-muted': variant === 'ghost',
          
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}