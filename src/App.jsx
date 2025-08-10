import React, { useRef } from 'react';
import BasicCacheComponent from './components/BasicCacheComponent.jsx';
// import PersistentCacheComponent from './components/PersistentCacheComponent.jsx';
// import ChildComponent from './components/ChildComponent.jsx';
// import { usePersistentCache } from './hooks/usePersistentCache.js';
// import globalCache from './services/globalCache.js'; // Assuming you have a global cache service
function App() {
  //const cacheKey = 'sharedKey'; // Shared across components\
  // const [todos, setTodos] = usePersistentCache('demoTodos', []);
  // const inputRef = useRef('');

  // const addTodo = () => {
  //   if (inputRef.current.value) {
  //     setTodos([...todos, inputRef.current.value]);
  //     inputRef.current.value = '';
  //   }
  // };

  console.log("hello world");

  return (
    <div>
      <h1>Hello There</h1>
      {/*Demo: 1*/}   
     <BasicCacheComponent/>
      {/*Demo: 2*/}
      {/* <PersistentCacheComponent /> */}
    {/* <h1>Demo 2: Persistent Cache Hook</h1>
      <input ref={inputRef} placeholder="New Todo" />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
      <p>Reload the page—todos persist!</p> */}
      {/*Demo: 3*/ }
      {/* <h1>Demo 3: Global Cache Service</h1>
      <ChildComponent cacheKey={cacheKey} />
      <ChildComponent cacheKey={cacheKey} />  Should share cache - no double fetch
      <button onClick={() => globalCache.clear(cacheKey)}>Clear Cache</button> */}
    </div>
  );
}

export default App;