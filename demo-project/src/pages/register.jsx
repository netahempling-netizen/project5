import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { createUser, getUsers } from "./api";
import UserContext from "../context/user";

function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const users = await getUsers();
    const nextId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      id: nextId,
      username: username,
      email: email,
      website: password,
      name: username,
      address: "",
      phone: "",
    };

    try {
      if (users.some((u) => u.username === username)) {
        setError("Username already exists");
        return;
      }

      const createdUser = await createUser(newUser);
      setUser(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser));

      alert("Registered successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}

export default RegisterPage;
