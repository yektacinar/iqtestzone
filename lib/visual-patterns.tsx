import React from 'react';

export interface PatternCell {
  type: 'shape' | 'dots' | 'lines' | 'grid';
  shape?: 'circle' | 'square' | 'triangle' | 'diamond' | 'lshape' | 'quartercircle';
  count?: number;
  size?: number;
  rotation?: number;
  color?: string;
  position?: { x: number; y: number };
  pattern?: 'solid' | 'striped' | 'dotted' | 'empty';
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // For L-shapes and quarter-circles
}

export interface VisualQuestion {
  id: number;
  type: 'matrix' | 'sequence' | 'analogy';
  matrix?: (PatternCell | null)[][]; // 3x3 matrix with missing piece
  sequence?: PatternCell[]; // Sequence of patterns
  options: PatternCell[]; // Answer options (6 or 9)
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Helper component to render a pattern cell
export function PatternCellComponent({ cell, size = 80 }: { cell: PatternCell; size?: number }) {
  const centerX = size / 2;
  const centerY = size / 2;

  const renderShape = () => {
    if (cell.type === 'shape' && cell.shape) {
      const shapeSize = (cell.size || 0.6) * size;
      const fill = cell.pattern === 'empty' ? 'none' : cell.color || '#000';
      const stroke = cell.color || '#000';
      const strokeWidth = 2;

      switch (cell.shape) {
        case 'circle':
          return (
            <circle
              cx={centerX}
              cy={centerY}
              r={shapeSize / 2}
              fill={cell.pattern === 'solid' ? fill : 'none'}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={cell.pattern === 'dotted' ? '2,2' : 'none'}
            />
          );
        case 'square':
          return (
            <rect
              x={centerX - shapeSize / 2}
              y={centerY - shapeSize / 2}
              width={shapeSize}
              height={shapeSize}
              fill={cell.pattern === 'solid' ? fill : 'none'}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={cell.pattern === 'dotted' ? '2,2' : 'none'}
              transform={cell.rotation ? `rotate(${cell.rotation} ${centerX} ${centerY})` : ''}
            />
          );
        case 'triangle':
          const points = [
            `${centerX},${centerY - shapeSize / 2}`,
            `${centerX - shapeSize / 2},${centerY + shapeSize / 2}`,
            `${centerX + shapeSize / 2},${centerY + shapeSize / 2}`,
          ];
          return (
            <polygon
              points={points.join(' ')}
              fill={cell.pattern === 'solid' ? fill : 'none'}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={cell.pattern === 'dotted' ? '2,2' : 'none'}
              transform={cell.rotation ? `rotate(${cell.rotation} ${centerX} ${centerY})` : ''}
            />
          );
        case 'diamond':
          const diamondPoints = [
            `${centerX},${centerY - shapeSize / 2}`,
            `${centerX + shapeSize / 2},${centerY}`,
            `${centerX},${centerY + shapeSize / 2}`,
            `${centerX - shapeSize / 2},${centerY}`,
          ];
          return (
            <polygon
              points={diamondPoints.join(' ')}
              fill={cell.pattern === 'solid' ? fill : 'none'}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={cell.pattern === 'dotted' ? '2,2' : 'none'}
              transform={cell.rotation ? `rotate(${cell.rotation} ${centerX} ${centerY})` : ''}
            />
          );
        case 'lshape': {
          // L-shape positioned in a corner
          const corner = cell.corner || 'bottom-right';
          const lSize = shapeSize * 0.8;
          const thickness = lSize * 0.3;
          
          let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6;
          
          switch (corner) {
            case 'bottom-right':
              // L-shape in bottom-right: vertical on right, horizontal on bottom
              x1 = size - lSize; y1 = size - thickness;
              x2 = size; y2 = size - thickness;
              x3 = size; y3 = size;
              x4 = size - thickness; y4 = size;
              x5 = size - thickness; y5 = size - lSize;
              x6 = size - lSize; y6 = size - lSize;
              break;
            case 'top-right':
              // L-shape in top-right: vertical on right, horizontal on top
              x1 = size - lSize; y1 = thickness;
              x2 = size; y2 = thickness;
              x3 = size; y3 = 0;
              x4 = size - thickness; y4 = 0;
              x5 = size - thickness; y5 = lSize;
              x6 = size - lSize; y6 = lSize;
              break;
            case 'bottom-left':
              // L-shape in bottom-left: vertical on left, horizontal on bottom
              x1 = lSize; y1 = size - thickness;
              x2 = 0; y2 = size - thickness;
              x3 = 0; y3 = size;
              x4 = thickness; y4 = size;
              x5 = thickness; y5 = size - lSize;
              x6 = lSize; y6 = size - lSize;
              break;
            case 'top-left':
              // L-shape in top-left: vertical on left, horizontal on top
              x1 = lSize; y1 = thickness;
              x2 = 0; y2 = thickness;
              x3 = 0; y3 = 0;
              x4 = thickness; y4 = 0;
              x5 = thickness; y5 = lSize;
              x6 = lSize; y6 = lSize;
              break;
            default:
              x1 = size - lSize; y1 = size - thickness;
              x2 = size; y2 = size - thickness;
              x3 = size; y3 = size;
              x4 = size - thickness; y4 = size;
              x5 = size - thickness; y5 = size - lSize;
              x6 = size - lSize; y6 = size - lSize;
          }
          
          const lPoints = `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4} ${x5},${y5} ${x6},${y6}`;
          return (
            <polygon
              points={lPoints}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        }
        case 'quartercircle': {
          // Quarter-circle positioned in a corner
          const corner = cell.corner || 'bottom-right';
          const radius = shapeSize * 0.8;
          
          let cx, cy, startAngle, endAngle;
          
          switch (corner) {
            case 'bottom-right':
              cx = size - radius;
              cy = size - radius;
              startAngle = 0;
              endAngle = 90;
              break;
            case 'top-right':
              cx = size - radius;
              cy = radius;
              startAngle = 270;
              endAngle = 360;
              break;
            case 'bottom-left':
              cx = radius;
              cy = size - radius;
              startAngle = 90;
              endAngle = 180;
              break;
            case 'top-left':
              cx = radius;
              cy = radius;
              startAngle = 180;
              endAngle = 270;
              break;
            default:
              cx = size - radius;
              cy = size - radius;
              startAngle = 0;
              endAngle = 90;
          }
          
          // Convert angles to radians and calculate arc path
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = cx + radius * Math.cos(startRad);
          const y1 = cy + radius * Math.sin(startRad);
          const x2 = cx + radius * Math.cos(endRad);
          const y2 = cy + radius * Math.sin(endRad);
          const largeArc = endAngle - startAngle > 180 ? 1 : 0;
          
          const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          
          return (
            <path
              d={pathData}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        }
      }
    } else if (cell.type === 'dots' && cell.count) {
      const dots = [];
      const positions = [
        { x: centerX, y: centerY - 15 },
        { x: centerX - 15, y: centerY },
        { x: centerX + 15, y: centerY },
        { x: centerX, y: centerY + 15 },
        { x: centerX - 10, y: centerY - 10 },
        { x: centerX + 10, y: centerY - 10 },
        { x: centerX - 10, y: centerY + 10 },
        { x: centerX + 10, y: centerY + 10 },
        { x: centerX, y: centerY },
      ];
      for (let i = 0; i < Math.min(cell.count, 9); i++) {
        dots.push(
          <circle
            key={i}
            cx={positions[i].x}
            cy={positions[i].y}
            r={4}
            fill={cell.color || '#000'}
          />
        );
      }
      return <g>{dots}</g>;
    } else if (cell.type === 'lines') {
      const lines = [];
      const lineLength = 20;
      const strokeColor = cell.color || '#000';
      const strokeWidth = 2;
      
      // Horizontal line (minus sign) - count >= 1
      if (cell.count && cell.count >= 1) {
        lines.push(
          <line
            key="h"
            x1={centerX - lineLength}
            y1={centerY}
            x2={centerX + lineLength}
            y2={centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        );
      }
      
      // Vertical line (makes plus sign) - count >= 2
      if (cell.count && cell.count >= 2) {
        lines.push(
          <line
            key="v"
            x1={centerX}
            y1={centerY - lineLength}
            x2={centerX}
            y2={centerY + lineLength}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        );
      }
      
      // First diagonal (makes X pattern) - count >= 3
      if (cell.count && cell.count >= 3) {
        lines.push(
          <line
            key="d1"
            x1={centerX - lineLength * 0.7}
            y1={centerY - lineLength * 0.7}
            x2={centerX + lineLength * 0.7}
            y2={centerY + lineLength * 0.7}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        );
      }
      
      // Second diagonal (makes asterisk) - count >= 4
      if (cell.count && cell.count >= 4) {
        lines.push(
          <line
            key="d2"
            x1={centerX - lineLength * 0.7}
            y1={centerY + lineLength * 0.7}
            x2={centerX + lineLength * 0.7}
            y2={centerY - lineLength * 0.7}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        );
      }
      
      // Additional lines for count >= 5 (8-pointed star pattern)
      if (cell.count && cell.count >= 5) {
        // Add 4 more lines at 45-degree angles
        const angle45 = Math.PI / 4;
        for (let i = 0; i < 4; i++) {
          const angle = angle45 + (i * Math.PI / 2);
          const x1 = centerX + lineLength * 0.5 * Math.cos(angle);
          const y1 = centerY + lineLength * 0.5 * Math.sin(angle);
          const x2 = centerX - lineLength * 0.5 * Math.cos(angle);
          const y2 = centerY - lineLength * 0.5 * Math.sin(angle);
          lines.push(
            <line
              key={`extra${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          );
        }
      }
      
      return <g>{lines}</g>;
    }
    return null;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      {renderShape()}
    </svg>
  );
}

// Generate visual questions
export function generateVisualQuestions(): VisualQuestion[] {
  const questions: VisualQuestion[] = [];

  // Easy questions - Simple patterns
  // Q1: Increasing circle count
  questions.push({
    id: 1,
    type: 'sequence',
    sequence: [
      { type: 'dots', count: 1 },
      { type: 'dots', count: 2 },
      { type: 'dots', count: 3 },
    ],
    options: [
      { type: 'dots', count: 4 },
      { type: 'dots', count: 5 },
      { type: 'dots', count: 3 },
      { type: 'dots', count: 6 },
      { type: 'dots', count: 2 },
      { type: 'dots', count: 1 },
    ],
    correctAnswer: 0,
    difficulty: 'easy',
  });

  // Q2: Shape rotation
  questions.push({
    id: 2,
    type: 'sequence',
    sequence: [
      { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 90, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 180, pattern: 'solid' },
    ],
    options: [
      { type: 'shape', shape: 'triangle', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 90, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 270, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 180, pattern: 'solid' },
    ],
    correctAnswer: 0,
    difficulty: 'easy',
  });

  // Q3: Simple 2x2 matrix - shape type
  questions.push({
    id: 3,
    type: 'matrix',
    matrix: [
      [
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        { type: 'shape', shape: 'square', pattern: 'solid' },
      ],
      [
        { type: 'shape', shape: 'circle', pattern: 'solid' },
        null, // Missing piece
      ],
    ],
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
    ],
    correctAnswer: 0,
    difficulty: 'easy',
  });

  // Q4: Pattern fill progression
  questions.push({
    id: 4,
    type: 'sequence',
    sequence: [
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
    ],
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
    ],
    correctAnswer: 0,
    difficulty: 'easy',
  });

  // Q5: Size progression
  questions.push({
    id: 5,
    type: 'sequence',
    sequence: [
      { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
    ],
    options: [
      { type: 'shape', shape: 'circle', size: 0.7, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.5, pattern: 'solid' },
      { type: 'shape', shape: 'square', size: 0.7, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.6, pattern: 'solid' },
      { type: 'shape', shape: 'circle', size: 0.4, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', size: 0.7, pattern: 'solid' },
    ],
    correctAnswer: 0,
    difficulty: 'easy',
  });

  // Medium questions - More complex patterns
  // Q6: 3x3 matrix - shape and pattern combination
  questions.push({
    id: 6,
    type: 'matrix',
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
    options: [
      { type: 'shape', shape: 'triangle', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'empty' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'diamond', pattern: 'empty' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
    ],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // Q7: Rotation and count combination
  questions.push({
    id: 7,
    type: 'sequence',
    sequence: [
      { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
    ],
    options: [
      { type: 'shape', shape: 'square', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
      { type: 'shape', shape: 'circle', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 45, pattern: 'solid' },
      { type: 'shape', shape: 'triangle', rotation: 135, pattern: 'solid' },
      { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
    ],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // Q8: Multiple shapes progression
  questions.push({
    id: 8,
    type: 'sequence',
    sequence: [
      { type: 'dots', count: 1 },
      { type: 'dots', count: 3 },
      { type: 'dots', count: 5 },
    ],
    options: [
      { type: 'dots', count: 7 },
      { type: 'dots', count: 5 },
      { type: 'dots', count: 9 },
      { type: 'dots', count: 3 },
      { type: 'dots', count: 1 },
      { type: 'dots', count: 6 },
    ],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // Q9: Shape transformation matrix
  questions.push({
    id: 9,
    type: 'matrix',
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
    options: [
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'empty' },
      { type: 'shape', shape: 'circle', pattern: 'dotted' },
    ],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // Q10: Lines count progression
  questions.push({
    id: 10,
    type: 'sequence',
    sequence: [
      { type: 'lines', count: 1 },
      { type: 'lines', count: 2 },
      { type: 'lines', count: 3 },
    ],
    options: [
      { type: 'lines', count: 4 },
      { type: 'lines', count: 3 },
      { type: 'lines', count: 2 },
      { type: 'dots', count: 4 },
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'lines', count: 1 },
    ],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // Q11-15: More medium complexity
  for (let i = 11; i <= 15; i++) {
    const variations = [
      {
        sequence: [
          { type: 'shape', shape: 'diamond', size: 0.4, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', size: 0.5, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', size: 0.6, pattern: 'solid' },
        ],
        correct: { type: 'shape', shape: 'diamond', size: 0.7, pattern: 'solid' },
      },
      {
        sequence: [
          { type: 'shape', shape: 'circle', pattern: 'solid' },
          { type: 'shape', shape: 'circle', pattern: 'dotted' },
          { type: 'shape', shape: 'circle', pattern: 'empty' },
        ],
        correct: { type: 'shape', shape: 'circle', pattern: 'empty' },
      },
      {
        sequence: [
          { type: 'dots', count: 2 },
          { type: 'dots', count: 4 },
          { type: 'dots', count: 6 },
        ],
        correct: { type: 'dots', count: 8 },
      },
      {
        sequence: [
          { type: 'shape', shape: 'triangle', rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'triangle', rotation: 120, pattern: 'solid' },
          { type: 'shape', shape: 'triangle', rotation: 240, pattern: 'solid' },
        ],
        correct: { type: 'shape', shape: 'triangle', rotation: 360, pattern: 'solid' },
      },
      {
        sequence: [
          { type: 'shape', shape: 'square', size: 0.5, rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'square', size: 0.6, rotation: 45, pattern: 'solid' },
          { type: 'shape', shape: 'square', size: 0.7, rotation: 90, pattern: 'solid' },
        ],
        correct: { type: 'shape', shape: 'square', size: 0.8, rotation: 135, pattern: 'solid' },
      },
    ];
    const variant = variations[(i - 11) % variations.length];
    const wrongOptions = [
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'dots', count: 5 },
      { type: 'shape', shape: 'triangle', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
    ];
    questions.push({
      id: i,
      type: 'sequence',
      sequence: variant.sequence as PatternCell[],
      options: [variant.correct, ...wrongOptions] as PatternCell[],
      correctAnswer: 0,
      difficulty: 'medium',
    });
  }

  // Hard questions - Complex matrix patterns
  // Q16-20: Complex 3x3 matrices
  const hardMatrices = [
    {
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
      correct: { type: 'shape', shape: 'square', pattern: 'empty' },
    },
    {
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
      correct: { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'solid' },
    },
  ];

  for (let i = 16; i <= 20; i++) {
    const variant = hardMatrices[(i - 16) % hardMatrices.length];
    const wrongOptions = [
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
      { type: 'dots', count: 5 },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
    ];
    questions.push({
      id: i,
      type: 'matrix',
      matrix: variant.matrix as (PatternCell | null)[][],
      options: [variant.correct, ...wrongOptions] as PatternCell[],
      correctAnswer: 0,
      difficulty: 'hard',
    });
  }

  // Q21-25: Very complex patterns
  for (let i = 21; i <= 25; i++) {
    const complexPatterns = [
      {
        sequence: [
          { type: 'shape', shape: 'circle', size: 0.4, rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'circle', size: 0.5, rotation: 90, pattern: 'dotted' },
          { type: 'shape', shape: 'circle', size: 0.6, rotation: 180, pattern: 'empty' },
        ],
        correct: { type: 'shape', shape: 'circle', size: 0.7, rotation: 270, pattern: 'solid' },
      },
      {
        sequence: [
          { type: 'dots', count: 1 },
          { type: 'dots', count: 3 },
          { type: 'dots', count: 5 },
        ],
        correct: { type: 'dots', count: 7 },
      },
      {
        sequence: [
          { type: 'shape', shape: 'square', rotation: 0, pattern: 'solid' },
          { type: 'shape', shape: 'diamond', rotation: 45, pattern: 'solid' },
          { type: 'shape', shape: 'square', rotation: 90, pattern: 'solid' },
        ],
        correct: { type: 'shape', shape: 'diamond', rotation: 135, pattern: 'solid' },
      },
      {
        sequence: [
          { type: 'lines', count: 1 },
          { type: 'lines', count: 2 },
          { type: 'lines', count: 3 },
        ],
        correct: { type: 'lines', count: 4 },
      },
      {
        sequence: [
          { type: 'shape', shape: 'triangle', size: 0.5, pattern: 'solid' },
          { type: 'shape', shape: 'triangle', size: 0.6, pattern: 'dotted' },
          { type: 'shape', shape: 'triangle', size: 0.7, pattern: 'empty' },
        ],
        correct: { type: 'shape', shape: 'triangle', size: 0.8, pattern: 'solid' },
      },
    ];
    const variant = complexPatterns[(i - 21) % complexPatterns.length];
    const wrongOptions = [
      { type: 'shape', shape: 'circle', pattern: 'solid' },
      { type: 'shape', shape: 'square', pattern: 'solid' },
      { type: 'dots', count: 6 },
      { type: 'shape', shape: 'triangle', pattern: 'dotted' },
      { type: 'shape', shape: 'diamond', pattern: 'solid' },
    ];
    questions.push({
      id: i,
      type: 'sequence',
      sequence: variant.sequence as PatternCell[],
      options: [variant.correct, ...wrongOptions] as PatternCell[],
      correctAnswer: 0,
      difficulty: 'hard',
    });
  }

  return questions;
}
