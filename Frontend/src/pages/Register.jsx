import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Toast from "../components/Toast";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      setToast("Account created successfully ✅");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/src/assets/login-bg.png')" }}
    >
      {toast && <Toast message={toast} />}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card */}
      <div className="relative bg-black w-full max-w-sm p-8 rounded-xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-white text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
