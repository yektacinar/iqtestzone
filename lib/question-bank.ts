import { PatternCell } from './visual-patterns';
import { Question, Difficulty } from './question-generator';

// Comprehensive IQ Test Question Bank
// 90 questions total, organized by difficulty and type
// Each test selects 25 questions with progressive difficulty

// Visual Pattern Questions (45 questions)
export const visualQuestions: Question[] = [
  // Easy Visual (15 questions) - Q1-Q15
  {
    id: 1,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.countProgression',
    options: [
      { type: 'dots', count: 4 }, // Correct: continues 1,2,3,4
      { type: 'dots', count: 5 }, // Distractor: too many
      { type: 'dots', count: 2 }, // Distractor: goes back
      { type: 'shape', shape: 'circle', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 6 }, // Distractor: too many
      { type: 'shape', shape: 'square', pattern: 'solid' }, // Distractor: different type
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 1 },
        { type: 'dots', count: 2 },
        { type: 'dots', count: 3 },
      ],
    },
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 5,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.shapeSequence',
    options: [
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
        { type: 'shape', shape: 'triangle', pattern: 'solid' },
      ],
    },
  },
  {
    id: 6,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.arrowSequence',
    options: [
      { type: 'lines', count: 8 }, // Correct: 8-pointed star (doubling pattern)
      { type: 'shape', shape: 'circle', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 4 }, // Distractor: different type
      { type: 'shape', shape: 'square', pattern: 'solid' }, // Distractor: different type
      { type: 'lines', count: 5 }, // Distractor: wrong count
      { type: 'shape', shape: 'triangle', pattern: 'solid' }, // Distractor: different type
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'lines', count: 1 }, // Minus
        { type: 'lines', count: 2 }, // Plus
        { type: 'lines', count: 4 }, // Asterisk
      ],
    },
  },
  {
    id: 7,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.matrixShape',
    options: [
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'diamond', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
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
  },
  {
    id: 8,
    type: 'visual',
    difficulty: 'easy',
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
  },
  {
    id: 9,
    type: 'visual',
    difficulty: 'easy',
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
  },
  {
    id: 10,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.dotPattern',
    options: [
      { type: 'dots', count: 5 }, // Correct: continues 2,3,4,5
      { type: 'dots', count: 3 }, // Distractor: goes back
      { type: 'shape', shape: 'circle', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 6 }, // Distractor: too many
      { type: 'shape', shape: 'square', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 1 }, // Distractor: too few
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 2 },
        { type: 'dots', count: 3 },
        { type: 'dots', count: 4 },
      ],
    },
  },
  {
    id: 11,
    type: 'visual',
    difficulty: 'easy',
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
          null,
        ],
      ],
    },
  },
  {
    id: 12,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.simpleMatrix',
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
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
  },
  {
    id: 13,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.colorProgression',
    options: [
      { type: 'shape', shape: 'circle', pattern: 'solid', color: '#000' },
      { type: 'shape', shape: 'circle', pattern: 'solid', color: '#666' },
      { type: 'shape', shape: 'square', pattern: 'solid', color: '#000' },
      { type: 'shape', shape: 'circle', pattern: 'empty', color: '#000' },
      { type: 'shape', shape: 'circle', pattern: 'dotted', color: '#000' },
      { type: 'shape', shape: 'triangle', pattern: 'solid', color: '#000' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', pattern: 'solid', color: '#ccc' },
        { type: 'shape', shape: 'circle', pattern: 'solid', color: '#999' },
        { type: 'shape', shape: 'circle', pattern: 'solid', color: '#666' },
      ],
    },
  },
  {
    id: 14,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.positionSequence',
    options: [
      { type: 'shape', shape: 'circle', size: 0.3, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.3, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.3, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', size: 0.3, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      ],
    },
  },
  {
    id: 15,
    type: 'visual',
    difficulty: 'easy',
    promptKey: 'visual.basicPattern',
    options: [
      { type: 'shape', shape: 'square', pattern: 'dotted' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'square', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'empty' },
        { type: 'shape', shape: 'square', pattern: 'dotted' },
      ],
    },
  },

  // Medium Visual (15 questions) - Q16-Q30
  {
    id: 16,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.complexMatrix',
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
  },
  {
    id: 17,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.multiAttribute',
    options: [
      { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.5, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.6, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.7, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'triangle', size: 0.4, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', size: 0.5, pattern: 'dotted' },
        { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'empty' },
      ],
    },
  },
  {
    id: 18,
    type: 'visual',
    difficulty: 'medium',
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
  },
  {
    id: 19,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.complexDots',
    options: [
      { type: 'dots', count: 10 }, // Correct: continues 1,4,7,10 (+3 pattern)
      { type: 'dots', count: 8 }, // Distractor: wrong increment
      { type: 'shape', shape: 'circle', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 6 }, // Distractor: goes back
      { type: 'shape', shape: 'square', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 13 }, // Distractor: too many
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 1 },
        { type: 'dots', count: 4 },
        { type: 'dots', count: 7 },
      ],
    },
  },
  {
    id: 20,
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
          null,
        ],
      ],
    },
  },
  {
    id: 21,
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
          null,
        ],
      ],
    },
  },
  {
    id: 22,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.rotationMatrix',
    options: [
      { type: 'shape', shape: 'square', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 45, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 180, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'square', rotation: 270, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'square', rotation: 180, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 270, pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 23,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.patternSequence',
    options: [
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', pattern: 'empty' },
        { type: 'shape', shape: 'circle', pattern: 'dotted' },
        { type: 'shape', shape: 'circle', pattern: 'solid' },
      ],
    },
  },
  {
    id: 24,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.sizeRotation',
    options: [
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.6, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.5, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 180, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'triangle', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', size: 0.5, rotation: 90, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', size: 0.6, rotation: 180, pattern: 'solid' },
      ],
    },
  },
  {
    id: 25,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.complexSequence',
    options: [
      { type: 'shape', shape: 'diamond', size: 0.6, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.5, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.6, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.6, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.6, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'diamond', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', size: 0.5, rotation: 45, pattern: 'dotted' },
        { type: 'shape', shape: 'diamond', size: 0.6, rotation: 90, pattern: 'empty' },
      ],
    },
  },
  {
    id: 26,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.matrixTransformation',
    options: [
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
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
          { type: 'shape', shape: 'square', pattern: 'solid' },
          { type: 'shape', shape: 'triangle', pattern: 'solid' },
          { type: 'shape', shape: 'circle', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'triangle', pattern: 'solid' },
          { type: 'shape', shape: 'circle', pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 27,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.alternatingPattern',
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
        { type: 'shape', shape: 'circle', pattern: 'solid' },
      ],
    },
  },
  {
    id: 28,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.progressiveSize',
    options: [
      { type: 'shape', shape: 'circle', size: 0.8, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.7, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.8, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.9, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.8, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
        { type: 'shape', shape: 'circle', size: 0.7, pattern: 'solid' },
      ],
    },
  },
  {
    id: 29,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.shapeProgression',
    options: [
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
        { type: 'shape', shape: 'triangle', pattern: 'solid' },
      ],
    },
  },
  {
    id: 30,
    type: 'visual',
    difficulty: 'medium',
    promptKey: 'visual.complexDots2',
    options: [
      { type: 'dots', count: 11 }, // Correct: continues 2,5,8,11 (+3 pattern)
      { type: 'dots', count: 9 }, // Distractor: wrong increment
      { type: 'shape', shape: 'triangle', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 7 }, // Distractor: goes back
      { type: 'shape', shape: 'diamond', pattern: 'solid' }, // Distractor: different type
      { type: 'dots', count: 14 }, // Distractor: too many
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 2 },
        { type: 'dots', count: 5 },
        { type: 'dots', count: 8 },
      ],
    },
  },

  // Hard Visual (15 questions) - Q31-Q45
  {
    id: 31,
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
  },
  {
    id: 32,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.advancedPattern',
    options: [
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.6, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.8, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'diamond', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', size: 0.5, rotation: 22.5, pattern: 'dotted' },
        { type: 'shape', shape: 'diamond', size: 0.6, rotation: 45, pattern: 'empty' },
      ],
    },
  },
  {
    id: 33,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.matrixLogic',
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
          { type: 'shape', shape: 'square', pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', pattern: 'empty' },
        ],
        [
          { type: 'shape', shape: 'square', pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', pattern: 'empty' },
          { type: 'shape', shape: 'circle', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'triangle', pattern: 'empty' },
          { type: 'shape', shape: 'circle', pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 34,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.complexRotation',
    options: [
      { type: 'shape', shape: 'triangle', rotation: 315, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 315, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 315, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 180, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', rotation: 45, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', rotation: 90, pattern: 'solid' },
      ],
    },
  },
  {
    id: 35,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.advancedSequence',
    options: [
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.6, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.8, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'diamond', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', size: 0.5, rotation: 45, pattern: 'dotted' },
        { type: 'shape', shape: 'diamond', size: 0.6, rotation: 90, pattern: 'empty' },
      ],
    },
  },
  // Add more hard visual questions...
  {
    id: 36,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.matrixAdvanced',
    options: [
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.7, pattern: 'solid' },
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
  },
  {
    id: 37,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.complexPattern',
    options: [
      { type: 'shape', shape: 'square', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.6, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.8, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'square', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'square', size: 0.5, rotation: 15, pattern: 'dotted' },
        { type: 'shape', shape: 'square', size: 0.6, rotation: 30, pattern: 'empty' },
      ],
    },
  },
  {
    id: 38,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.advancedDots',
    options: [
      { type: 'dots', count: 12 }, // Correct: continues 3,6,9,12 (+3 pattern)
      { type: 'dots', count: 10 }, // Distractor: wrong increment
      { type: 'shape', shape: 'circle', pattern: 'dotted' }, // Distractor: different type
      { type: 'dots', count: 8 }, // Distractor: goes back
      { type: 'shape', shape: 'square', pattern: 'dotted' }, // Distractor: different type
      { type: 'dots', count: 15 }, // Distractor: too many
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'dots', count: 3 },
        { type: 'dots', count: 6 },
        { type: 'dots', count: 9 },
      ],
    },
  },
  {
    id: 39,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.matrixComplex',
    options: [
      { type: 'shape', shape: 'diamond', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'diamond', rotation: 90, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 45, pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'diamond', rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 30, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 60, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'diamond', rotation: 90, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 120, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 150, pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'diamond', rotation: 180, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 210, pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 40,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.ultimateMatrix',
    options: [
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.6, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.8, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 180, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'triangle', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'triangle', size: 0.5, rotation: 90, pattern: 'dotted' },
        { type: 'shape', shape: 'triangle', size: 0.6, rotation: 180, pattern: 'empty' },
      ],
    },
  },
  {
    id: 41,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.complexLshape',
    options: [
      { type: 'shape', shape: 'lshape', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'bottom-right', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'lshape', corner: 'bottom-right', pattern: 'solid' },
          { type: 'shape', shape: 'lshape', corner: 'bottom-left', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'lshape', corner: 'top-right', pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 42,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.advancedQuarter',
    options: [
      { type: 'shape', shape: 'quartercircle', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'bottom-right', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-left', pattern: 'solid' },
      { type: 'shape', shape: 'lshape', corner: 'bottom-left', pattern: 'solid' },
      { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'quartercircle', corner: 'top-right', pattern: 'solid' },
          { type: 'shape', shape: 'quartercircle', corner: 'top-left', pattern: 'solid' },
        ],
        [
          { type: 'shape', shape: 'quartercircle', corner: 'bottom-right', pattern: 'solid' },
          null,
        ],
      ],
    },
  },
  {
    id: 43,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.multiTransform',
    options: [
      { type: 'shape', shape: 'square', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.6, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.8, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 45, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.7, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'square', size: 0.4, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'square', size: 0.5, rotation: 22.5, pattern: 'dotted' },
        { type: 'shape', shape: 'square', size: 0.6, rotation: 45, pattern: 'empty' },
      ],
    },
  },
  {
    id: 44,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.ultimateSequence',
    options: [
      { type: 'shape', shape: 'diamond', size: 0.8, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.7, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.8, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.9, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.8, rotation: 135, pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', size: 0.8, rotation: 90, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      sequence: [
        { type: 'shape', shape: 'diamond', size: 0.5, rotation: 0, pattern: 'solid' },
        { type: 'shape', shape: 'diamond', size: 0.6, rotation: 67.5, pattern: 'dotted' },
        { type: 'shape', shape: 'diamond', size: 0.7, rotation: 135, pattern: 'empty' },
      ],
    },
  },
  {
    id: 45,
    type: 'visual',
    difficulty: 'hard',
    promptKey: 'visual.finalMatrix',
    options: [
      { type: 'shape', shape: 'triangle', size: 0.6, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.5, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'square', size: 0.6, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.7, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'circle', size: 0.6, rotation: 270, pattern: 'dotted' },
      { type: 'shape', shape: 'triangle', size: 0.6, rotation: 180, pattern: 'dotted' },
    ] as PatternCell[],
    correctAnswer: 0,
    visualData: {
      matrix: [
        [
          { type: 'shape', shape: 'triangle', size: 0.4, rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'triangle', size: 0.5, rotation: 90, pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', size: 0.6, rotation: 180, pattern: 'empty' },
        ],
        [
          { type: 'shape', shape: 'square', size: 0.4, rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'square', size: 0.5, rotation: 90, pattern: 'dotted' },
          { type: 'shape', shape: 'square', size: 0.6, rotation: 180, pattern: 'empty' },
        ],
        [
          { type: 'shape', shape: 'circle', size: 0.4, rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'circle', size: 0.5, rotation: 90, pattern: 'dotted' },
          null,
        ],
      ],
    },
  },
];

// Number Sequence Questions (30 questions)
export const numberQuestions: Question[] = [
  // Easy (10 questions) - Q46-Q55 (Complex patterns)
  {
    id: 46,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.arithmetic1',
    options: ['21', '34', '55', '89'],
    correctAnswer: 0, // Fibonacci: 1, 1, 2, 3, 5, 8, 13, ?
  },
  {
    id: 47,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.arithmetic2',
    options: ['19', '22', '25', '28'],
    correctAnswer: 0, // 2x+3: 2(2)+3=7, 2(4)+3=11, 2(6)+3=15, 2(8)+3=19
  },
  {
    id: 48,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.geometric1',
    options: ['81', '100', '121', '144'],
    correctAnswer: 0, // Squares: 4, 9, 16, 25, 36, 49, 64, ?
  },
  {
    id: 49,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple1',
    options: ['21', '34', '55', '89'],
    correctAnswer: 0, // Fibonacci: 2, 3, 5, 8, 13, ?
  },
  {
    id: 50,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple2',
    options: ['23', '26', '29', '32'],
    correctAnswer: 0, // 3x+2: 3(3)+2=11, 3(5)+2=17, 3(7)+2=23, 3(9)+2=29
  },
  {
    id: 51,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple3',
    options: ['36', '49', '64', '81'],
    correctAnswer: 0, // Squares: 1, 4, 9, 16, 25, ?
  },
  {
    id: 52,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple4',
    options: ['31', '34', '37', '40'],
    correctAnswer: 0, // 2x+1: 2(3)+1=7, 2(6)+1=13, 2(9)+1=19, 2(12)+1=25, 2(15)+1=31
  },
  {
    id: 53,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple5',
    options: ['34', '55', '89', '144'],
    correctAnswer: 0, // Fibonacci: 3, 5, 8, 13, 21, ?
  },
  {
    id: 54,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple6',
    options: ['49', '64', '81', '100'],
    correctAnswer: 0, // Squares: 1, 4, 9, 16, 25, 36, ?
  },
  {
    id: 55,
    type: 'number',
    difficulty: 'easy',
    promptKey: 'number.simple7',
    options: ['28', '31', '34', '37'],
    correctAnswer: 0, // 3x+4: 3(1)+4=7, 3(3)+4=13, 3(5)+4=19, 3(7)+4=25, 3(8)+4=28
  },

  // Medium (10 questions) - Q59-Q68 (Complex patterns)
  {
    id: 59,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.squares',
    options: ['25', '30', '36', '49'],
    correctAnswer: 0, // Squares: 1, 4, 9, 16, ?
  },
  {
    id: 60,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.fibonacci',
    options: ['13', '21', '34', '55'],
    correctAnswer: 1, // Fibonacci: 1, 1, 2, 3, 5, 8, ?
  },
  {
    id: 61,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.alternating',
    options: ['47', '53', '59', '61'],
    correctAnswer: 0, // 2x+1: 2(3)+1=7, 2(7)+1=15, 2(15)+1=31, 2(23)+1=47
  },
  {
    id: 62,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium1',
    options: ['89', '144', '233', '377'],
    correctAnswer: 0, // Fibonacci: 5, 8, 13, 21, 34, 55, ?
  },
  {
    id: 63,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium2',
    options: ['41', '43', '45', '47'],
    correctAnswer: 0, // 3x+2: 3(1)+2=5, 3(3)+2=11, 3(5)+2=17, 3(7)+2=23, 3(13)+2=41
  },
  {
    id: 64,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium3',
    options: ['64', '81', '100', '121'],
    correctAnswer: 0, // Squares: 4, 9, 16, 25, 36, 49, ?
  },
  {
    id: 65,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium4',
    options: ['55', '89', '144', '233'],
    correctAnswer: 0, // Fibonacci: 8, 13, 21, 34, ? (answer is 55)
  },
  {
    id: 66,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium5',
    options: ['37', '41', '43', '47'],
    correctAnswer: 0, // 2x+3: 2(2)+3=7, 2(5)+3=13, 2(7)+3=17, 2(11)+3=25, 2(17)+3=37
  },
  {
    id: 67,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium6',
    options: ['144', '233', '377', '610'],
    correctAnswer: 0, // Fibonacci: 13, 21, 34, 55, 89, ? (answer is 144)
  },
  {
    id: 68,
    type: 'number',
    difficulty: 'medium',
    promptKey: 'number.medium7',
    options: ['53', '59', '61', '67'],
    correctAnswer: 0, // 4x+1: 4(3)+1=13, 4(7)+1=29, 4(13)+1=53
  },

  // Hard (10 questions) - Q69-Q78
  {
    id: 69,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.complex1',
    options: ['47', '53', '59', '61'],
    correctAnswer: 0,
  },
  {
    id: 70,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.complex2',
    options: ['125', '216', '343', '512'],
    correctAnswer: 0,
  },
  {
    id: 71,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard1',
    options: ['89', '97', '101', '107'],
    correctAnswer: 0,
  },
  {
    id: 72,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard2',
    options: ['144', '169', '196', '225'],
    correctAnswer: 0,
  },
  {
    id: 73,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard3',
    options: ['128', '256', '512', '1024'],
    correctAnswer: 0,
  },
  {
    id: 74,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard4',
    options: ['71', '79', '83', '89'],
    correctAnswer: 0,
  },
  {
    id: 75,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard5',
    options: ['243', '256', '279', '312'],
    correctAnswer: 0,
  },
  {
    id: 76,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard6',
    options: ['103', '109', '113', '127'],
    correctAnswer: 0,
  },
  {
    id: 77,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard7',
    options: ['625', '729', '841', '961'],
    correctAnswer: 0,
  },
  {
    id: 78,
    type: 'number',
    difficulty: 'hard',
    promptKey: 'number.hard8',
    options: ['1024', '2048', '4096', '8192'],
    correctAnswer: 0,
  },
];

// Verbal Reasoning Questions (15 questions)
export const verbalQuestions: Question[] = [
  // Easy (5 questions) - Q76-Q80
  {
    id: 76,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.synonym1',
    options: ['verbal.synonym1.option1', 'verbal.synonym1.option2', 'verbal.synonym1.option3', 'verbal.synonym1.option4'],
    correctAnswer: 2,
  },
  {
    id: 77,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.logic1',
    options: ['verbal.logic1.option1', 'verbal.logic1.option2', 'verbal.logic1.option3', 'verbal.logic1.option4'],
    correctAnswer: 3,
  },
  {
    id: 78,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.moon',
    options: ['verbal.moon.option1', 'verbal.moon.option2', 'verbal.moon.option3', 'verbal.moon.option4'],
    correctAnswer: 0, // Neil Armstrong
  },
  {
    id: 79,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.america',
    options: ['verbal.america.option1', 'verbal.america.option2', 'verbal.america.option3', 'verbal.america.option4'],
    correctAnswer: 0, // Christopher Columbus
  },
  {
    id: 80,
    type: 'verbal',
    difficulty: 'easy',
    promptKey: 'verbal.simple3',
    options: ['verbal.simple3.option1', 'verbal.simple3.option2', 'verbal.simple3.option3', 'verbal.simple3.option4'],
    correctAnswer: 0,
  },

  // Medium (5 questions) - Q81-Q85
  {
    id: 81,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.antonym1',
    options: ['verbal.antonym1.option1', 'verbal.antonym1.option2', 'verbal.antonym1.option3', 'verbal.antonym1.option4'],
    correctAnswer: 1,
  },
  {
    id: 82,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.knowledge1',
    options: ['6', '8', '10', '12'],
    correctAnswer: 0,
  },
  {
    id: 83,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.shakespeare',
    options: ['verbal.shakespeare.option1', 'verbal.shakespeare.option2', 'verbal.shakespeare.option3', 'verbal.shakespeare.option4'],
    correctAnswer: 0, // Romeo and Juliet
  },
  {
    id: 84,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.einstein',
    options: ['verbal.einstein.option1', 'verbal.einstein.option2', 'verbal.einstein.option3', 'verbal.einstein.option4'],
    correctAnswer: 0, // Theory of Relativity
  },
  {
    id: 85,
    type: 'verbal',
    difficulty: 'medium',
    promptKey: 'verbal.medium3',
    options: ['verbal.medium3.option1', 'verbal.medium3.option2', 'verbal.medium3.option3', 'verbal.medium3.option4'],
    correctAnswer: 0,
  },

  // Hard (5 questions) - Q86-Q90
  {
    id: 86,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy1',
    options: ['verbal.analogy1.option1', 'verbal.analogy1.option2', 'verbal.analogy1.option3', 'verbal.analogy1.option4'],
    correctAnswer: 3, // Fixed: drop is to pond (small body of water), not ocean
  },
  {
    id: 87,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy2',
    options: ['verbal.analogy2.option1', 'verbal.analogy2.option2', 'verbal.analogy2.option3', 'verbal.analogy2.option4'],
    correctAnswer: 0,
  },
  {
    id: 88,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy3',
    options: ['verbal.analogy3.option1', 'verbal.analogy3.option2', 'verbal.analogy3.option3', 'verbal.analogy3.option4'],
    correctAnswer: 0,
  },
  {
    id: 89,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy4',
    options: ['verbal.analogy4.option1', 'verbal.analogy4.option2', 'verbal.analogy4.option3', 'verbal.analogy4.option4'],
    correctAnswer: 0,
  },
  {
    id: 90,
    type: 'verbal',
    difficulty: 'hard',
    promptKey: 'verbal.analogy5',
    options: ['verbal.analogy5.option1', 'verbal.analogy5.option2', 'verbal.analogy5.option3', 'verbal.analogy5.option4'],
    correctAnswer: 0,
  },
];

// Select 25 questions with progressive difficulty for each test
// IMPORTANT: This function is DETERMINISTIC - same questions in same order across all languages
// Ensures general culture questions (moon, america, shakespeare, einstein) are included
export function selectTestQuestions(): Question[] {
  const allQuestions = [...visualQuestions, ...numberQuestions, ...verbalQuestions];
  
  // Separate by difficulty and type
  const easy = allQuestions.filter(q => q.difficulty === 'easy');
  const medium = allQuestions.filter(q => q.difficulty === 'medium');
  const hard = allQuestions.filter(q => q.difficulty === 'hard');
  
  // Sort by ID to ensure deterministic order (no randomness)
  const sortById = <T extends { id: number }>(array: T[]): T[] => {
    return [...array].sort((a, b) => a.id - b.id);
  };
  
  const sortedEasy = sortById(easy);
  const sortedMedium = sortById(medium);
  const sortedHard = sortById(hard);
  
  // Separate by type for balanced selection
  const easyVisual = sortedEasy.filter(q => q.type === 'visual');
  const easyNumber = sortedEasy.filter(q => q.type === 'number');
  const easyVerbal = sortedEasy.filter(q => q.type === 'verbal');
  
  const mediumVisual = sortedMedium.filter(q => q.type === 'visual');
  const mediumNumber = sortedMedium.filter(q => q.type === 'number');
  const mediumVerbal = sortedMedium.filter(q => q.type === 'verbal');
  
  const hardVisual = sortedHard.filter(q => q.type === 'visual');
  const hardNumber = sortedHard.filter(q => q.type === 'number');
  const hardVerbal = sortedHard.filter(q => q.type === 'verbal');
  
  // Select questions ensuring general culture questions are included
  // Easy: 5 visual, 2 number, 1 verbal (must include moon ID 78 or america ID 79)
  // Medium: 6 visual, 2 number, 2 verbal (must include shakespeare ID 83 and einstein ID 84)
  // Hard: 4 visual, 2 number, 1 verbal
  
  // Find general culture questions
  const moonQuestion = easyVerbal.find(q => q.id === 78); // verbal.moon
  const americaQuestion = easyVerbal.find(q => q.id === 79); // verbal.america
  const shakespeareQuestion = mediumVerbal.find(q => q.id === 83); // verbal.shakespeare
  const einsteinQuestion = mediumVerbal.find(q => q.id === 84); // verbal.einstein
  
  // Select easy questions: include at least one general culture question
  const easyVerbalSelected: Question[] = [];
  if (moonQuestion) easyVerbalSelected.push(moonQuestion);
  if (americaQuestion && easyVerbalSelected.length < 1) easyVerbalSelected.push(americaQuestion);
  // Fill remaining easy verbal slots if needed
  const remainingEasyVerbal = easyVerbal.filter(q => !easyVerbalSelected.includes(q));
  if (easyVerbalSelected.length < 1 && remainingEasyVerbal.length > 0) {
    easyVerbalSelected.push(remainingEasyVerbal[0]);
  }
  
  // Select medium questions: include shakespeare and einstein
  const mediumVerbalSelected: Question[] = [];
  if (shakespeareQuestion) mediumVerbalSelected.push(shakespeareQuestion);
  if (einsteinQuestion) mediumVerbalSelected.push(einsteinQuestion);
  // Fill remaining medium verbal slots if needed
  const remainingMediumVerbal = mediumVerbal.filter(q => !mediumVerbalSelected.includes(q));
  while (mediumVerbalSelected.length < 2 && remainingMediumVerbal.length > 0) {
    mediumVerbalSelected.push(remainingMediumVerbal.shift()!);
  }
  
  const selectedEasy = [
    ...easyVisual.slice(0, 5),
    ...easyNumber.slice(0, 2),
    ...easyVerbalSelected,
  ];
  
  const selectedMedium = [
    ...mediumVisual.slice(0, 6),
    ...mediumNumber.slice(0, 2),
    ...mediumVerbalSelected,
  ];
  
  const selectedHard = [
    ...hardVisual.slice(0, 4),
    ...hardNumber.slice(0, 2),
    ...hardVerbal.slice(0, 1),
  ];
  
  // Sort final selection by ID to maintain deterministic order
  const finalSelection = [...selectedEasy, ...selectedMedium, ...selectedHard];
  return sortById(finalSelection);
}
