import React, { useRef } from 'react';
import BasicCacheComponent from './components/BasicCacheComponent.jsx';
import PersistentCacheComponent from './components/PersistentCacheComponent.jsx';
import ExampleChildComponent from './components/ExampleChildComponent.jsx';
// import { usePersistentCache } from './hooks/usePersistentCache.js';
import {globalCache} from './components/GlobalCacheComponent'; // Assuming you have a global cache service
import LRUCacheComponent from './components/LRUCacheComponent.jsx';


function App() {
  const cacheKey = 'sharedKey'; // Shared across components\

  return (
    <div>
      {/*Demo: 1*/}   
     {/* <BasicCacheComponent/> */}
      {/*Demo: 2*/}
      {/* <PersistentCacheComponent /> */}
      {/*Demo: 3*/ }
      {/* <h1>Demo 3: Global Cache Service</h1>
      <ExampleChildComponent cacheKey={cacheKey} /> */}
       {/*Should share cache - no double fetch*/}
      {/* <ExampleChildComponent cacheKey={cacheKey} /> 
      <button onClick={() => globalCache.clear(cacheKey)}>Clear Cache</button> */}
      {/*Demo: 4*/}
      <h1>Demo 4: LRU Cache</h1>
      <LRUCacheComponent/>
    </div>
  );
}

export default App;