import React from 'react';
import { BookOpen, StickyNote, Utensils, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';

interface MiniApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  available: boolean;
}

interface HomeScreenProps {
  userName: string;
  onSelectMiniapp: (id: string) => void;
}

export function HomeScreen({ userName, onSelectMiniapp }: HomeScreenProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const miniapps: MiniApp[] = [
    {
      id: 'to-read',
      name: 'to-read',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'text-light-purple',
      bgColor: 'bg-gradient-to-br from-purple-200 to-light-purple',
      available: true,
    },
    {
      id: 'to-note',
      name: 'to-note',
      icon: <StickyNote className="w-8 h-8" />,
      color: 'text-light-yellow',
      bgColor: 'bg-gradient-to-br from-light-yellow/60 to-light-orange/60',
      available: false,
    },
    {
      id: 'to-eat',
      name: 'to-eat',
      icon: <Utensils className="w-8 h-8" />,
      color: 'text-mint-green',
      bgColor: 'bg-gradient-to-br from-mint-green/60 to-light-teal/60',
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2">{greeting}, {userName}</h1>
          <p className="text-muted-foreground">What would you like to do today?</p>
        </motion.div>

        {/* Miniapp Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
          {miniapps.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => app.available && onSelectMiniapp(app.id)}
              disabled={!app.available}
              className={cn(
                'flex flex-col items-center gap-3',
                'transition-all duration-300',
                !app.available && 'opacity-60 cursor-not-allowed'
              )}
            >
              <div className={cn(
                'w-16 h-16 rounded-2xl p-4 flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/30',
                'transition-all duration-300',
                app.available
                  ? `${app.bgColor} hover:scale-110 active:scale-95`
                  : 'bg-white/30 dark:bg-neutral-800/30'
              )}>
                {app.icon}
              </div>
              <span className="text-sm text-center">{app.name}</span>
              {!app.available && (
                <span className="text-xs bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Soon
                </span>
              )}
            </motion.button>
          ))}

          {/* Add Miniapp */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: miniapps.length * 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl p-4 flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-muted-foreground hover:border-light-purple hover:text-light-purple transition-all duration-300 hover:scale-110 bg-white/30 dark:bg-neutral-800/30 backdrop-blur-sm">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm text-center">Add</span>
          </motion.button>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            "User is the Dev" — adaptive experiences that evolve with you
          </p>
        </motion.div>
      </div>
    </div>
  );
}