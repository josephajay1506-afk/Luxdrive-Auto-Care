import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { loginUser } from "../utils/auth";
import Toast from "../components/Toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // save token + user
      loginUser(res.data);

      setToast("Login successful ✅");
      setTimeout(() => setToast(""), 2000);

      // redirect after delay
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/login-bg.png')" }}
    >
      {toast && <Toast message={toast} />}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Login Card */}
      <div className="relative bg-black w-[360px] h-[360px] rounded-lg shadow-xl p-6 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-center mb-2 text-white font-large">
          Welcome to LuxDrive Auto Care
        </h3>
        <h2 className="text-xl font-bold text-center mb-4 text-white">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm text-center mb-2">
            {success}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 text-white border px-3 py-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 text-white border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login 
          </button>
        </form>

        <p className="text-sm text-white text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
