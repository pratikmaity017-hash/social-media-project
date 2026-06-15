const PostCard = ({ post }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <h2 className="font-semibold">{post.author?.username}</h2>
      </div>

      {/* Caption*/}
      <p className="mb-3">{post.caption}</p>

      {/* Image*/}

      {post.image && (
        <img src={post.image} alt="post" className="w-full rounded-lg" />
      )}

      {/* Like Count */}
      <div className="mt-3">❤️ {post.likes.length} Likes</div>
    </div>
  );
};

export default PostCard;
