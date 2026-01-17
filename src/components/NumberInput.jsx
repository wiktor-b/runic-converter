import { useState } from 'react';
import './NumberInput.css';

function NumberInput({ onSubmit }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const v = e.target.value;
    
    if (v === '' || !/^\d+$/.test(v)) {
      setValue(v === '' ? '' : value);
      setError(false);
      return;
    }
    
    const num = parseInt(v, 10);
    setValue(v);
    setError(num < 1 || num > 9999);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (num >= 1 && num <= 9999) onSubmit(num);
  };

  return (
    <form className="number-input" onSubmit={handleSubmit}>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder="Enter a number (1-9999)"
        className={`field ${error ? 'field--error' : ''}`}
      />
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={!value || error}
      >
        Convert to Runes →
      </button>
    </form>
  );
}

export default NumberInput;
