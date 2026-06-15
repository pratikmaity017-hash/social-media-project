import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios";

const Login = () => {
  const { getCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      await getCurrentUser();

      alert("Login successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 border rounded w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="relative">
          <input
            className="border p-2 w-full pr-10 rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button className="bg-green-500 text-white p-2">Login</button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
