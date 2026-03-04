import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaBell, FaTrash, FaCar, FaUserEdit, FaTools, FaCrown } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
      await API.put("/notifications/mark-read");
    } catch {
      console.log("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const clearAll = async () => {
    await API.delete("/notifications/clear");
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getIcon = (message) => {
    if (message.includes("Vehicle")) return <FaCar className="text-blue-400" />;
    if (message.includes("profile")) return <FaUserEdit className="text-purple-400" />;
    if (message.includes("Membership")) return <FaCrown className="text-yellow-500" />;
    return <FaTools className="text-green-400" />;
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaBell className="text-yellow-400 animate-pulse" /> Notifications
          </h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-400 hover:underline"
          >
            ← Back to Home
          </button>

          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-lg transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg ${
            filter === "unread"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Unread
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Loading notifications...</p>}

      {/* EMPTY */}
      {!loading && filteredNotifications.length === 0 && (
        <div className="bg-white/10 p-10 rounded-xl text-center text-gray-400 shadow-xl">
          No notifications yet 🚀
        </div>
      )}

      {/* LIST */}
      <div className="space-y-6">
        {filteredNotifications.map((n) => (
          <div
            key={n._id}
            className={`relative p-6 rounded-2xl shadow-xl transition-all duration-300
              bg-white/10 border border-white/20
              hover:scale-[1.01] hover:shadow-white/30 hover:border-white/70
              ${!n.read && "border-l-4 hover:border-blue-500"}
            `}
          >
            {/* ICON */}
            <div className="absolute top-5 left-5 text-2xl">
              {getIcon(n.message)}
            </div>

            {/* CONTENT */}
            <div className="ml-12">
              <p className="text-lg font-semibold">{n.message}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            {/* BADGE */}
            {!n.read && (
              <span className="absolute top-4 right-4 bg-red-600 text-xs px-3 py-1 rounded-full animate-pulse">
                NEW
              </span>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
