import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreatePost = () => {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("image", image);

      const res = await api.post("/post/createpost", formData);

      alert("Post created successfully");
      navigate("/posts/feed");
    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white border rounded-lg p-5">
      <h1 className="text-2xl font-bold mb-5">Create Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded p-3 resize-none"
          rows={4}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full rounded-lg max-h-100 object-cover"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
