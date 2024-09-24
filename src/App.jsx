import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setHighlightedText(inputText);
  };

  const uniqueWords = () => {
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    return new Set(words).size;
  };

  const charCount = () => {
    return (text.match(/[a-zA-Z0-9]/g) || []).length;
  };

  const handleReplace = () => {
    const regex = new RegExp(search, 'g');
    const replacedText = text.replace(regex, replace);
    setText(replacedText);
    setHighlightedText(replacedText.replace(regex, `<mark>${replace}</mark>`));
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analysis</h1>
      
      <textarea
        className="textarea"
        value={text}
        onChange={handleChange}
        placeholder="Type or paste your text here..."
      ></textarea>

      <div className="stats">
        <p><strong>Unique Words:</strong> {uniqueWords()}</p>
        <p><strong>Character Count (Excluding Spaces and Punctuation):</strong> {charCount()}</p>
      </div>

      <div className="replacement">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="String to search"
        />
        <input
          type="text"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="Replace with"
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    </div>
  );
};

export default App;
