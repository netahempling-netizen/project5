import { useContext } from "react";
import UserContext from "../context/user";
import { useNavigate } from "react-router";
import {
  getAlbumsByUser,
  getTodosByUser,
  deleteTodo,
  getPostsByUser,
  deletePost,
  deleteAlbum,
  deleteUser,
} from "./api";
export default function InfoPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleDelete() {
    if (!user) return;
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      console.log("Deleting user ID:", user.id);

      // Delete all user-related data first
      const todos = await getTodosByUser(user.id);
      for (const t of todos) await deleteTodo(t.id);

      const posts = await getPostsByUser(user.id);
      for (const p of posts) await deletePost(p.id);

      const albums = await getAlbumsByUser(user.id);
      for (const a of albums) await deleteAlbum(a.id);

      // Then delete the user
      await deleteUser(user.id);

      setUser(null);
      alert("Account deleted");
      navigate("/register");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account: " + err.message);
    }
  }

  return (
    <div>
      {" "}
      <div>
        <h2>{user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>PAssword: *******</p>
        <p>Address: {user.address}</p>
        <p>Phone:{user.phone}</p>
      </div>
      <button onClick={handleDelete}>delete account</button>
    </div>
  );
}
