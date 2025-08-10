import { useRef } from 'react';
import {usePersistentCache} from '../hooks/usePersistentCache';

function PersistentCacheComponent() {
  const [todos, setTodos] = usePersistentCache('demoTodos', []);
  const inputRef = useRef('');

  const addTodo = () => {
    if (inputRef.current.value) {
      setTodos([...todos, inputRef.current.value]);
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <h1>Demo 2: Persistent Cache Hook</h1>
      <input ref={inputRef} placeholder="New Todo" />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
      <p>Reload the page—todos persist!</p>
    </div>
  );
}

export default PersistentCacheComponent;