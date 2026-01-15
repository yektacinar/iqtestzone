'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions, Question } from '@/lib/questions';
import { PatternCellComponent, PatternCell } from '@/lib/visual-patterns';

const TOTAL_TIME = 7 * 60; // 7 minutes in seconds

export default function TestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startTime] = useState(Date.now());

  const handleFinish = useCallback((finalAnswers?: number[]) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const finalAnswersToUse = finalAnswers || answers;
    
    // Store results in sessionStorage
    sessionStorage.setItem('testAnswers', JSON.stringify(finalAnswersToUse));
    sessionStorage.setItem('timeSpent', timeSpent.toString());
    
    router.push('/result-lock');
  }, [startTime, answers, router]);

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

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish(newAnswers);
    }
  }, [selectedAnswer, answers, currentQuestion, handleFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const numOptions = question.options.length;

  return (
    <div className="bg-gray-50 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl px-4">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium text-gray-600">
              Soru {currentQuestion + 1} / {questions.length}
            </div>
            <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gray-900 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Display Area - Centered and Focused */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          {question.type === 'visual' && question.visualData?.matrix && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-2">Aşağıdaki desende eksik parçayı seçin</p>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-3">
                  {question.visualData.matrix.flat().map((cell, idx) => (
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
          )}

          {question.type === 'visual' && question.visualData?.sequence && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-2">Desenin devamını seçin</p>
              </div>
              <div className="flex justify-center gap-4">
                {question.visualData.sequence.map((cell, idx) => (
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
          )}
        </div>

        {/* Answer Grid - 2x3 or 3x3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className={`grid gap-4 ${numOptions <= 6 ? 'grid-cols-3' : 'grid-cols-3'}`}>
            {question.options.map((option, index) => {
              const isPatternCell = question.type === 'visual' && typeof option !== 'string';
              return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  relative w-full aspect-square flex items-center justify-center
                  rounded-lg border-2 transition-all duration-200
                  bg-white hover:bg-gray-50
                  ${selectedAnswer === index
                    ? 'border-gray-900 bg-gray-50 scale-105 shadow-md ring-2 ring-gray-900 ring-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {isPatternCell ? (
                  <PatternCellComponent cell={option as PatternCell} size={100} />
                ) : (
                  <span className="text-lg font-semibold">{option as string}</span>
                )}
                {selectedAnswer === index && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
              );
            })}
          </div>
        </div>

        {/* Next Button - Centered */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`
              px-12 py-3 rounded-lg font-semibold text-base
              transition-all duration-200
              ${selectedAnswer !== null
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentQuestion < questions.length - 1 ? 'Sonraki' : 'Testi Bitir'}
          </button>
        </div>
      </div>
    </div>
  );
}
