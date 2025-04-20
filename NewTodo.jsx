import './NewTodo.css'
import { useState } from 'react';

function NewTodo({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    addTodo(input);
    setInput("");
  };

  return (
    <section id="new-todo">
      <form id="to-do-form" onSubmit={handleSubmit}>
        <input type="text" id="new-todo" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" className="todo-button">Add</button>
      </form>
    </section>
  );
}
export default NewTodo;