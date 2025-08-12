import { useState, useEffect } from 'react';

export function usePersistentCache(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    // console.log(`Initializing from storage: ${stored ? 'Found' : 'Not found'}`); // Uncomment for init logs
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    // console.log(`Saving to storage: ${JSON.stringify(value)}`); // Uncomment for save logs
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}