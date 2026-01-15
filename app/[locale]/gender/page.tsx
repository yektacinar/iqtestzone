'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';
import { useQuizNavigationGuard } from '@/lib/navigation-guard';

export default function GenderPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  
  // Use navigation guard for route-level protection
  useQuizNavigationGuard(locale);

  const handleContinue = () => {
    // Store gender in sessionStorage (or empty string if skipped)
    if (selectedGender) {
      sessionStorage.setItem('userGender', selectedGender);
    } else {
      sessionStorage.setItem('userGender', '');
    }
    
    // Mark gender step as completed
    sessionStorage.setItem('genderStepCompleted', 'true');
    
    // Redirect to test
    router.push(`/${locale}/test`);
  };

  const handleSkip = () => {
    // Store empty string for skipped
    sessionStorage.setItem('userGender', '');
    sessionStorage.setItem('genderStepCompleted', 'true');
    
    // Redirect to test
    router.push(`/${locale}/test`);
  };

  // Show loading state until translations are loaded
  if (!t || !t.gender) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="w-full max-w-2xl px-4">
        {/* Gender Selection Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {t.gender.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedGender('male')}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${selectedGender === 'male'
                  ? 'border-gray-900 bg-gray-50 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {t.gender.male}
            </button>
            
            <button
              onClick={() => setSelectedGender('female')}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${selectedGender === 'female'
                  ? 'border-gray-900 bg-gray-50 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {t.gender.female}
            </button>
            
            <button
              onClick={() => setSelectedGender('prefer_not_to_say')}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${selectedGender === 'prefer_not_to_say'
                  ? 'border-gray-900 bg-gray-50 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {t.gender.preferNotToSay}
            </button>
          </div>

          {/* Explanatory Text */}
          <p className="text-sm text-gray-500 text-center mb-6">
            {t.gender.explanation}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSkip}
              className="px-8 py-3 rounded-lg font-semibold text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.gender.skip}
            </button>
            
            <button
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg font-semibold text-base bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              {t.gender.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
