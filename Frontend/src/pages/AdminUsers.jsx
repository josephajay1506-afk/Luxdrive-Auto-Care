import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import API from "../api/axios";

const formatDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return "—";
  return dt.toLocaleDateString();
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      // ✅ remove admins
      const onlyUsers = res.data.filter(u => u.role === "user");

      setUsers(onlyUsers);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-yellow-400 mb-10"
      >
        👑 Admin — Users Panel
      </Motion.h1>

      {loading && <p className="text-gray-400">Loading users...</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((u) => (
          <Motion.div
            key={u._id}
            whileHover={{ scale: 1.04 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-6
                       hover:border-yellow-500 hover:shadow-yellow-500/20 transition"
          >

            <h2 className="text-2xl font-bold mb-2">{u.name}</h2>

            <div className="space-y-1 text-gray-300">

              <p>📧 {u.email}</p>
              <p>📱 {u.phone || "Not Saved"}</p>

              <p>🏠 {u.address || "Not Saved"}</p>
              <p>🌆 {u.city || "Not Saved"}</p>
              <p>🗺 {u.state || "Not Saved"}</p>
              <p>📮 {u.pincode || "Not Saved"}</p>

              <p>
                Membership:
                {u.membership?.isActive ? (
                  <span className="ml-2 text-yellow-400 font-semibold">
                    {u.membership.plan}
                  </span>
                  ) : (
                  <span className="ml-2 text-gray-500">None</span>
                )}
              </p>
              {u.membership?.isActive && (
                <div className="text-sm text-gray-400 ml-1">
                  <p>User Registration Date: {formatDate(u.createdAt)} </p>
                  <p>Membership Joined Date: {formatDate(u.membership.startDate)}</p>
                  <p>Membership Expiry Date: {formatDate(u.membership.expiryDate)}</p>
            </div>
          )}
          </div>
          </Motion.div>
        ))}

      </div>
    </div>
  );
};

export default AdminUsers;
