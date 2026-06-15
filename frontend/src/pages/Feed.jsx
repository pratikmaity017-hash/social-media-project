import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await api.get("/posts/feed");

      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-20 space-y-5">
      feed
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
