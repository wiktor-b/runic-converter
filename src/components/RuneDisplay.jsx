import { useRef, forwardRef, useImperativeHandle } from 'react';
import { numberToCistercian, CISTERCIAN_VIEWBOX } from '../runeData';
import './RuneDisplay.css';

const RuneDisplay = forwardRef(({ number }, ref) => {
  const svgRef = useRef(null);
  const { staffPath, digitPaths } = number ? numberToCistercian(number) : { staffPath: '', digitPaths: [] };

  useImperativeHandle(ref, () => ({
    downloadSVG: () => {
      if (!svgRef.current) return;
      
      const svg = svgRef.current.cloneNode(true);
      svg.querySelectorAll('path').forEach(p => {
        p.style.strokeDasharray = 'none';
        p.style.strokeDashoffset = '0';
        p.style.animation = 'none';
      });
      
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `cistercian-${number}.svg`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }));

  if (!number) {
    return (
      <div className="rune-display rune-display--empty">
        <p>Enter a number (1-9999) to see its Cistercian numeral</p>
      </div>
    );
  }

  return (
    <div className="rune-display">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CISTERCIAN_VIEWBOX.width} ${CISTERCIAN_VIEWBOX.height}`}
        className="rune-svg"
      >
        <path d={staffPath} className="rune-path" style={{ animationDelay: '0s' }} />
        {digitPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className="rune-path"
            style={{ animationDelay: `${0.2 + i * 0.2}s` }}
          />
        ))}
      </svg>
      
      <div className="rune-breakdown">
        <span>{number}</span>
        <span>
          ({[
            number >= 1000 && `${Math.floor(number / 1000)}×1000`,
            Math.floor((number % 1000) / 100) > 0 && `${Math.floor((number % 1000) / 100)}×100`,
            Math.floor((number % 100) / 10) > 0 && `${Math.floor((number % 100) / 10)}×10`,
            number % 10 > 0 && `${number % 10}`
          ].filter(Boolean).join(' + ')})
        </span>
      </div>
    </div>
  );
});

export default RuneDisplay;
