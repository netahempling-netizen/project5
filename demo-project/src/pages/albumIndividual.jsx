import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPhotosByAlbum, getPhotos, deletePhoto, createPhoto } from "./api";

export default function AlbumIndividualPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      const albumData = await getPhotos;
      setAlbumTitle(albumData.title);

      const photosData = await getPhotosByAlbum(albumId);
      console.log("Photos Data", photosData);
      setPhotos(photosData);
    }

    fetchPhotos();
  }, [albumId]);

  async function handleAddPhoto() {
    if (!newTitle.trim()) return alert("Please enter a photo url");

    const newPhoto = {
      albumId: albumId,
      title: newTitle,
      url: url,
      thumbnailUrl: url,
    };

    const created = await createPhoto(newPhoto); // send to server
    setPhotos((prev) => [...prev, created]); // update state
    setNewTitle(""); // clear input
    setUrl("");
  }
  async function handleDelete(photoId) {
    await deletePhoto(photoId);
    setPhotos((prev) => prev.filter((t) => t.id !== photoId));
  }

  return (
    <div>
      <button onClick={() => navigate("/home/albums")}> Back to Albums</button>
      <h2>{albumTitle}</h2>
      <div>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} style={{ textAlign: "center" }}>
              <p>{photo.title}</p>
              <img src={photo.thumbnailUrl} alt={photo.title} />{" "}
              <button onClick={() => handleDelete(photo.id)}>-</button>{" "}
            </div>
          ))
        ) : (
          <p>No photos in this album</p>
        )}
        <div>
          <input
            placeholder="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleAddPhoto}>+</button>
        </div>
      </div>
    </div>
  );
}

/* {photos.map((photo) => (
          <div key={photo.id} style={{ textAlign: "center" }}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
} */
