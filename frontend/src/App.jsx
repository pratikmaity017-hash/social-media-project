import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import AllPosts from "./pages/AllPosts";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={< AllPosts />} />
          <Route path="/posts/feed" element={< Feed />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
