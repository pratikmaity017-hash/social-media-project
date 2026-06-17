import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const res = await api.get("/posts/feed");

      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId),
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2>Loading</h2>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2>No Post Found</h2>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto mt-20 space-y-5">
      {posts.map((post) => {
        return (
          <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
        );
      })}
    </div>
  );
};

export default Feed;
