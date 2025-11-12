import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getAlbumsByUser } from "./api";
import { useNavigate } from "react-router";

export default function AlbumsPage() {
  const { user } = useContext(UserContext);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getAlbumsByUser(user.id).then(setAlbums);
    }
  }, [user]);

  function goToPhotos(albumId) {
    navigate(`/home/albums/${albumId}`);
  }

  return (
    <div>
      <h3>{user?.username}'s albums</h3>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => goToPhotos(album.id)}>{album.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
