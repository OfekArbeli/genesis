import React, { useState } from 'react';
import { WegobyButton } from './wegoby-button';
import { TagSelector } from './tag-selector';
import { Progress } from './ui/progress';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingData {
  storyPace: string;
  readingBreakers: string[];
  readingMotivation: string;
  distanceFromReality: string;
}

interface ToReadOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export function ToReadOnboarding({ onComplete, onBack }: ToReadOnboardingProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    storyPace: 'Slowly and gradually',
    readingBreakers: ['Too much tension'],
    readingMotivation: 'Connecting with characters',
    distanceFromReality: 'Somewhere in between',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const storyPaceOptions = [
    'Slowly and gradually',
    'Faster, straight into the action',
    'Depends on the story'
  ];

  const readingBreakersOptions = [
    'Too much tension',
    'Too much information too fast',
    'Long conversations with no direction',
    'Stories that don\'t feel emotional',
    'Nothing really breaks it'
  ];

  const readingMotivationOptions = [
    'Connecting with characters',
    'Exploring ideas',
    'Using imagination',
    'Just relaxing and flowing'
  ];

  const distanceOptions = [
    'Staying close to reality',
    'Going far into imagination',
    'Somewhere in between'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return true; // Has default
      case 2: return data.readingBreakers.length > 0 && data.readingBreakers.length <= 2;
      case 3: return true; // Has default
      case 4: return true; // Has default
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">to-read Setup</h1>
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card p-8 rounded-2xl shadow-lg border border-light-purple/20 backdrop-blur-sm"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">How do you like stories to unfold?</h2>
                </div>
                <div className="grid gap-4">
                  {storyPaceOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setData({ ...data, storyPace: option })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        data.storyPace === option
                          ? 'border-light-purple bg-purple-50 dark:bg-purple-900/20'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-light-purple/50'
                      }`}
                    >
                      <div className="font-medium">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">What usually breaks your reading flow?</h2>
                  <p className="text-sm text-muted-foreground">Select up to 2</p>
                </div>
                <TagSelector
                  options={readingBreakersOptions}
                  selected={data.readingBreakers}
                  onChange={(breakers) => {
                    if (breakers.length <= 2) {
                      setData({ ...data, readingBreakers: breakers });
                    }
                  }}
                  multiple
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">When you read, what matters most to you?</h2>
                </div>
                <div className="grid gap-4">
                  {readingMotivationOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setData({ ...data, readingMotivation: option })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        data.readingMotivation === option
                          ? 'border-light-purple bg-purple-50 dark:bg-purple-900/20'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-light-purple/50'
                      }`}
                    >
                      <div className="font-medium">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">When you enter a story, what feels more natural?</h2>
                </div>
                <div className="grid gap-4">
                  {distanceOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setData({ ...data, distanceFromReality: option })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        data.distanceFromReality === option
                          ? 'border-light-purple bg-purple-50 dark:bg-purple-900/20'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-light-purple/50'
                      }`}
                    >
                      <div className="font-medium">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <WegobyButton
                variant="secondary"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </WegobyButton>
              <WegobyButton
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1"
              >
                {step === totalSteps ? 'Complete' : 'Next'}
              </WegobyButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
