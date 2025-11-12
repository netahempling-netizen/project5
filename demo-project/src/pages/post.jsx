// import { useEffect, useState, useContext } from "react";
// import UserContext from "../context/user";
// import {
//   getPostsByUser,
//   createPost,
//   deletePost,
//   getCommentsByPost,
// } from "./api";

// export default function PostsPage() {
//   const { user } = useContext(UserContext);
//   const [posts, setPosts] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     if (user) {
//       getPostsByUser(user.id).then(setPosts);
//     }
//   }, [user]);

//   async function handleAddPost() {
//     if (!newTitle.trim()) return alert("Please enter title");
//     if (!body.trim()) return alert("Please enter content");

//     const newPost = {
//       userId: user.id,
//       title: newTitle,
//       body: body,
//     };

//     const created = await createPost(newPost);
//     setPosts((prev) => [...prev, created]);
//     setNewTitle("");
//     setBody("");
//   }
//   async function handleDelete(postId) {
//     await deletePost(postId);
//     setPosts((prev) => prev.filter((t) => t.id !== postId));
//   }

//   return (
//     <>
//       <div>
//         <h3>{user?.username}'s posts</h3>
//         <ul>
//           {posts.map((p) => (
//             <div key={p.id}>
//               {p.title}
//               <button onClick={() => handleDelete(p.id)}>-</button>{" "}
//             </div>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <input
//           placeholder="title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//         <br />
//         <input
//           placeholder="post"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <button onClick={handleAddPost}>+</button>
//       </div>
//     </>
//   );
// }

// function Post({ post }) {
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);

//   async function handleToggleComments() {
//     if (!showComments) {
//       const data = await getCommentsByPost(post.id);
//       setComments(data);
//     }
//     setShowComments((prev) => !prev);
//   }

//   return (
//     <div>
//       <h4>{post.title}</h4>
//       <p>{post.body}</p>

//       <button onClick={handleToggleComments}>
//         {showComments ? "Hide Comments" : "View Comments"}
//       </button>

//       {showComments && (
//         <div>
//           <ul>
//             {comments.map((c) => (
//               <li key={c.id}>
//                 <strong>{c.name}</strong>:{c.body}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getPostsByUser, createPost, deletePost } from "./api";
import Post from "./postDisplay";

export default function PostsPage() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (user) {
      getPostsByUser(user.id).then(setPosts);
    }
  }, [user]);

  async function handleAddPost() {
    if (!newTitle.trim()) return alert("Please enter title");
    if (!body.trim()) return alert("Please enter content");

    const newPost = {
      userId: user.id,
      title: newTitle,
      body: body,
    };

    const created = await createPost(newPost);
    setPosts((prev) => [...prev, created]);
    setNewTitle("");
    setBody("");
  }

  async function handleDelete(postId) {
    await deletePost(postId);
    setPosts((prev) => prev.filter((t) => t.id !== postId));
  }

  return (
    <>
      <div>
        <h3>{user?.username}'s posts</h3>
        <ul>
          {posts.map((p) => (
            <div key={p.id} style={{ marginBottom: "20px" }}>
              <Post post={p} />
              <button onClick={() => handleDelete(p.id)}>Delete Post</button>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <input
          placeholder="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </>
  );
}
