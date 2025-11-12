import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPhotosByAlbum, createPhoto, deletePhoto } from "./api";

export default function AlbumIndividualPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [url, setUrl] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    async function fetchPhotos() {
      const photosData = await getPhotosByAlbum(albumId);
      setAlbumTitle(`Album ${albumId}`);
      setPhotos(photosData);
    }

    fetchPhotos();
  }, [albumId]);

  async function handleAddPhoto() {
    if (!newTitle.trim()) return alert("Please enter a photo title");
    if (!url.trim()) return alert("Please enter a photo url");

    const newPhoto = {
      albumId: albumId,
      title: newTitle,
      url: url,
      thumbnailUrl: url,
    };

    const created = await createPhoto(newPhoto);
    setPhotos((prev) => [...prev, created]);
    setNewTitle("");
    setUrl("");
  }

  async function handleDelete(photoId) {
    await deletePhoto(photoId);
    setPhotos((prev) => prev.filter((t) => t.id !== photoId));
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 5); // Show 5 more photos
  }

  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <div>
      <button onClick={() => navigate("/home/albums")}>Back to Albums</button>
      <h2>{albumTitle}</h2>

      <div>
        {visiblePhotos.length > 0 ? (
          visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              <p>{photo.title}</p>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ maxWidth: "150px" }}
              />
              <button
                onClick={() => handleDelete(photo.id)}
                style={{ marginLeft: "5px" }}
              >
                -
              </button>
            </div>
          ))
        ) : (
          <p>No photos in this album</p>
        )}

        {/* Load More button */}
        {visibleCount < photos.length && (
          <button onClick={handleLoadMore} style={{ marginTop: "10px" }}>
            Load More
          </button>
        )}

        <div style={{ marginTop: "20px" }}>
          <input
            placeholder="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
          <button onClick={handleAddPhoto} style={{ marginLeft: "5px" }}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
