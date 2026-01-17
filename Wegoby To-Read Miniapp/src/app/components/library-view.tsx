import React, { useState } from 'react';
import { BookCard } from './book-card';
import { WegobyButton } from './wegoby-button';
import { Filter, Grid3x3, List, Plus, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';

interface Book {
  id: string;
  title: string;
  progress: number;
  status: 'reading' | 'want-to-read' | 'done';
  coverColor: string;
}

interface LibraryViewProps {
  onBack: () => void;
  onSelectBook: (bookId: string) => void;
  onCreateBook: () => void;
  showSearchBar?: boolean;
}

export function LibraryView({ onBack, onSelectBook, onCreateBook, showSearchBar = false }: LibraryViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'The Quiet Shape of Becoming',
      progress: 45,
      status: 'reading',
      coverColor: 'bg-gradient-to-br from-purple-200 to-light-purple'
    },
    {
      id: '2',
      title: 'Those Who Learned to Stay',
      progress: 12,
      status: 'reading',
      coverColor: 'bg-gradient-to-br from-light-teal to-mint-green'
    },
    {
      id: '3',
      title: 'A Gentle World Between Decisions',
      progress: 0,
      status: 'want-to-read',
      coverColor: 'bg-gradient-to-br from-mint-green to-success'
    },
    {
      id: '4',
      title: 'The Ones You Meet Along the Way',
      progress: 0,
      status: 'want-to-read',
      coverColor: 'bg-gradient-to-br from-light-yellow to-light-orange'
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">to-read</h1>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'grid' ? 'bg-white dark:bg-neutral-700' : 'hover:bg-white/50 dark:hover:bg-neutral-700/50'
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'list' ? 'bg-white dark:bg-neutral-700' : 'hover:bg-white/50 dark:hover:bg-neutral-700/50'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl">My Library</h1>
          
          {/* Search Bar - appears when requested via chat */}
          {showSearchBar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your library..."
                  className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-card backdrop-blur-sm rounded-2xl border border-light-purple/30 focus:outline-none focus:ring-2 focus:ring-light-purple shadow-md"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {books.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-light-purple" />
            </div>
            <h2 className="text-xl mb-2">Your library is empty</h2>
            <p className="text-muted-foreground mb-6">Want me to suggest a book?</p>
            <WegobyButton onClick={onCreateBook}>
              Add Your First Book
            </WegobyButton>
          </motion.div>
        ) : (
          <>
            {/* Book Grid */}
            <div className={cn(
              'grid gap-6 mb-8',
              viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'
            )}>
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <BookCard
                      title={book.title}
                      progress={book.progress}
                      status={book.status}
                      coverColor={book.coverColor}
                      onClick={() => onSelectBook(book.id)}
                    />
                  ) : (
                    <div
                      onClick={() => onSelectBook(book.id)}
                      className="flex gap-4 p-4 bg-card rounded-lg hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className={cn('w-20 h-28 rounded flex items-center justify-center text-white flex-shrink-0', book.coverColor)}>
                        <span className="text-xs text-center px-2">{book.title}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-2 truncate">{book.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            'text-xs px-2 py-1 rounded-full',
                            book.status === 'reading' ? 'bg-light-purple text-foreground' :
                            book.status === 'done' ? 'bg-mint-green text-foreground' :
                            'bg-light-teal text-foreground'
                          )}>
                            {book.status === 'reading' ? 'Reading' : book.status === 'done' ? 'Done' : 'Want to Read'}
                          </span>
                          {book.status === 'reading' && (
                            <span className="text-xs text-muted-foreground font-mono">{book.progress}%</span>
                          )}
                        </div>
                        {book.status === 'reading' && (
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                            <div className="bg-light-purple h-full rounded-full transition-all" style={{ width: `${book.progress}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* FAB - Removed, now in bottom nav */}
    </div>
  );
}