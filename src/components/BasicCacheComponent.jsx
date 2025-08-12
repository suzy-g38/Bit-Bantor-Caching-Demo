import { useMemo, useCallback, useState, useEffect } from 'react';

function BasicCacheComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(Array.from({ length: 10000 }, (_, i) => i)); // Large array for "expensive" demo

  // Closure-based cache for API deduplication
  const createApiCache = () => {
    const cache = new Map();
    const inFlight = new Map(); // For deduping in-flight requests

    return async (key) => {
      console.log(`Checking cache for key: ${key}`); // Uncomment to show cache checks
      if (cache.has(key)) {
        console.log(`Cache hit for ${key}!`); // Uncomment for hit logs
        return cache.get(key);
      }
      if (inFlight.has(key)) {
        console.log(`In-flight hit for ${key} - waiting...`); // Uncomment for dedupe logs
        return inFlight.get(key);
      }
      console.log(`Cache miss for ${key} - fetching...`); // Uncomment for miss logs
      const promise = fetch(`https://jsonplaceholder.typicode.com/${key}`)
        .then(res => res.json())
        .then(data => {
          cache.set(key, data);
          inFlight.delete(key);
          return data;
        });
      inFlight.set(key, promise);
      return promise;
    };
  };
  // const cachedFetch = createApiCache();

  // Expensive computation - without memo, this runs every render
  const filteredData = data.filter(item => item % 2 === 0); // Uncomment for "before" (slow)
  // const filteredData = useMemo(() => {
  //   console.log('Running expensive filter...'); // Uncomment to show re-computes
  //   return data.filter(item => item % 2 === 0);
  // }, [data]);

  // Callback function - without useCallback, recreates every time
  const handleFetch = async () => { // Uncomment for "before"
// const handleFetch = useCallback(async () => {
//     console.log('Fetching data...'); // Uncomment to show function recreations
//     const result = await cachedFetch('todos/1');
//     console.log('Fetched:', result); // Always log result for visibility
//   }, []);
}

  useEffect(() => {
    // Simulate multiple calls to show deduplication
    handleFetch();
    handleFetch(); // Second call should hit in-flight or cache
  }, [handleFetch]);

  return (
    <div>
      <h1>Demo 1: Memoization + Closure Caching</h1>
      <button onClick={() => setCount(count + 1)}>Re-render (Count: {count})</button>
      <button onClick={handleFetch}>Fetch Cached API</button>
      <p>Filtered Data Length: {filteredData.length}</p> {/* Display to force render */}
    </div>
  );
}

export default BasicCacheComponent;