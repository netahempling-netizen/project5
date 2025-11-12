import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getPostsByUser, getCommentsByPost } from "./api";

export default function PostsPage() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      getPostsByUser(user.id).then(setPosts);
    }
  }, [user]);

  return (
    <div>
      <h3>{user.username}'s posts</h3>
      {posts.length === 0 ? (
        <p>No posts.</p>
      ) : (
        posts.map((p) => <Post key={p.id} post={p} />)
      )}
    </div>
  );
}

function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  async function handleToggleComments() {
    if (!showComments) {
      const data = await getCommentsByPost(post.id);
      setComments(data);
    }
    setShowComments((prev) => !prev);
  }

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>

      <button onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>

      {showComments && (
        <div>
          <ul>
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong>: {c.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
