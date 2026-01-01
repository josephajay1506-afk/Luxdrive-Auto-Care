import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setMessage("Registered successfully");
      console.log("REGISTER RESPONSE:", res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-700 text-white p-2 rounded">
          Register
        </button>

        {message && (
          <p className="text-center text-red-500 mt-3">{message}</p>
        )}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
          Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
