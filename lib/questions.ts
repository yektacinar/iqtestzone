import { Question, AVERAGE_TIMES } from './question-generator';
import { calculateSpeedComparison } from './integrity-detector';
import { selectTestQuestions } from './question-bank';
import { computeScore, computeIntegrity } from './scoring';

export type { Question };
export { AVERAGE_TIMES };

// Select exactly 25 questions with progressive difficulty for each test
// IMPORTANT: This is computed once and cached to ensure consistency
// The questions array MUST be the same across all module loads
let cachedQuestions: Question[] | null = null;

export function getQuestions(): Question[] {
  if (!cachedQuestions) {
    cachedQuestions = selectTestQuestions();
    // Debug: Log question IDs to verify consistency
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[DEBUG] Questions loaded:', cachedQuestions.map(q => q.id));
    }
  }
  return cachedQuestions;
}

export const questions: Question[] = getQuestions();

export interface IQResult {
  score: number;
  range: string;
  description: string; // Deprecated: use descriptionKey instead
  descriptionKey: string; // Translation key for localized description
  cognitiveBreakdown: {
    patternRecognition: number;
    abstractReasoning: number;
    complexAnalysis: number;
    overallAccuracy: number;
    visualAccuracy: number;
    numberAccuracy: number;
    verbalAccuracy: number;
  };
  integrity: {
    score: number;
    warnings: string[];
    shouldShowWarning: boolean;
    fastCount?: number;
    medianTimeMs?: number;
    avgTimeMs?: number;
    sameOptionRatio?: number;
    answeredCount?: number;
    integrityLow?: boolean;
  };
  speedComparison: {
    percentage: number;
    message: string;
  };
  _debug?: {
    userScore: number;
    maxScore: number;
    scoreRatio: number;
    correctCount: number;
    iqRange: string;
    avgTimeMs: number;
    medianTimeMs: number;
    fastCount: number;
    sameOptionRatio: number;
    integrityLow: boolean;
    answeredCount: number;
  };
}

export function calculateIQScore(
  answers: Record<number, number> | number[], // Support both old array format and new object format
  timeSpent: number,
  timeSpentByQuestionId?: Record<number, number> // New format: timeSpentByQuestionId[questionId] = timeSpentMs
): IQResult {
  // Get questions (use cached version for consistency)
  const questions = getQuestions();
  
  // Convert old array format to new object format if needed
  let answersObj: Record<number, number>;
  if (Array.isArray(answers)) {
    // Legacy format: convert array to object
    answersObj = {};
    questions.forEach((q, index) => {
      if (answers[index] !== undefined && answers[index] !== null) {
        answersObj[q.id] = answers[index];
      }
    });
  } else {
    answersObj = answers;
  }
  
  // Use pure scoring module
  const scoreResult = computeScore(questions, answersObj);
  
  // Calculate integrity if timeSpentByQuestionId is provided
  let integrityResult;
  if (timeSpentByQuestionId) {
    integrityResult = computeIntegrity(answersObj, timeSpentByQuestionId);
  } else {
    // Fallback: create empty integrity result
    integrityResult = {
      avgTimeMs: 0,
      medianTimeMs: 0,
      fastCount: 0,
      sameOptionRatio: 0,
      integrityLow: false,
      answeredCount: Object.keys(answersObj).length,
    };
  }
  
  // Map scoreRatio to IQ ranges and calculate final score
  let range: string = scoreResult.iqRange;
  let descriptionKey: string;
  let finalScore: number;
  
  const scoreRatio = scoreResult.scoreRatio;
  if (scoreRatio < 0.30) {
    finalScore = Math.round(70 + (scoreRatio / 0.30) * 19);
    descriptionKey = 'result.iqDescription70_89';
  } else if (scoreRatio < 0.45) {
    finalScore = Math.round(90 + ((scoreRatio - 0.30) / 0.15) * 9);
    descriptionKey = 'result.iqDescription90_99';
  } else if (scoreRatio < 0.60) {
    finalScore = Math.round(100 + ((scoreRatio - 0.45) / 0.15) * 9);
    descriptionKey = 'result.iqDescription100_109';
  } else if (scoreRatio < 0.75) {
    finalScore = Math.round(110 + ((scoreRatio - 0.60) / 0.15) * 9);
    descriptionKey = 'result.iqDescription110_119';
  } else if (scoreRatio < 0.88) {
    finalScore = Math.round(120 + ((scoreRatio - 0.75) / 0.13) * 9);
    descriptionKey = 'result.iqDescription120_129';
  } else {
    finalScore = Math.round(130 + Math.min(20, (scoreRatio - 0.88) / 0.12 * 20));
    descriptionKey = 'result.iqDescription130_plus';
  }
  
  // Ensure finalScore is within reasonable bounds
  finalScore = Math.max(70, Math.min(150, finalScore));
  
  // Calculate cognitive breakdown (for backward compatibility)
  const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
  const difficultyScores = { easy: 0, medium: 0, hard: 0 };
  const difficultyTotals = { easy: 0, medium: 0, hard: 0 };
  const typeScores = { visual: 0, number: 0, verbal: 0 };
  const typeTotals = { visual: 0, number: 0, verbal: 0 };
  
  questions.forEach(question => {
    const weight = difficultyWeights[question.difficulty] || 1;
    difficultyTotals[question.difficulty]++;
    typeTotals[question.type]++;
    
    const selectedIndex = answersObj[question.id];
    if (selectedIndex !== undefined && selectedIndex === question.correctAnswer) {
      difficultyScores[question.difficulty]++;
      typeScores[question.type]++;
    }
  });
  
  const totalCorrect = difficultyScores.easy + difficultyScores.medium + difficultyScores.hard;
  
  const cognitiveBreakdown = {
    patternRecognition: Math.round((difficultyScores.easy / Math.max(difficultyTotals.easy, 1)) * 100),
    abstractReasoning: Math.round((difficultyScores.medium / Math.max(difficultyTotals.medium, 1)) * 100),
    complexAnalysis: Math.round((difficultyScores.hard / Math.max(difficultyTotals.hard, 1)) * 100),
    overallAccuracy: Math.round((totalCorrect / questions.length) * 100),
    visualAccuracy: Math.round((typeScores.visual / Math.max(typeTotals.visual, 1)) * 100),
    numberAccuracy: Math.round((typeScores.number / Math.max(typeTotals.number, 1)) * 100),
    verbalAccuracy: Math.round((typeScores.verbal / Math.max(typeTotals.verbal, 1)) * 100),
  };
  
  // Format integrity for backward compatibility
  const integrity = {
    score: integrityResult.integrityLow ? 20 : 100,
    warnings: integrityResult.integrityLow ? ['Answers were extremely fast or repetitive'] : [],
    shouldShowWarning: integrityResult.integrityLow,
    // Include debug metrics
    fastCount: integrityResult.fastCount,
    medianTimeMs: integrityResult.medianTimeMs,
    avgTimeMs: integrityResult.avgTimeMs,
    sameOptionRatio: integrityResult.sameOptionRatio,
    answeredCount: integrityResult.answeredCount,
    integrityLow: integrityResult.integrityLow,
  };
  
  // Calculate speed comparison (placeholder for now)
  const speedComparison = {
    percentage: 0,
    message: 'similar speed',
  };
  
  return {
    score: finalScore,
    range,
    description: '', // Deprecated: kept for backward compatibility
    descriptionKey,
    cognitiveBreakdown,
    integrity,
    speedComparison,
    // Include raw scoring data for debug panel
    _debug: {
      userScore: scoreResult.userScore,
      maxScore: scoreResult.maxScore,
      scoreRatio: scoreResult.scoreRatio,
      correctCount: scoreResult.correctCount,
      iqRange: scoreResult.iqRange,
      avgTimeMs: integrityResult.avgTimeMs,
      medianTimeMs: integrityResult.medianTimeMs,
      fastCount: integrityResult.fastCount,
      sameOptionRatio: integrityResult.sameOptionRatio,
      integrityLow: integrityResult.integrityLow,
      answeredCount: integrityResult.answeredCount,
    },
  };
}
