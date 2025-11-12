import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getTodosByUser, updateTodo, createTodo, deleteTodo } from "./api";

export default function TodosPage() {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (user) {
      getTodosByUser(user.id).then(setTodos);
    }
  }, [user]);

  async function handleToggle(todo) {
    const updated = { ...todo, completed: !todo.completed };
    await updateTodo(todo.id, { completed: updated.completed });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  }
  async function handleAddTodo() {
    if (!newTitle.trim()) return alert("Please enter a todo title");

    const newTodo = {
      userId: user.id,
      title: newTitle,
      completed: false,
    };

    const created = await createTodo(newTodo); // send to server
    setTodos((prev) => [...prev, created]); // update state
    setNewTitle(""); // clear input
  }
  async function handleDelete(todoId) {
    await deleteTodo(todoId); // delete from server
    setTodos((prev) => prev.filter((t) => t.id !== todoId)); // update UI
  }

  return (
    <div>
      <h3>{user?.username}'s Todos</h3>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => handleToggle(t)}
            />{" "}
            {t.title}
            <button onClick={() => handleDelete(t.id)}>-</button>{" "}
          </li>
        ))}
      </ul>
      <div>
        <input
          placeholder="New todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>+</button>
      </div>
    </div>
  );
}
