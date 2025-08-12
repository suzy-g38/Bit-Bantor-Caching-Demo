// components/LRUCacheComponent.js
import React, { useState } from 'react';
import useLRUCache from '../hooks/useLRUCache';
//import './LRUCacheComponent.css'; // CSS file for styling

export default function LRUCacheComponent() {
  const { get, put, getCacheState, clear } = useLRUCache(3); // Capacity of 3
  const [keyInput, setKeyInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [getKey, setGetKey] = useState('');
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const handlePut = () => {
    if (!keyInput || !usernameInput || !emailInput) {
      setLogs((prev) => [...prev, 'Error: All fields are required']);
      return;
    }
    const value = { id: keyInput, username: usernameInput, email: emailInput };
    if (getCacheState().length >= 3) {
      const tail = getCacheState()[0]?.key; // LRU item
      if (tail) setLogs((prev) => [...prev, `Evicted key: ${tail}`]);
    }
    put(keyInput, value);
    setLogs((prev) => [...prev, `Inserted/Updated key: ${keyInput}`]);
    setKeyInput('');
    setUsernameInput('');
    setEmailInput('');
  };

  const handleGet = () => {
    if (!getKey) {
      setLogs((prev) => [...prev, 'Error: Key is required']);
      return;
    }
    const value = get(getKey);
    setResult(value ? JSON.stringify(value, null, 2) : 'Not found');
    setLogs((prev) => [...prev, `Retrieved key: ${getKey} (${value ? 'Hit' : 'Miss'})`]);
    setGetKey('');
  };

  const handleClear = () => {
    clear();
    setLogs((prev) => [...prev, 'Cache cleared']);
    setResult(null);
  };

  return (
    <div className="lru-container">
      <h1>LRU Cache Demo (Capacity: 3)</h1>
      <div className="section">
        <h2>Add to Cache</h2>
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Key (e.g., user1)"
        />
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handlePut}>Put</button>
      </div>
      <div className="section">
        <h2>Retrieve from Cache</h2>
        <input
          type="text"
          value={getKey}
          onChange={(e) => setGetKey(e.target.value)}
          placeholder="Key (e.g., user1)"
        />
        <button onClick={handleGet}>Get</button>
        {result && (
          <pre className="result">Result: {result}</pre>
        )}
      </div>
      <div className="section">
        <h2>Cache State (LRU to MRU)</h2>
        <ul className="cache-state">
          {getCacheState().map(({ key, value }) => (
            <li key={key}>
              Key: {key}, Value: {JSON.stringify(value, null, 2)}
            </li>
          ))}
          {getCacheState().length === 0 && <p>Cache is empty</p>}
        </ul>
        <button onClick={handleClear}>Clear Cache</button>
      </div>
      <div className="section">
        <h2>Operation Log</h2>
        <ul className="logs">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
          {logs.length === 0 && <p>No operations yet</p>}
        </ul>
      </div>
    </div>
  );
}