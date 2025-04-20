import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import wustlLogo from './assets/wustl.svg'
import './App.css'
import Todo from './Todo';
import NewTodo from './NewTodo';
import { useEffect, useState } from 'react';

function App() {
  const API_KEY = '2677cc-f5dcf7-8e094f-185d20-7e583a';
  const baseURL = 'https://cse204.work/todos';

  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('date-descend');

  useEffect(() => {
    fetch(baseURL, {
      headers: {
        'x-api-key': API_KEY
      }
    })
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(err => {
        console.error("API Error:", err);
        setTodos([ // Fallback data
          { id: 1, text: "Sample Todo", completed: false, created_at: new Date().toISOString() }
        ]);
      });
  }, []);

  const sortTodos = (todos) => {
    const sorted = [...todos];
    switch (sortBy) {
      case 'date-ascend':
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'date-descend':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'alpha-ascend':
        return sorted.sort((a, b) => a.text.localeCompare(b.text));
      case 'alpha-descend':
        return sorted.sort((a, b) => b.text.localeCompare(a.text));
      case 'completed-ascend':
        return sorted.sort((a, b) => a.completed - b.completed);
      case 'completed-descend':
        return sorted.sort((a, b) => b.completed - a.completed);
      default:
        return sorted;
    }
  };

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => setTodos(sortTodos([data, ...todos])));
  };

  const handleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed })
    })
      .then(() => {
        setTodos(sortTodos(todos.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        )));
      });
  };

  const handleDelete = (id) => {
    fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
      headers: { 'x-api-key': API_KEY }
    })
      .then(() => setTodos(sortTodos(todos.filter(t => t.id !== id))));
  };
  return (
    <div className="header">
      <h1>My ToDo List</h1>
      <h2>Add in your To Do list and check them off when complete!</h2>

      <NewTodo addTodo={addTodo} />

      <label htmlFor="sort-select">Sort by: </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date-ascend">Oldest First</option>
        <option value="date-descend">Newest First</option>
        <option value="alpha-ascend">A-Z</option>
        <option value="alpha-descend">Z-A</option>
        <option value="completed-ascend">Incomplete First</option>
        <option value="completed-descend">Complete First</option>
      </select>

      <ul className="todo-list">
        {sortTodos(todos).map(todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;