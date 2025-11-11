import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getPostsByUser } from "./api";

export default function TodosPage() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      getPostsByUser(user.id).then(setPosts);
    }
  }, [user]);

  return (
    <div>
      <h3>{user?.username}'s posts</h3>
      <ul>
        {posts.map((p) => (
          <div key={p.id}>{p.title}</div>
        ))}
      </ul>
    </div>
  );
}
