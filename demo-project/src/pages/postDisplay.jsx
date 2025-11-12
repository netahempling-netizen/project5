import { useState, useContext } from "react";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from "./api";
import UserContext from "../context/user";

export default function Post({ post }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  async function handleToggleComments() {
    if (!showComments) {
      const data = await getCommentsByPost(post.id);
      setComments(data);
    }
    setShowComments((prev) => !prev);
  }

  async function handleAddComment() {
    if (!newComment.trim()) return alert("Please enter a comment");

    const newC = {
      postId: post.id,
      body: newComment,
      userId: user.id,
    };

    const created = await createComment(newC);
    setComments((prev) => [...prev, created]);
    setNewComment("");
  }

  async function handleDeleteComment(commentId) {
    // Removed confirmation prompt
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  function startEditing(comment) {
    setEditingCommentId(comment.id);
    setEditingText(comment.body);
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditingText("");
  }

  async function saveEdit(commentId) {
    if (!editingText.trim()) return alert("Comment cannot be empty");

    const updated = await updateComment(commentId, { body: editingText });
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, body: updated.body } : c))
    );
    cancelEditing();
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h4>{post.title}</h4>
      <p>{post.body}</p>

      <button onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>

      {showComments && (
        <div style={{ marginTop: "10px" }}>
          <ul>
            {comments.length > 0 ? (
              comments.map((c) => (
                <li key={c.id} style={{ marginBottom: "5px" }}>
                  <strong>User {c.userId}</strong>:{" "}
                  {editingCommentId === c.id ? (
                    <>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button onClick={() => saveEdit(c.id)}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {c.body}
                      {c.userId === user.id && (
                        <>
                          <button
                            onClick={() => startEditing(c)}
                            style={{ marginLeft: "5px" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            style={{ marginLeft: "5px", color: "red" }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))
            ) : (
              <li>No comments yet</li>
            )}
          </ul>

          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}
