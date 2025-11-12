// const BASE_URL = "https://jsonplaceholder.typicode.com";
// export async function getUserByUsername(username) {
//   const res = await fetch(`${BASE_URL2}/users?username=${username}`);
//   console.log(res.json);
//   return res.json();
// }
// export async function getTodosByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/todos`);
//   return res.json();
// }
// export async function getPostsByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/posts`);
//   return res.json();
// }

// export async function getAlbumsByUser(userId) {
//   const res = await fetch(`${BASE_URL2}/users/${userId}/albums`);
//   return res.json();
// }
const BASE_URL = "http://localhost:3000";
//users
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}
export async function getUserByUsername(username) {
  const res = await fetch(`${BASE_URL}/users?username=${username}`);
  const data = await res.json();
  console.log(data);
  return data[0];
}

export async function createUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id, updatedUser) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  return res.json();
}

//post
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
}

export async function getPostsByUser(userId) {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id) {
  await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
}

//comments
export async function getComments() {
  const res = await fetch(`${BASE_URL}/comments`);
  return res.json();
}

export async function getCommentsByPost(postId) {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  return res.json();
}

export async function createComment(newComment) {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
  return res.json();
}

export async function updateComment(commentId, updatedComment) {
  const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComment),
  });
  return res.json();
}

export async function deleteComment(commentId) {
  const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
  });
  return res.json();
}

//albums
export async function getAlbums() {
  const res = await fetch(`${BASE_URL}/albums`);
  return res.json();
}

export async function getAlbumsByUser(userId) {
  const res = await fetch(`${BASE_URL}/albums?userId=${userId}`);
  return res.json();
}

export async function createAlbum(album) {
  const res = await fetch(`${BASE_URL}/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(album),
  });
  return res.json();
}

export async function updateAlbum(id, data) {
  const res = await fetch(`${BASE_URL}/albums/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAlbum(id) {
  await fetch(`${BASE_URL}/albums/${id}`, { method: "DELETE" });
}

//photos
export async function getPhotos() {
  const res = await fetch(`${BASE_URL}/photos`);
  return res.json();
}

export async function getPhotosByAlbum(albumId) {
  const res = await fetch(`${BASE_URL}/photos?albumId=${albumId}`);
  return res.json();
}

export async function createPhoto(photo) {
  const res = await fetch(`${BASE_URL}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo),
  });
  return res.json();
}

export async function updatePhoto(id, data) {
  const res = await fetch(`${BASE_URL}/photos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePhoto(id) {
  await fetch(`${BASE_URL}/photos/${id}`, { method: "DELETE" });
}

//todos
export async function getTodos() {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
}

export async function getTodosByUser(userId) {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`);
  return res.json();
}

export async function createTodo(todo) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function updateTodo(id, data) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
}
