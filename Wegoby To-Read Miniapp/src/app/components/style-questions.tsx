import React, { useState } from 'react';
import { ThemeToggle, Theme } from './theme-toggle';
import { WegobyButton } from './wegoby-button';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';

interface StyleQuestionsProps {
  onContinue: (data: { theme: Theme; motionLevel: number; readingSize: string }) => void;
  onBack: () => void;
  initialTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export function StyleQuestions({ onContinue, onBack, initialTheme = 'light', onThemeChange }: StyleQuestionsProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [motionLevel, setMotionLevel] = useState([50]);
  const [readingSize, setReadingSize] = useState('medium');

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ theme, motionLevel: motionLevel[0], readingSize });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Personalize Your Experience</h1>
          <p className="text-muted-foreground">Choose your preferred style</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-2xl shadow-lg border border-border">
          {/* Theme Toggle */}
          <div className="space-y-4">
            <label className="block">
              Theme Preference
            </label>
            <div className="flex justify-center">
              <ThemeToggle theme={theme} onChange={handleThemeChange} />
            </div>
          </div>

          {/* Motion Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block">
                Motion Preference
              </label>
              <span className="text-sm text-muted-foreground font-mono">
                {motionLevel[0] < 33 ? 'Calm' : motionLevel[0] > 66 ? 'Dynamic' : 'Balanced'}
              </span>
            </div>
            <div className="relative pt-2">
              <Slider
                value={motionLevel}
                onValueChange={setMotionLevel}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Calm</span>
                <span>Dynamic</span>
              </div>
            </div>

            {/* Visual indicator */}
            <div className="h-20 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  x: [0, motionLevel[0] / 2, 0],
                  scale: [1, 1 + motionLevel[0] / 200, 1],
                }}
                transition={{
                  duration: 2 - (motionLevel[0] / 100),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 bg-light-purple rounded-lg"
              />
            </div>
          </div>

          {/* Reading Size */}
          <div className="space-y-4">
            <label className="block">
              Preferred Reading Size
            </label>
            <p className="text-sm text-muted-foreground">
              Choose your preferred text size for reading paragraphs
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setReadingSize(size)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    readingSize === size
                      ? 'border-light-purple bg-light-purple/10'
                      : 'border-border hover:border-light-purple/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-2 capitalize font-medium">{size}</div>
                    <div
                      className={`${
                        size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
                      } text-muted-foreground`}
                    >
                      Sample text
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can change these preferences later in your user settings
          </p>

          <div className="flex gap-3">
            <WegobyButton type="button" variant="secondary" onClick={onBack} className="flex-1">
              Back
            </WegobyButton>
            <WegobyButton type="submit" className="flex-1">
              Continue
            </WegobyButton>
          </div>
        </form>
      </div>
    </div>
  );
}