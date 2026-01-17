import React, { useState } from 'react';
import { cn } from './ui/utils';

interface TagSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
}

export function TagSelector({ options, selected, onChange, multiple = true }: TagSelectorProps) {
  const toggleTag = (tag: string) => {
    if (multiple) {
      if (selected.includes(tag)) {
        onChange(selected.filter(t => t !== tag));
      } else {
        onChange([...selected, tag]);
      }
    } else {
      onChange([tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => toggleTag(option)}
            className={cn(
              'px-4 py-2 rounded-full text-sm transition-all duration-200',
              'border-2',
              isSelected
                ? 'bg-light-purple text-foreground border-light-purple'
                : 'bg-transparent text-foreground border-light-purple/40 hover:bg-purple-50 dark:hover:bg-purple-900/20'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}