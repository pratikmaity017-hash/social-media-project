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

  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [postData, setPostData] = useState(post);
  const [editedImage, setEditedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(postData?.image);

  const [showMenu, setShowMenu] = useState(false);

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

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("caption", editedCaption);

      if (editedImage) {
        formData.append("image", editedImage);
      }

      const res = await api.patch(`/posts/${postData._id}`, formData);

      setPostData(res.data.post);
      setEditedCaption(res.data.post.caption);

      setPreviewImage(res.data.post.image);
      setEditedImage(null);

      setIsEditing(false);
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    console.log("logged user id:", user?.id);
    console.log("post author:", postData.author);
  }, [user, postData]);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  return (
    <div className="bg-white border rounded-lg p-4">
      {/* User Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={postData.author?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <Link
            to={`/profile/${postData.author._id}`}
            className="font-semibold"
          >
            {postData.author?.username}
          </Link>
        </div>

        {user?.id === postData.author?._id && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-xl px-2 hover:bg-gray-100 rounded"
            >
              ⋮
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    setEditedCaption(postData.caption);
                    setPreviewImage(postData.image);
                    setEditedImage(null);

                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Caption*/}
      {isEditing ? (
        <div className="mb-3">
          <textarea
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setEditedImage(file);
              setPreviewImage(URL.createObjectURL(file));
            }}
            className="mt-2"
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              className="w-full rounded-lg max-h-75 object-cover mt-2"
            />
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded hover:cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditedCaption(postData.caption);
                setPreviewImage(postData.image);
                setEditedImage(null);
                setIsEditing(false);
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-3">{postData.caption}</p>
      )}

      {/* Image*/}

      {postData.image && (
        <img
          src={postData.image}
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
