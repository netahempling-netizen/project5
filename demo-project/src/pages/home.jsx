import { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router";
import UserContext from "../context/user";
import Navbar from "./navbar";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  function handleLogout() {
    setUser(null);
  }

  if (!user) return null;

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Outlet />
    </div>
  );
}
