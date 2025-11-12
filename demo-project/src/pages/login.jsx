import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { getUserByUsername } from "./api";
import UserContext from "../context/user";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await getUserByUsername(username);

    if (!user || user.website !== password) {
      setError("Invalid username or password");
      return;
    }

    setUser(user);
    navigate("/home");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => navigate("/register")}>register</button>
    </div>
  );
}
