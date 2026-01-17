import React from 'react';
import { Progress } from './ui/progress';
import { cn } from './ui/utils';

interface BookCardProps {
  title: string;
  progress: number;
  status: 'reading' | 'want-to-read' | 'done';
  coverColor?: string;
  onClick?: () => void;
}

export function BookCard({ title, progress, status, coverColor, onClick }: BookCardProps) {
  const statusLabels = {
    'reading': 'Reading',
    'want-to-read': 'Want to Read',
    'done': 'Done'
  };

  const statusColors = {
    'reading': 'bg-light-purple text-foreground',
    'want-to-read': 'bg-light-teal text-foreground',
    'done': 'bg-mint-green text-foreground'
  };

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white/50 dark:bg-card backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-white/30"
    >
      {/* Cover */}
      <div 
        className={cn(
          "w-full aspect-[3/4.4] flex items-center justify-center text-foreground p-4",
          coverColor || "bg-gradient-to-br from-purple-200 to-light-purple"
        )}
      >
        <div className="text-center">
          <h3 className="font-semibold text-lg line-clamp-3">{title}</h3>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className={cn('text-xs px-2 py-1 rounded-full', statusColors[status])}>
            {statusLabels[status]}
          </span>
          {status === 'reading' && (
            <span className="text-xs text-muted-foreground font-mono">{progress}%</span>
          )}
        </div>
        
        {status === 'reading' && (
          <Progress value={progress} className="h-1.5" />
        )}
      </div>
    </button>
  );
}