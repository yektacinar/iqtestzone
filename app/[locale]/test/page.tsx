'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { questions, Question } from '@/lib/questions';
import { PatternCellComponent } from '@/lib/visual-patterns';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';
import { useQuizNavigationGuard } from '@/lib/navigation-guard';

const TOTAL_TIME = 7 * 60; // 7 minutes in seconds

export default function TestPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);
  
  // Use navigation guard for route-level protection
  useQuizNavigationGuard(locale);
  
  // Check if gender step was completed
  useEffect(() => {
    const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
    if (genderStepCompleted !== 'true') {
      // Redirect to gender step if not completed
      router.push(`/${locale}/gender`);
    }
  }, [router, locale]);
  
  const [genderStepChecked, setGenderStepChecked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // answers[questionId] = selectedIndex
  const [timeSpentByQuestionId, setTimeSpentByQuestionId] = useState<Record<number, number>>({}); // timeSpentByQuestionId[questionId] = timeSpentMs
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizStartedAt] = useState(Date.now()); // Track when quiz starts
  const [initialSelection, setInitialSelection] = useState<number | null>(null);
  const shownAtRef = useRef<number>(Date.now()); // Stable ref: when current question was shown (milliseconds)
  // Load sound preference from sessionStorage or default to true
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('soundEnabled');
      return stored !== null ? stored === 'true' : true;
    }
    return true;
  });
  const audioContextRef = useRef<AudioContext | null>(null);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {
          // Ignore errors during cleanup
        });
      }
    };
  }, []);

  // Check if gender step was completed before allowing test to start
  useEffect(() => {
    const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
    if (genderStepCompleted !== 'true') {
      // Redirect to gender step if not completed
      router.replace(`/${locale}/gender`);
      return;
    }
    setGenderStepChecked(true);
  }, [router, locale]);

  // Reset question timer when question changes (when question is displayed/rendered)
  useEffect(() => {
    shownAtRef.current = Date.now(); // Set shownAtRef when question is displayed
    setInitialSelection(null);
  }, [currentQuestion]);

  const handleFinish = useCallback((finalAnswers?: Record<number, number>, finalTimeSpent?: Record<number, number>) => {
    const timeSpent = Math.floor((Date.now() - quizStartedAt) / 1000);
    const finalAnswersToUse = finalAnswers || answers;
    const finalTimeSpentToUse = finalTimeSpent || timeSpentByQuestionId;
    
    // Generate or retrieve sessionId for premium access tracking
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      // Generate a unique sessionId
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    
    // Mark test as completed
    sessionStorage.setItem('testCompleted', 'true');
    
    // Store results in sessionStorage (persist timing data until results screen)
    // answers[questionId] = selectedIndex
    // timeSpentByQuestionId[questionId] = timeSpentMs
    sessionStorage.setItem('testAnswers', JSON.stringify(finalAnswersToUse));
    sessionStorage.setItem('timeSpentByQuestionId', JSON.stringify(finalTimeSpentToUse));
    sessionStorage.setItem('timeSpent', timeSpent.toString());
    sessionStorage.setItem('quizStartedAt', quizStartedAt.toString());
    
    router.push(`/${locale}/result-lock`);
  }, [quizStartedAt, answers, timeSpentByQuestionId, router, locale]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinish]);

  // Play subtle audio feedback for answer selection
  const playAnswerSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      // Use Web Audio API for subtle "blip" sound
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Subtle, pleasant tone (800Hz, very short duration) - selection sound
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      // Very low volume (0.05 = 5% volume)
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio is not available (e.g., autoplay restrictions)
      console.debug('Audio feedback not available:', error);
    }
  }, [soundEnabled]);

  // Play confirmation sound for Next button
  const playNextSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      // Use Web Audio API for subtle confirmation sound
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Slightly different tone (600Hz) for Next button - confirmation sound
      // Slightly longer duration (150ms) to feel like "confirm/continue"
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      // Very low volume (0.05 = 5% volume)
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      // Silently fail if audio is not available
      console.debug('Audio feedback not available:', error);
    }
  }, [soundEnabled]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (initialSelection === null) {
      setInitialSelection(answerIndex);
    }
    setSelectedAnswer(answerIndex);
    playAnswerSound();
  };

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;

    // Play Next button confirmation sound
    playNextSound();

    const question = questions[currentQuestion];
    if (!question) return;
    
    // Compute timeSpentMs = Date.now() - shownAtRef.current (in milliseconds)
    const timeSpentMs = Date.now() - shownAtRef.current;
    
    // Store answer by questionId: answers[questionId] = selectedIndex (no overwrites)
    const newAnswers = { ...answers, [question.id]: selectedAnswer };
    
    // Store timeSpent by questionId: timeSpentByQuestionId[questionId] = timeSpentMs
    const newTimeSpent = { ...timeSpentByQuestionId, [question.id]: timeSpentMs };
    
    setAnswers(newAnswers);
    setTimeSpentByQuestionId(newTimeSpent);
    
    // CRITICAL: Save answers to sessionStorage immediately so QuizHeader can detect quiz progress
    sessionStorage.setItem('testAnswers', JSON.stringify(newAnswers));
    sessionStorage.setItem('timeSpentByQuestionId', JSON.stringify(newTimeSpent));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setInitialSelection(null);
    } else {
      handleFinish(newAnswers, newTimeSpent);
    }
  }, [selectedAnswer, answers, timeSpentByQuestionId, currentQuestion, handleFinish, playNextSound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  if (!question) return null;

  // Show loading state until translations are loaded and gender step is checked
  if (!t || !t.test || !genderStepChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render question based on type
  const renderQuestion = () => {
    const q = question as any; // Type assertion for flexibility
    
    if (q.type === 'visual' && q.visualData) {
      if (q.visualData.matrix) {
        return (
          <div className="mb-8" style={{ cursor: 'default' }}>
            <div className="text-center mb-4">
              <p 
                className="text-sm text-gray-500 mb-2"
                style={{ 
                  cursor: 'default',
                  caretColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {t.test?.selectAnswer || 'Select the missing piece'}
              </p>
            </div>
            <div className="flex justify-center">
              <div className={`grid gap-3 ${q.visualData.matrix.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {q.visualData.matrix.flat().map((cell: any, idx: number) => (
                  <div
                    key={idx}
                    className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200"
                  >
                    {cell ? (
                      <PatternCellComponent cell={cell} size={80} />
                    ) : (
                      <div className="text-gray-400 text-2xl font-bold">?</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (q.visualData.sequence) {
        return (
          <div className="mb-8" style={{ cursor: 'default' }}>
            <div className="text-center mb-4">
              <p 
                className="text-sm text-gray-500 mb-2"
                style={{ 
                  cursor: 'default',
                  caretColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {t.test?.selectSequence || 'Select the continuation'}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              {q.visualData.sequence.map((cell: any, idx: number) => (
                <div
                  key={idx}
                  className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200"
                >
                  <PatternCellComponent cell={cell} size={80} />
                </div>
              ))}
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-gray-400 text-2xl font-bold">?</div>
              </div>
            </div>
          </div>
        );
      }
    } else if (q.type === 'number' || q.type === 'verbal') {
      // Get prompt from translations
      const promptKey = q.promptKey;
      const testTranslations = t.test as any;
      const prompt = testTranslations?.[promptKey] || promptKey || 'What comes next?';
      
      return (
        <div 
          className="mb-8 text-center"
          style={{ cursor: 'default' }}
        >
          <h2 
            className="text-lg font-medium text-gray-800 mb-6"
            style={{ 
              cursor: 'default',
              caretColor: 'transparent',
              userSelect: 'none'
            }}
          >
            {prompt}
          </h2>
        </div>
      );
    }
    return null;
  };

  // Render answer options
  const renderOptions = () => {
    const q = question as any;
    
    if (q.type === 'visual') {
      const options = q.options as any[];
      if (!options || options.length === 0) return null;
      
      return (
        <div className={`grid gap-4 grid-cols-3`}>
          {options.map((option: any, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => handleAnswerSelect(index)}
              className={`
                relative w-full aspect-square flex items-center justify-center
                rounded-lg border-2 transition-all duration-200
                bg-white hover:bg-gray-50 cursor-pointer select-none
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                ${selectedAnswer === index
                  ? 'border-gray-900 bg-gray-50 scale-105 shadow-md ring-2 ring-gray-900 ring-opacity-20'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              style={{ caretColor: 'transparent', userSelect: 'none' }}
            >
              <PatternCellComponent cell={option} size={100} />
              {selectedAnswer === index && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      );
    } else {
      // Number or verbal - text options
      const options = q.options as string[];
      if (!options || options.length === 0) return null;
      
      // Get translations for options if they are translation keys
      // Ensure t.test exists and is an object
      if (!t || !t.test) {
        return <div className="text-center text-gray-500">Loading translations...</div>;
      }
      
      const testTranslations = t.test as Record<string, string>;
      
      // Helper function to get translation
      const getTranslation = (key: string): string => {
        // Numbers don't need translation (e.g., '6', '8', '10', '12')
        if (!key.includes('.')) return key;
        
        // Access translation directly from testTranslations object
        const translation = testTranslations[key];
        
        // Return translation if found and is a non-empty string
        if (translation && typeof translation === 'string' && translation.trim().length > 0) {
          return translation;
        }
        
        // Fallback: return the key if translation not found
        // This should not happen if translations are properly loaded
        return key;
      };
      
      return (
        <div className="space-y-3">
          {options.map((option: string, index: number) => {
            const translatedOption = getTranslation(option);
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                  cursor-pointer select-none
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                  ${selectedAnswer === index
                    ? 'border-gray-900 bg-gray-50 font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                style={{ 
                  caretColor: 'transparent', 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
              >
                <span 
                  className="pointer-events-none select-none" 
                  style={{ 
                    caretColor: 'transparent',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                >
                  {translatedOption}
                </span>
              </button>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 -mt-16 pt-24">
      <div className="w-full max-w-4xl px-4">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium text-gray-600">
              {t.test.question} {currentQuestion + 1} {t.test.of} {questions.length}
            </div>
            <div className="flex items-center gap-4">
              {/* Mute Toggle */}
              <button
                type="button"
                onClick={() => {
                  const newValue = !soundEnabled;
                  setSoundEnabled(newValue);
                  // Persist preference in sessionStorage
                  sessionStorage.setItem('soundEnabled', String(newValue));
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                style={{ 
                  caretColor: 'transparent', 
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
                aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
                title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              >
                {soundEnabled ? (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gray-900 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Display Area */}
        <div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6"
          style={{ cursor: 'default' }}
        >
          {renderQuestion()}
        </div>

        {/* Answer Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {renderOptions()}
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`
              px-12 py-3 rounded-lg font-semibold text-base
              transition-all duration-200 select-none
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
              ${selectedAnswer !== null
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            style={{ 
              caretColor: 'transparent', 
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            <span 
              className="pointer-events-none select-none"
              style={{ 
                caretColor: 'transparent',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              {currentQuestion < questions.length - 1 ? t.test.next : t.test.finish}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
