import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import API from "../api/axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ declare first — no hoisting error
  const loadMessages = async () => {
    try {
      setError("");
      const res = await API.get("/contact/admin");
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const removeMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await API.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">

      <h1 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
        📩 Customer Messages Panel
      </h1>

      {loading && (
        <div className="text-center text-gray-400">
          Loading messages...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 mb-6">
          {error}
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-500">
          No messages yet.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {messages.map(msg => (
          <div
            key={msg._id}
            whileHover={{ scale: 1.04 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-yellow-500/10 hover:shadow-yellow-500/20 transition"
          >

            <div className="space-y-2 mb-10">

              <p className="font-semibold text-xl text-yellow-400">
                👤 {msg.name}
              </p>

              <p className="text-xl text-gray-300">
                📧 {msg.email}
              </p>

              <p className="text-xl text-gray-300">
                📱 {msg.phone || "—"}
              </p>

              <p className="mt-3 text-xl text-gray-200">
                📝 {msg.message}
              </p>

              <p className="text-md text-gray-500 pt-3">
                {new Date(msg.createdAt).toLocaleString()}
              </p>

            </div>

            {/* ✅ fixed bottom-right delete button */}
            <button
              onClick={() => removeMessage(msg._id)}
              className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Delete
            </button>
            </div>
        ))}

      </div>

    </div>
  );
};

export default AdminMessages;
