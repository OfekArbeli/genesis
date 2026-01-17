import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from './ui/utils';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  return (
    <div className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-lg transition-all',
            theme === option.value
              ? 'bg-light-purple text-foreground shadow-sm'
              : 'text-foreground hover:bg-white dark:hover:bg-neutral-700'
          )}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}