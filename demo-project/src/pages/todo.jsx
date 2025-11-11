import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getTodosByUser } from "./api";

export default function TodosPage() {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      getTodosByUser(user.id).then(setTodos);
    }
  }, [user]);

  return (
    <div>
      <h3>{user?.username}'s Todos</h3>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} readOnly /> {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
