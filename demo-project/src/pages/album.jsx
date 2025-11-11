import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getAlbumsByUser } from "./api";

export default function AlbumsPage() {
  const { user } = useContext(UserContext);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (user) {
      getAlbumsByUser(user.id).then(setAlbums);
    }
  }, [user]);

  return (
    <div>
      <h3>{user?.username}'s albums</h3>
      <ul>
        {albums.map((p) => (
          <div key={p.id}>{p.title}</div>
        ))}
      </ul>
    </div>
  );
}
