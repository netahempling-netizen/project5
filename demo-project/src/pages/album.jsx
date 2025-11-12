import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getAlbumsByUser } from "./api";
import { useNavigate } from "react-router";
import { createAlbum, deleteAlbum, getPhotosByAlbum, deletePhoto } from "./api";

export default function AlbumsPage() {
  const { user } = useContext(UserContext);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (user) {
      getAlbumsByUser(user.id).then(setAlbums);
    }
  }, [user]);

  function goToPhotos(albumId) {
    navigate(`/home/albums/${albumId}`);
  }
  async function handleAddAlbum() {
    if (!newTitle.trim()) return alert("Please enter title");

    const newAlbum = {
      userId: user.id,
      title: newTitle,
    };

    const created = await createAlbum(newAlbum);
    setAlbums((prev) => [...prev, created]);
    setNewTitle("");
  }
  async function handleDelete(albumId) {
    const photos = await getPhotosByAlbum(albumId);
    for (const a of photos) await deletePhoto(a.id);

    await deleteAlbum(albumId);
    setAlbums((prev) => prev.filter((t) => t.id !== albumId));
  }

  return (
    <div>
      <h3>{user?.username}'s albums</h3>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => goToPhotos(album.id)}>{album.title}</button>{" "}
            <button onClick={() => handleDelete(album.id)}>-</button>{" "}
          </li>
        ))}
      </ul>
      <input
        placeholder="New todo..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleAddAlbum}>+</button>
    </div>
  );
}
