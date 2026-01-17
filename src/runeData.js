// Cistercian Numeral System

const DIGIT_LINES = {
  1: [[0, 0, 30, 0]],
  2: [[0, 25, 30, 25]],
  3: [[0, 0, 30, 25]],
  4: [[0, 25, 30, 0]],
  5: [[0, 0, 30, 25], [0, 0, 30, 0]],
  6: [[30, 0, 30, 25]],
  7: [[0, 0, 30, 0], [30, 0, 30, 25]],
  8: [[0, 25, 30, 25], [30, 0, 30, 25]],
  9: [[0, 0, 30, 0], [0, 25, 30, 25], [30, 0, 30, 25]],
};

function transformLine(line, quadrant, staffX, staffTop, staffBottom) {
  const [x1, y1, x2, y2] = line;
  
  switch (quadrant) {
    case 'ur': return [staffX + x1, staffTop + y1, staffX + x2, staffTop + y2];
    case 'ul': return [staffX - x1, staffTop + y1, staffX - x2, staffTop + y2];
    case 'lr': return [staffX + x1, staffBottom - y1, staffX + x2, staffBottom - y2];
    case 'll': return [staffX - x1, staffBottom - y1, staffX - x2, staffBottom - y2];
    default: return line;
  }
}

export function numberToCistercian(num) {
  if (num < 0 || num > 9999 || !Number.isInteger(num)) {
    return { staffPath: '', digitPaths: [] };
  }

  const staffX = 50, staffTop = 10, staffBottom = 140;
  const staffPath = `M ${staffX} ${staffTop} L ${staffX} ${staffBottom}`;
  const digitPaths = [];

  if (num === 0) return { staffPath, digitPaths };

  const digits = [
    [num % 10, 'ur'],
    [Math.floor((num % 100) / 10), 'ul'],
    [Math.floor((num % 1000) / 100), 'lr'],
    [Math.floor(num / 1000), 'll']
  ];

  digits.forEach(([digit, quadrant]) => {
    if (digit > 0 && DIGIT_LINES[digit]) {
      DIGIT_LINES[digit].forEach(line => {
        const [x1, y1, x2, y2] = transformLine(line, quadrant, staffX, staffTop, staffBottom);
        digitPaths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
      });
    }
  });

  return { staffPath, digitPaths };
}

export const CISTERCIAN_VIEWBOX = { width: 100, height: 150 };
