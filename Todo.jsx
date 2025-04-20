import './Todo.css';

function Todo({ id, text, completed, onComplete, onDelete }) {
  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={() => onComplete(id)} 
      />
      <span className="todo-text">{text}</span>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Todo;
