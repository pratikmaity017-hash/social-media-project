import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import api from "../api/axios";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user } = useAuth();

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(
    user?.followersCount || 0,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  useEffect(() => {
    getProfile();
  }, [id]);

  const getProfile = async () => {
    try {
      const res = await api.get(`/users/${id}`);

      setProfile(res.data);
      setIsFollowing(res.data.isFollowing);
      setFollowersCount(res.data.user.followersCount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await api.post(`/users/${id}/follow`);

      setIsFollowing(res.data.isFollowing);
      setFollowersCount(res.data.followersCount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", bio);

      if (file) {
        formData.append("avatar", file);
      }

      const res = await api.patch("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        user: res.data.user,
      }));

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <img
        src={profile.user.avatar ? profile.user.avatar : "/default-avatar.png"}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover"
      />

      <h1 className="text-2xl font-bold mt-2">{profile.user.username}</h1>

      <p>{profile.user.bio}</p>

      <div className="mt-3">
        {user?.id === profile.user._id ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-gray-800 text-white rounded"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {isEditing && (
        <div className="mt-4 border p-4 rounded">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <textarea
            value={bio}
            placeholder="Update your bio"
            onChange={(e) => setBio(e.target.value)}
            className="w-full border mt-2 p-2"
          />

          <button
            onClick={handleUpdateProfile}
            className="bg-green-500 text-white px-4 py-1 mt-2 rounded"
          >
            Save
          </button>
        </div>
      )}

      <div className="flex gap-6 mt-4">
        <span>{profile.user.postCount} Posts</span>
        <span>{followersCount} Followers</span>
        <span>{profile.user.followingCount} Following</span>
      </div>

      <div className="max-w-2xl mx-auto mt-20 space-y-5">
        {profile.posts?.length > 0 ? (
          profile.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })
        ) : (
          <p> No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
