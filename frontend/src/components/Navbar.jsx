import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlusSquare,
  FaBell,
  FaUser,
  FaNewspaper,
  FaStream,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="w-full h-14 border-b flex items-center justify-between px-6 bg-white fixed top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        SocialApp
      </Link>

      {/* middle icons*/}
      <div className="flex items-center gap-6 ">
        <Link to="/">
          <FaHome className="hover:text-blue-500 cursor-pointer" />
        </Link>

        <Link to="/posts/feed">
          <FaUsers className="hover:text-blue-500 cursor-pointer" />
        </Link>

        <Link to="/create">
          <FaPlusSquare className="hover:text-green-500 cursor-pointer" />
        </Link>

        <Link to="/notifications">
          <FaBell className="hover:text-red-500 cursor-pointer" />
        </Link>
      </div>

      {/* profile*/}
      <div>
        {user ? (
          <Link to={`/profile/${user.id}`}>
            <FaUser className="text-xl hover:text-gray-600 cursor-pointer" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
