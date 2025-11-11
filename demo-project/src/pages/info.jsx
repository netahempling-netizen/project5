import { useContext } from "react";
import UserContext from "../context/user";

export default function InfoPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {" "}
      <div>
        <h2>{user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Website: {user.website}</p>
        <p>Address: {user.address}</p>
        <p>Phone:{user.phone}</p>
      </div>
    </div>
  );
}
