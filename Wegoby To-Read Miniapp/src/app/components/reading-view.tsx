import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';

interface ReadingViewProps {
  bookTitle: string;
  onBack: () => void;
  enableTranslation?: boolean;
}

export function ReadingView({ bookTitle, onBack, enableTranslation = false }: ReadingViewProps) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [lineSpacing, setLineSpacing] = useState([1.6]);
  const [translationPopup, setTranslationPopup] = useState<{
    word: string;
    translation: string;
    x: number;
    y: number;
  } | null>(null);

  const totalChapters = 12;
  const progress = (currentChapter / totalChapters) * 100;

  const sampleContent = {
    title: 'The Nature of Reality',
    content: `In the depths of space, where light bends and time flows differently, we find ourselves confronting questions that have puzzled humanity for millennia. What is the true nature of our reality?

The universe, in its infinite complexity, presents us with paradoxes that challenge our understanding. Dark matter weaves through the cosmos like invisible threads, holding galaxies together with a force we can measure but cannot see.

"We are made of star stuff," as Carl Sagan once said. Every atom in our bodies was forged in the heart of a dying star, scattered across space, and eventually coalesced into the consciousness reading these words.

The quantum realm offers even stranger mysteries. Particles exist in multiple states simultaneously until observed. Time itself becomes fluid at the boundaries of black holes. Reality, it seems, is far stranger than fiction.

Yet within this cosmic dance, patterns emerge. The same laws that govern the motion of planets also guide the behavior of atoms. Beauty and order arise from chaos, suggesting something profound about the nature of existence itself.`
  };

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  // Mock Hebrew translations
  const hebrewTranslations: Record<string, string> = {
    'space': 'חלל',
    'light': 'אור',
    'time': 'זמן',
    'reality': 'מציאות',
    'universe': 'יקום',
    'complexity': 'מורכבות',
    'paradoxes': 'פרדוקסים',
    'understanding': 'בנתה',
    'matter': 'חומר',
    'cosmos': 'קוסמוס',
    'galaxies': 'גלקסיות',
    'force': 'כוח',
    'star': 'כוכב',
    'atom': 'אטום',
    'bodies': 'גופים',
    'consciousness': 'תודעה',
    'quantum': 'קוונטי',
    'mysteries': 'תעלומות',
    'particles': 'חלקיקים',
    'states': 'מצבים',
    'observed': 'נצפה',
    'fluid': 'נוזל',
    'boundaries': 'גבולות',
    'fiction': 'בדיה',
    'dance': 'ריקוד',
    'patterns': 'דפוסים',
    'laws': 'חוקים',
    'planets': 'כוכבי לכת',
    'atoms': 'אטומים',
    'beauty': 'יופי',
    'order': 'סדר',
    'chaos': 'כאוס',
    'existence': 'קיום',
    'nature': 'טבע',
    'depths': 'עומקים'
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    if (!enableTranslation) return;
    
    // Remove punctuation
    const cleanWord = word.toLowerCase().replace(/[.,;:!?"']/g, '');
    const translation = hebrewTranslations[cleanWord];
    
    if (translation) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setTranslationPopup({
        word: cleanWord,
        translation,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium truncate max-w-md">{bookTitle}</h1>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Chapter {currentChapter} of {totalChapters}</span>
              <span className="font-mono">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border-b border-border"
          >
            <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Font Size</label>
                  <span className="text-sm text-muted-foreground font-mono">{fontSize[0]}px</span>
                </div>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={12}
                  max={24}
                  step={1}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Line Spacing</label>
                  <span className="text-sm text-muted-foreground font-mono">{lineSpacing[0].toFixed(1)}</span>
                </div>
                <Slider
                  value={lineSpacing}
                  onValueChange={setLineSpacing}
                  min={1.2}
                  max={2.4}
                  step={0.1}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          key={currentChapter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl mb-8">{sampleContent.title}</h2>
          
          <div
            className="prose dark:prose-invert max-w-none"
            style={{
              fontSize: `${fontSize[0]}px`,
              lineHeight: lineSpacing[0],
            }}
          >
            {sampleContent.content.split('\n\n').map((paragraph, index) => {
              // Check if paragraph is a quote
              if (paragraph.startsWith('"')) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-light-purple pl-4 italic my-6 text-muted-foreground"
                  >
                    {enableTranslation ? (
                      paragraph.split(' ').map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          className={cn(
                            enableTranslation && "hover:bg-light-purple/20 cursor-pointer rounded px-0.5 transition-colors"
                          )}
                          onClick={(e) => handleWordClick(e, word)}
                        >
                          {word}{' '}
                        </span>
                      ))
                    ) : (
                      paragraph
                    )}
                  </blockquote>
                );
              }
              return (
                <p key={index} className="mb-6">
                  {enableTranslation ? (
                    paragraph.split(' ').map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className={cn(
                          enableTranslation && "hover:bg-light-purple/20 cursor-pointer rounded px-0.5 transition-colors"
                        )}
                        onClick={(e) => handleWordClick(e, word)}
                      >
                        {word}{' '}
                      </span>
                    ))
                  ) : (
                    paragraph
                  )}
                </p>
              );
            })}
          </div>
        </motion.article>
      </div>

      {/* Translation Popup */}
      <AnimatePresence>
        {translationPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed z-50 bg-light-purple/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl"
            style={{
              left: translationPopup.x,
              top: translationPopup.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <button
              onClick={() => setTranslationPopup(null)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <X className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
            </button>
            <div className="text-sm font-medium mb-1">{translationPopup.word}</div>
            <div className="text-2xl font-bold" style={{ direction: 'rtl' }}>{translationPopup.translation}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}