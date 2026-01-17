import { useState, useRef } from 'react';
import NumberInput from './components/NumberInput';
import RuneDisplay from './components/RuneDisplay';
import './App.css';

function App() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const runeDisplayRef = useRef(null);

  const handleSubmit = (number) => {
    setAnimationKey(prev => prev + 1);
    setCurrentNumber(number);
  };

  const handleDownload = () => {
    if (runeDisplayRef.current) {
      runeDisplayRef.current.downloadSVG();
    }
  };

  return (
    <div className="app">
      <main className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-rune">ᚱ</span>
            Runic Numerals
          </h1>
          <p className="subtitle">
            Transform numbers into ancient runic symbols
          </p>
        </header>

        <div className="card">
          <NumberInput onSubmit={handleSubmit} />
          
          <div className="divider"></div>
          
          <RuneDisplay 
            key={animationKey}
            ref={runeDisplayRef}
            number={currentNumber} 
          />
          
          <button 
            className="download-btn" 
            onClick={handleDownload}
            disabled={!currentNumber}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download SVG
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
