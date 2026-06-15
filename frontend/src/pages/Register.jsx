import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";

const Register = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlerRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registerd Successfully");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handlerRegister}
        className="p-6 border rounded w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold text-center">Register</h1>

        <input
          className="border p-2"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

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

        <button className="bg-blue-500 text-white p-2">Register</button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
