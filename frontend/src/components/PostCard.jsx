import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();

  // const isLiked = post.likes?.includes(user?._id);

  // const [liked, setLiked] = useState(post.likes?.includes(user?._id));
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (user) {
      setLiked(post.likes?.includes(user.id));
    }
  }, [user, post.likes]);

  const handleLike = async () => {
    try {
      const res = await api.post(`/post/${post._id}/like`);

      setLikesCount(res.data.likescount);
      setLiked((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/post/${post._id}/comment`, {
        text: commentText,
      });

      setComments(res.data.comments);
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/post/${post._id}`);

      onDelete(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  return (
    <div className="bg-white border rounded-lg p-4">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <Link to={`/profile/${post.author._id}`} className="font-semibold">
          {post.author?.username}
        </Link>
      </div>

      {/* Caption*/}
      <p className="mb-3">{post.caption}</p>

      {/* Image*/}

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-lg max-h-[500px] object-cover"
        />
      )}

      {/* Like Count */}
      <div className="mt-3">❤️ {likesCount} Likes</div>

      <div className="flex gap-4 mt-3">
        <button onClick={handleLike} className="hover:cursor-pointer">
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <button>🔖 Save</button>

        {user?.id === post.author?._id && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:cursor-pointer"
          >
            🗑️ Delete
          </button>
        )}
      </div>

      <div className="mt-4 border-t pt-3">
        <p className="font-semibold mb-2">Comments</p>
        {/* Comments List */}

        {comments.map((c, index) => {
          return (
            <div key={index} className="text-sm mb-1">
              <span className="font-medium">{c.user?.username}:</span> {c.text}
            </div>
          );
        })}

        {/*Input Box*/}

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
            placeholder="Write a comment..."
            className="border flex-1 p2
             rounded"
          />

          <button
            onClick={handleComment}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
