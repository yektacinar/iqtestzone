'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

interface AdModalProps {
  locale: Locale;
  onComplete: () => void;
  onClose: () => void;
}

const AD_DURATION = 15; // 15 seconds

export default function AdModal({ locale, onComplete, onClose }: AdModalProps) {
  const t = useTranslations(locale);
  const [timeRemaining, setTimeRemaining] = useState(AD_DURATION);
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
      setProgress((prev) => {
        const newProgress = ((AD_DURATION - timeRemaining + 1) / AD_DURATION) * 100;
        return newProgress;
      });
    }, 1000);

    // Allow skip after 5 seconds
    setTimeout(() => {
      setCanSkip(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [onComplete, timeRemaining]);

  const handleSkip = () => {
    if (canSkip) {
      onComplete();
    }
  };

  // Use fallback values if translations aren't loaded
  const watchAdText = t?.resultLock?.watchAd || 'Watch Ad to Reveal Your Basic Result';
  const adPlayingText = t?.resultLock?.adPlaying || 'Video Playing...';
  const adProgressText = t?.resultLock?.adProgress || 'Video is playing automatically...';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{watchAdText}</h3>
          {canSkip && (
            <button
              onClick={handleSkip}
              className="text-sm text-gray-300 hover:text-white underline"
            >
              Skip
            </button>
          )}
        </div>

        {/* Mock Video Player */}
        <div className="relative bg-gray-900 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-sm opacity-75">{adPlayingText}</p>
              <p className="text-xs opacity-50 mt-2">{timeRemaining}s remaining</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-white transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50">
          <p className="text-xs text-gray-500 text-center mb-2">
            {adProgressText}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
