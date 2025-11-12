import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPhotosByAlbum, getPhotos } from "./api";

export default function AlbumIndividualPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");

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

  return (
    <div>
      <button onClick={() => navigate("/home/albums")}> Back to Albums</button>
      <h2>{albumTitle}</h2>

      <div>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} style={{ textAlign: "center" }}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))
        ) : (
          <p>No photos in this album</p>
        )}
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
