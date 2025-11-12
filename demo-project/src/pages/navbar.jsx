import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav>
      <h3>Welcome, {user?.name}</h3>
      <button onClick={onLogout}>Logout</button>
      <button onClick={() => navigate("/home/info")}>info</button>
      <br />
      <br />
      <Link to="/home/todos"> Todos </Link>
      <Link to="/home/posts"> Posts </Link>
      <Link to="/home/albums"> Albums </Link>
      <br />
    </nav>
  );
}
