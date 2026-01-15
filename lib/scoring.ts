import { Question } from './question-generator';

/**
 * Pure scoring module - no side effects
 * 
 * answers: Record<questionId, selectedIndex>
 * timeSpentByQuestionId: Record<questionId, timeSpentMs>
 */

export interface ScoreResult {
  userScore: number;
  maxScore: number;
  scoreRatio: number;
  iqRange: string;
  correctCount: number;
}

export interface IntegrityResult {
  avgTimeMs: number;
  medianTimeMs: number;
  fastCount: number;
  sameOptionRatio: number;
  integrityLow: boolean;
  answeredCount: number;
}

/**
 * Calculate median of an array of numbers
 */
function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Pure function to compute score from questions and answers
 * 
 * @param questions - Array of questions with unique IDs
 * @param answers - Object mapping questionId -> selectedIndex
 * @returns Score metrics
 */
export function computeScore(
  questions: Question[],
  answers: Record<number, number>
): ScoreResult {
  // Difficulty weights: easy=1, medium=2, hard=3
  const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
  
  let userScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  
  // Process each question
  for (const question of questions) {
    const weight = difficultyWeights[question.difficulty] || 1;
    maxScore += weight;
    
    const selectedIndex = answers[question.id];
    if (selectedIndex !== undefined && selectedIndex !== null) {
      const isCorrect = selectedIndex === question.correctAnswer;
      if (isCorrect) {
        userScore += weight;
        correctCount++;
      }
    }
  }
  
  // Calculate score ratio (0.0 to 1.0)
  const scoreRatio = maxScore > 0 ? userScore / maxScore : 0;
  
  // Map scoreRatio to IQ range
  let iqRange: string;
  if (scoreRatio < 0.30) {
    iqRange = '70-89';
  } else if (scoreRatio < 0.45) {
    iqRange = '90-99';
  } else if (scoreRatio < 0.60) {
    iqRange = '100-109';
  } else if (scoreRatio < 0.75) {
    iqRange = '110-119';
  } else if (scoreRatio < 0.88) {
    iqRange = '120-129';
  } else {
    iqRange = '130+';
  }
  
  return {
    userScore,
    maxScore,
    scoreRatio,
    iqRange,
    correctCount,
  };
}

/**
 * Pure function to compute integrity metrics
 * 
 * @param answers - Object mapping questionId -> selectedIndex
 * @param timeSpentByQuestionId - Object mapping questionId -> timeSpentMs
 * @returns Integrity metrics
 */
export function computeIntegrity(
  answers: Record<number, number>,
  timeSpentByQuestionId: Record<number, number>
): IntegrityResult {
  const answeredCount = Object.keys(answers).length;
  
  if (answeredCount === 0) {
    return {
      avgTimeMs: 0,
      medianTimeMs: 0,
      fastCount: 0,
      sameOptionRatio: 0,
      integrityLow: false,
      answeredCount: 0,
    };
  }
  
  // Extract time values (in milliseconds)
  const timeValues = Object.values(timeSpentByQuestionId).filter(ms => ms > 0);
  const avgTimeMs = timeValues.length > 0
    ? timeValues.reduce((sum, ms) => sum + ms, 0) / timeValues.length
    : 0;
  const medianTimeMs = calculateMedian(timeValues);
  
  // Count fast answers (< 1500ms)
  const fastCount = timeValues.filter(ms => ms < 1500).length;
  
  // Calculate same option ratio
  const optionCounts: Record<number, number> = {};
  Object.values(answers).forEach(selectedIndex => {
    optionCounts[selectedIndex] = (optionCounts[selectedIndex] || 0) + 1;
  });
  const maxOptionCount = Math.max(...Object.values(optionCounts));
  const sameOptionRatio = maxOptionCount / answeredCount;
  
  // Apply MANDATORY integrity rules
  let integrityLow = false;
  
  // Rule 1: If answered >= 15 and fastCount >= 8 => integrityLow true
  if (answeredCount >= 15 && fastCount >= 8) {
    integrityLow = true;
  }
  
  // Rule 2: OR medianTimeMs < 2000 and answered >= 12 => integrityLow true
  if (medianTimeMs < 2000 && answeredCount >= 12) {
    integrityLow = true;
  }
  
  // Rule 3: OR sameOptionRatio >= 0.70 and answered >= 10 => integrityLow true
  if (sameOptionRatio >= 0.70 && answeredCount >= 10) {
    integrityLow = true;
  }
  
  return {
    avgTimeMs: Math.round(avgTimeMs),
    medianTimeMs: Math.round(medianTimeMs),
    fastCount,
    sameOptionRatio: Math.round(sameOptionRatio * 100) / 100,
    integrityLow,
    answeredCount,
  };
}
