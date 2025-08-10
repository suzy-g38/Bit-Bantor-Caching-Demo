export default function ChildComponent({ cacheKey }) {
    const [data, setData] = useState(globalCache.get(cacheKey));
  
    useEffect(() => {
      if (!data) {
        // Simulate fetch
        const fetched = { message: 'Fetched data!' };
        globalCache.set(cacheKey, fetched);
        setData(fetched);
      }
    }, [cacheKey, data]);
  
    return <p>Child Data: {data ? data.message : 'Loading...'}</p>;
  }
  