import { PatternCell, VisualQuestion } from './visual-patterns';

export type QuestionType = 'visual' | 'number' | 'verbal';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  type: QuestionType;
  difficulty: Difficulty;
  promptKey: string; // i18n key
  options: string[] | PatternCell[]; // String for number/verbal, PatternCell[] for visual
  correctAnswer: number;
  renderSpec?: any; // For visual questions
  visualData?: {
    matrix?: (PatternCell | null)[][];
    sequence?: PatternCell[];
  };
}

// Average time per question type (in seconds)
export const AVERAGE_TIMES = {
  visual: 18,
  number: 14,
  verbal: 12,
};

// Generate diverse visual pattern questions
function generateVisualQuestions(): Question[] {
  const questions: Question[] = [];

  // Easy visual questions (4 questions)
  
  // Q1: Simple count progression (dots)
  questions.push({
    id: 1,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.countProgression',
    options: [
      { type: 'dots', count: 4 },
      { type: 'dots', count: 5 },
      { type: 'dots', count: 3 },
      { type: 'dots', count: 6 },
      { type: 'dots', count: 2 },
      { type: 'dots', count: 1 },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 1 },
        { type: 'dots', count: 2 },
        { type: 'dots', count: 3 },
      ],
    },
  });

  // Q2: Shape rotation
  questions.push({
    id: 2,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.shapeRotation',
    options: [
      { type: 'shape', shape: 'triangle', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 90, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 180, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', rotation: 90, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', rotation: 180, pattern: 'solid' },
      ],
    },
  });

  // Q3: Size progression
  questions.push({
    id: 3,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.sizeProgression',
    options: [
      { type: 'shape', shape: 'circle', size: 0.7, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.7, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.7, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      ],
    },
  });

  // Q4: Pattern fill progression
  questions.push({
    id: 4,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.patternFill',
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'square', pattern: 'empty' },
        { type: 'shape', shape: 'square', pattern: 'dotted' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
      ],
    },
  });

  // Medium visual questions (5 questions)

  // Q5: 3x3 matrix - shape transformation
  questions.push({
    id: 5,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.matrixShape',
    options: [
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'diamond', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'circle', pattern: 'solid' },
          { type: 'shape', shape: 'square', pattern: 'solid' },
          { type: 'shape', shape: 'triangle', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'circle', pattern: 'dotted' },
          { type: 'shape', shape: 'square', pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', pattern: 'dotted' },
        ],
        [
          { type: 'shape', shape: 'circle', pattern: 'empty' },
          { type: 'shape', shape: 'square', pattern: 'empty' },
          null,
        ],
      ],
    },
  });

  // Q6: Line progression sequence (minus → plus → asterisk → 8-pointed)
  // Pattern: 1 line (minus) → 2 lines (plus) → 4 lines (asterisk) → 8 lines
  questions.push({
    id: 6,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.arrowSequence',
    options: [
      { type: 'lines', count: 8 }, // 8-pointed star (correct answer - pattern doubles)
      { type: 'lines', count: 4 }, // Asterisk
      { type: 'lines', count: 3 }, // X pattern
      { type: 'lines', count: 2 }, // Plus
      { type: 'lines', count: 1 }, // Minus
      { type: 'lines', count: 6 }, // Wrong count
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'lines', count: 1 }, // Minus (horizontal line)
        { type: 'lines', count: 2 }, // Plus (horizontal + vertical)
        { type: 'lines', count: 4 }, // Asterisk (horizontal + vertical + 2 diagonals)
      ],
    },
  });

  // Q7: Complex matrix with size and pattern
  questions.push({
    id: 7,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.complexMatrix',
    options: [
      { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
          { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
          { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'square', size: 0.4, pattern: 'solid' },
          { type: 'shape', shape: 'square', size: 0.5, pattern: 'solid' },
          { type: 'shape', shape: 'square', size: 0.6, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'triangle', size: 0.4, pattern: 'solid' },
          { type: 'shape', shape: 'triangle', size: 0.5, pattern: 'solid' },
          null,
        ],
      ],
    },
  });

  // Q8: Alternating shapes
  questions.push({
    id: 8,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.alternatingShapes',
    options: [
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'square', pattern: 'solid' },
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
      ],
    },
  });

  // Q9: Diamond rotation progression
  questions.push({
    id: 9,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.diamondRotation',
    options: [
      { type: 'shape', shape: 'diamond', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', rotation: 90, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'diamond', rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', rotation: 45, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', rotation: 90, pattern: 'solid' },
      ],
    },
  });

  // Hard visual questions (3 questions)

  // Q10: Complex multi-attribute matrix
  questions.push({
    id: 10,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.complexMultiAttribute',
    options: [
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 180, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 270, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.5, rotation: 90, pattern: 'dotted' },
        { type: 'shape', shape: 'circle', size: 0.6, rotation: 180, pattern: 'empty' },
      ],
    },
  });

  // Q11: Advanced matrix with pattern transformation
  questions.push({
    id: 11,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.advancedMatrix',
    options: [
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'diamond', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'circle', pattern: 'solid' },
          { type: 'shape', shape: 'square', pattern: 'solid' },
          { type: 'shape', shape: 'triangle', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'square', pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', pattern: 'dotted' },
          { type: 'shape', shape: 'circle', pattern: 'dotted' },
        ],
        [
          { type: 'shape', shape: 'triangle', pattern: 'empty' },
          { type: 'shape', shape: 'circle', pattern: 'empty' },
          null,
        ],
      ],
    },
  });

  // Q12: Complex dots pattern
  questions.push({
    id: 12,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.complexDots',
    options: [
      { type: 'dots', count: 9 },
      { type: 'dots', count: 7 },
      { type: 'dots', count: 8 },
      { type: 'dots', count: 6 },
      { type: 'dots', count: 5 },
      { type: 'dots', count: 10 },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 1 },
        { type: 'dots', count: 4 },
        { type: 'dots', count: 7 },
      ],
    },
  });

  // Q13: 2x2 matrix with L-shapes and quarter-circles (like the image)
  questions.push({
    id: 13,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.lshapeMatrix',
    options: [
      { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'bottom-right', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'lshape', corner: 'bottom-right', pattern: 'solid' },
          { type: 'shape', shape: 'quartercircle', corner: 'bottom-right', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
          null, // Missing piece - should be quarter-circle in top-right
        ],
      ],
    },
  });

  // Q14: 2x2 matrix with alternating L-shapes
  questions.push({
    id: 14,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.lshapeAlternating',
    options: [
      { type: 'shape', shape: 'lshape', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'bottom-right', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
          { type: 'shape', shape: 'lshape', corner: 'top-left', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'lshape', corner: 'bottom-right', pattern: 'solid' },
          null, // Missing piece - should be L-shape in bottom-left
        ],
      ],
    },
  });

  // Q15: 2x2 matrix with quarter-circles rotating
  questions.push({
    id: 15,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.quartercircleMatrix',
    options: [
      { type: 'shape', shape: 'quartercircle', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'quartercircle', corner: 'bottom-right', pattern: 'solid' },
          { type: 'shape', shape: 'quartercircle', corner: 'bottom-left', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
          null, // Missing piece - should be quarter-circle in top-left
        ],
      ],
    },
  });

  return questions;
}

// Generate number sequence questions
function generateNumberQuestions(): Question[] {
  const questions: Question[] = [];

  // Easy (3 questions)
  // 2, 4, 6, 8, ?
  questions.push({
    id: 13,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.arithmetic1',
    options: ['10', '12', '14', '16'],
    correctAnswer: 0,
  });

  // 3, 6, 9, 12, ?
  questions.push({
    id: 14,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.arithmetic2',
    options: ['15', '18', '21', '24'],
    correctAnswer: 0,
  });

  // 2, 4, 8, 16, ?
  questions.push({
    id: 15,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.geometric1',
    options: ['32', '36', '40', '48'],
    correctAnswer: 0,
  });

  // Medium (3 questions)
  // 1, 4, 9, 16, ?
  questions.push({
    id: 16,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.squares',
    options: ['25', '30', '36', '49'],
    correctAnswer: 0,
  });

  // 1, 1, 2, 3, 5, 8, ?
  questions.push({
    id: 17,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.fibonacci',
    options: ['11', '12', '13', '14'],
    correctAnswer: 2,
  });

  // 3, 6, 12, 24, ?
  questions.push({
    id: 18,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.alternating',
    options: ['48', '54', '60', '72'],
    correctAnswer: 0,
  });

  // Hard (2 questions)
  // 2, 5, 11, 23, ?
  questions.push({
    id: 19,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.complex1',
    options: ['47', '53', '59', '61'],
    correctAnswer: 0,
  });

  // 12^3 = 1728 (if pattern is cubes: 8, 27, 64, 125, ?)
  // Actually: 2^3, 3^3, 4^3, 5^3, 6^3 = 216
  // Let's use: 1, 8, 27, 64, ?
  questions.push({
    id: 20,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.complex2',
    options: ['125', '216', '343', '512'],
    correctAnswer: 0,
  });

  return questions;
}

// Generate verbal reasoning questions
function generateVerbalQuestions(): Question[] {
  const questions: Question[] = [];

  questions.push({
    id: 21,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.synonym1',
    options: ['verbal.synonym1.option1', 'verbal.synonym1.option2', 'verbal.synonym1.option3', 'verbal.synonym1.option4'],
    correctAnswer: 2,
  });

  questions.push({
    id: 22,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.logic1',
    options: ['verbal.logic1.option1', 'verbal.logic1.option2', 'verbal.logic1.option3', 'verbal.logic1.option4'],
    correctAnswer: 3,
  });

  questions.push({
    id: 23,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.antonym1',
    options: ['verbal.antonym1.option1', 'verbal.antonym1.option2', 'verbal.antonym1.option3', 'verbal.antonym1.option4'],
    correctAnswer: 1,
  });

  questions.push({
    id: 24,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.knowledge1',
    options: ['6', '8', '10', '12'], // Numbers don't need translation
    correctAnswer: 0,
  });

  questions.push({
    id: 25,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy1',
    options: ['verbal.analogy1.option1', 'verbal.analogy1.option2', 'verbal.analogy1.option3', 'verbal.analogy1.option4'],
    correctAnswer: 0,
  });

  return questions;
}

// Generate all questions
export function generateAllQuestions(): Question[] {
  const visual = generateVisualQuestions();
  const number = generateNumberQuestions();
  const verbal = generateVerbalQuestions();
  
  // Shuffle questions but maintain some difficulty progression
  const all = [...visual, ...number, ...verbal];
  
  // Sort by difficulty first, then shuffle within difficulty groups
  const easy = all.filter(q => q.difficulty === 'easy');
  const medium = all.filter(q => q.difficulty === 'medium');
  const hard = all.filter(q => q.difficulty === 'hard');
  
  // Simple shuffle
  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  return [...shuffle(easy), ...shuffle(medium), ...shuffle(hard)];
}
