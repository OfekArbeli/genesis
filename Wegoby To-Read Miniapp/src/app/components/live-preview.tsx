import React from 'react';
import { WegobyButton } from './wegoby-button';
import { BookOpen, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface LivePreviewProps {
  theme: 'light' | 'dark' | 'system';
  motionLevel: number;
  onContinue: () => void;
  onTweakMore: () => void;
}

export function LivePreview({ theme, motionLevel, onContinue, onTweakMore }: LivePreviewProps) {
  const animationSpeed = 2 - (motionLevel / 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Here's Your Preview</h1>
          <p className="text-muted-foreground">See how your Wegoby experience will look</p>
        </div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationSpeed * 0.5 }}
          className="bg-card p-8 rounded-2xl shadow-lg border border-border mb-6"
        >
          <div className="space-y-6">
            {/* Header */}
            <motion.div 
              className="flex items-center gap-3"
              animate={{
                x: [0, motionLevel / 10, 0],
              }}
              transition={{
                duration: animationSpeed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-light-purple rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2>to-read</h2>
                <p className="text-sm text-muted-foreground">Your reading companion</p>
              </div>
            </motion.div>

            {/* Sample Content */}
            <div className="space-y-3">
              <motion.div
                animate={{
                  scale: [1, 1 + (motionLevel / 500), 1],
                }}
                transition={{
                  duration: animationSpeed * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full w-3/4"
              />
              <motion.div
                animate={{
                  scale: [1, 1 + (motionLevel / 500), 1],
                }}
                transition={{
                  duration: animationSpeed * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
                className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full w-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1 + (motionLevel / 500), 1],
                }}
                transition={{
                  duration: animationSpeed * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
                className="h-3 bg-violet-200 dark:bg-violet-800 rounded-full w-5/6"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1 + (motionLevel / 200) }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              >
                <Sparkles className="w-5 h-5 text-light-purple mb-2" />
                <p className="text-sm">AI-powered suggestions</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1 + (motionLevel / 200) }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              >
                <Zap className="w-5 h-5 text-light-purple mb-2" />
                <p className="text-sm">Personalized reading</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="text-center space-y-4">
          <div className="flex gap-3 justify-center">
            <WegobyButton variant="secondary" onClick={onTweakMore}>
              Tweak More
            </WegobyButton>
            <WegobyButton onClick={onContinue} size="lg">
              Looks Good! 
            </WegobyButton>
          </div>
          <p className="text-sm text-muted-foreground">
            Theme: <span className="capitalize">{theme}</span> • Motion: {motionLevel < 33 ? 'Calm' : motionLevel > 66 ? 'Dynamic' : 'Balanced'}
          </p>
        </div>
      </div>
    </div>
  );
}