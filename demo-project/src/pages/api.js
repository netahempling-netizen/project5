// const BASE_URL = "https://jsonplaceholder.typicode.com";
const BASE_URL2 = "http://localhost:3000";

// export async function getUserByUsername(username) {
//   const res = await fetch(`${BASE_URL2}/users?username=${username}`);
//   console.log(res.json);
//   return res.json();
// }
export async function getUserByUsername(username) {
  const res = await fetch(`${BASE_URL2}/users?username=${username}`);
  const data = await res.json();
  console.log(data);
  return data[0];
}

// export async function getTodosByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/todos`);
//   return res.json();
// }
export async function getTodosByUser(userId) {
  const res = await fetch(`${BASE_URL2}/todos?userId=${userId}`);
  return res.json();
}

// export async function getPostsByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/posts`);
//   return res.json();
// }

export async function getPostsByUser(userId) {
  const res = await fetch(`${BASE_URL2}/posts?userId=${userId}`);
  return res.json();
}

// export async function getAlbumsByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/albums`);
//   return res.json();
// }
export async function getAlbumsByUser(userId) {
  const res = await fetch(`${BASE_URL2}/albums?userId=${userId}`);
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL2}/users`);
  return res.json();
}

export async function createUser(user) {
  const res = await fetch(`${BASE_URL2}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id, updatedUser) {
  const res = await fetch(`${BASE_URL2}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL2}/users/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getCommentsByPost(postId) {
  const res = await fetch(`${BASE_URL2}/comments?postId=${postId}`);
  return res.json();
}

export async function getPhotoByAlbum(albumId) {
  const res = await fetch(`${BASE_URL2}/photos?albumId=${albumId}`);
  return res.json();
}
