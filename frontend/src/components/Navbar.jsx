import { Link } from "react-router-dom";
import { FaHome, FaPlusSquare, FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full h-14 border-b flex items-center justify-between px-6 bg-white fixed top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        SocialApp
      </Link>

      {/* middle icons*/}
      <div className="flex items-center gap-8 text-xl">
        <Link to="/">
          <FaHome className="hover:text-blue-500 cursor-pointer" />
        </Link>

        <Link to="/create">
          <FaPlusSquare className="hover:text-green-500 cursor-pointer" />
        </Link>

        <Link to="notifications">
          <FaBell className="hover:text-red-500 cursor-pointer" />
        </Link>
      </div>

      {/* profile*/}
      <Link to="/profile/me">
        <FaUser className="text-xl hover:text-gray-600 cursor-pointer" />
      </Link>
    </nav>
  );
};

export default Navbar;
