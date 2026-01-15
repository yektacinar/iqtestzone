export interface AnswerData {
  questionId: number;
  questionType: 'visual' | 'number' | 'verbal';
  difficulty: 'easy' | 'medium' | 'hard';
  answerIndex: number;
  timeSpentMs: number; // in milliseconds
  wasCorrect: boolean;
  changedAnswer: boolean;
}

export interface IntegrityResult {
  score: number; // 0-100 (kept for backward compatibility)
  warnings: string[];
  shouldShowWarning: boolean;
  // Debug metrics (for dev mode)
  fastCount?: number;
  medianTimeMs?: number;
  avgTimeMs?: number;
  sameOptionRatio?: number;
  answeredCount?: number;
  integrityLow?: boolean;
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
 * Calculate integrity score using MANDATORY rules (no heuristic handwaving)
 * 
 * Rules:
 * - If fastCount >= 8 => integrityLow
 * - OR if medianTimeMs < 2000 AND answered >= 12 => integrityLow
 * - OR if avgTimeMs < 2500 AND answered >= 15 => integrityLow
 * - OR if sameOptionRatio >= 0.70 AND answered >= 10 => integrityLow
 */
export function calculateIntegrityScore(
  answers: AnswerData[],
  totalQuestions: number
): IntegrityResult {
  if (answers.length === 0) {
    return {
      score: 100,
      warnings: [],
      shouldShowWarning: false,
      fastCount: 0,
      medianTimeMs: 0,
      avgTimeMs: 0,
      sameOptionRatio: 0,
      answeredCount: 0,
      integrityLow: false,
    };
  }

  const answeredCount = answers.length;
  const warnings: string[] = [];
  
  // Convert timeSpentMs to array (handle both old format with timeSpent in seconds and new format)
  const timeSpentMsArray = answers.map(a => {
    // Support both old format (timeSpent in seconds) and new format (timeSpentMs in ms)
    if ('timeSpentMs' in a && typeof a.timeSpentMs === 'number') {
      return a.timeSpentMs;
    } else if ('timeSpent' in a && typeof a.timeSpent === 'number') {
      // Legacy: convert seconds to milliseconds
      return a.timeSpent * 1000;
    }
    return 0;
  });

  // 1. Compute integrity metrics
  const fastCount = timeSpentMsArray.filter(ms => ms < 1500).length;
  const medianTimeMs = calculateMedian(timeSpentMsArray);
  const avgTimeMs = timeSpentMsArray.reduce((sum, ms) => sum + ms, 0) / timeSpentMsArray.length;
  
  // 2. Calculate same option ratio
  const optionCounts: Record<number, number> = {};
  answers.forEach(a => {
    optionCounts[a.answerIndex] = (optionCounts[a.answerIndex] || 0) + 1;
  });
  const maxOptionCount = Math.max(...Object.values(optionCounts));
  const sameOptionRatio = maxOptionCount / answeredCount;

  // 3. Apply MANDATORY integrity decision rules
  let integrityLow = false;
  
  if (fastCount >= 8) {
    integrityLow = true;
    warnings.push('Too many questions answered extremely fast (likely random clicking)');
  }
  
  if (medianTimeMs < 2000 && answeredCount >= 12) {
    integrityLow = true;
    warnings.push('Median time per question is too low');
  }
  
  if (avgTimeMs < 2500 && answeredCount >= 15) {
    integrityLow = true;
    warnings.push('Average time per question is too low');
  }
  
  if (sameOptionRatio >= 0.70 && answeredCount >= 10) {
    integrityLow = true;
    warnings.push('Strong bias toward one answer option (likely random clicking)');
  }

  // Calculate score for backward compatibility (0-100, lower = worse)
  let score = 100;
  if (integrityLow) {
    score = 20; // Low score when integrity is low
  } else if (fastCount >= 5) {
    score = 50; // Medium-low score if many fast answers
  } else if (medianTimeMs < 3000 || avgTimeMs < 3500) {
    score = 60; // Medium score if somewhat fast
  }

  return {
    score,
    warnings,
    shouldShowWarning: integrityLow,
    fastCount,
    medianTimeMs: Math.round(medianTimeMs),
    avgTimeMs: Math.round(avgTimeMs),
    sameOptionRatio: Math.round(sameOptionRatio * 100) / 100,
    answeredCount,
    integrityLow,
  };
}

// Calculate speed comparison
export function calculateSpeedComparison(
  answers: AnswerData[]
): { percentage: number; message: string } {
  if (answers.length === 0) {
    return { percentage: 0, message: '' };
  }

  // Calculate average time per question type
  const typeTimes: Record<string, number[]> = {
    visual: [],
    number: [],
    verbal: [],
  };

  answers.forEach(a => {
    // Support both old format (timeSpent in seconds) and new format (timeSpentMs in ms)
    const timeInSeconds = 'timeSpentMs' in a && typeof a.timeSpentMs === 'number'
      ? a.timeSpentMs / 1000
      : ('timeSpent' in a && typeof a.timeSpent === 'number' ? a.timeSpent : 0);
    typeTimes[a.questionType].push(timeInSeconds);
  });

  // Calculate weighted average
  let totalWeightedTime = 0;
  let totalWeight = 0;

  Object.entries(typeTimes).forEach(([type, times]) => {
    if (times.length > 0) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const referenceTime = type === 'visual' ? 18 : type === 'number' ? 14 : 12;
      const weight = times.length;
      
      totalWeightedTime += avgTime * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) {
    return { percentage: 0, message: '' };
  }

  const userAvgTime = totalWeightedTime / totalWeight;
  
  // Calculate reference average (weighted)
  let totalReferenceTime = 0;
  let totalRefWeight = 0;
  
  Object.entries(typeTimes).forEach(([type, times]) => {
    if (times.length > 0) {
      const referenceTime = type === 'visual' ? 18 : type === 'number' ? 14 : 12;
      const weight = times.length;
      totalReferenceTime += referenceTime * weight;
      totalRefWeight += weight;
    }
  });

  const referenceAvgTime = totalReferenceTime / totalRefWeight;
  
  // Calculate percentage difference
  const timeDifference = referenceAvgTime - userAvgTime;
  const percentage = Math.round((timeDifference / referenceAvgTime) * 100);
  
  // Cap between -95% and 95% for believability
  const cappedPercentage = Math.max(-95, Math.min(95, percentage));
  
  let message = '';
  if (cappedPercentage > 5) {
    message = `faster`;
  } else if (cappedPercentage < -5) {
    message = `slower`;
  } else {
    message = `similar speed`;
  }

  return {
    percentage: Math.abs(cappedPercentage),
    message,
  };
}
