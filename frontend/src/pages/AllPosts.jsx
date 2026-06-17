import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    try {
      const res = await api.get("/posts/");

      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-20">Loading...</h2>;
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
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
};

export default AllPosts;
