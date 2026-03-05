import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
 
  const navigate = useNavigate();

  // ================= LOAD BOOKINGS =================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Bookings load error:", err.response?.data);
        setError("Failed to load service bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ================= DELETE =================
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete booking");
    }
  };

  // =============== FETCH USER ===================
  useEffect(() => {

  const fetchUser = async () => {
    try {

      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUser(res.data);

    } catch (err) {

      console.error("User fetch error:", err);

    }
  };

  fetchUser();

}, []);

  // ================= DATE FORMAT =================
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // ================= STATUS BADGE =================
  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold";

    switch (status) {
      case "Pending":
        return `${base} bg-yellow-200 text-yellow-800`;
      case "Diagnosis":
        return `${base} bg-blue-200 text-blue-800`;
      case "Service In Progress":
        return `${base} bg-purple-200 text-purple-800`;
      case "Invoice Generated":
        return `${base} bg-indigo-200 text-indigo-800`;
      case "Completed":
        return `${base} bg-green-200 text-green-800`;
      case "Cancelled":
        return `${base} bg-red-200 text-red-800`;
    }
  };
  

  // ================= UI =================
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 relative"
      style={{ backgroundImage: "url('/images/service-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">
          My Service Bookings 📋
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 mb-6 text-center font-medium">
          ⚠️ {error}
        </p>
      )}

      {/* Loading */}
      {loading && <Loader />}

      {/* Empty */}
      {!loading && bookings.length === 0 && !error && (
        <div className="bg-black/50 border border-white/10 rounded-xl p-8 text-center text-gray-400">
          No service bookings found 🚫
        </div>
      )}

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="
              animate-fade-in bg-black backdrop-blur-lg border border-white/10 
                 rounded-2xl p-6 shadow-xl text-white 
                 hover:scale-105 transition duration-300 
                 hover:shadow-white/50 hover:border-white
                 flex flex-col"
          >
            {/* Vehicle */}
            <h3 className="text-xl font-bold text-white mb-2">
              🚗 {b.vehicleName || "Vehicle N/A"}
            </h3>

            {/* Customer */}
            <p className="text-xl-gray-300 mb-2">
              👤 {b.customerName}
            </p>

            {/* ================= SERVICES ================= */}
            <div className="mb-3"> 
              <p className="text-xl font-semibold text-purple-400 mb-1"> 
                🛠️ Services 
              </p> 
              {b.services?.length > 0 ? ( 
                <ul className="text-lg-sm text-gray-300 space-y-1"> 
                {b.services.map((s, i) => ( 
                  <li key={i}> 
                  • {s.name} 
                  </li> 
                ))} 
              </ul> 
            ) : ( 
            <p className="text-gray-500 text-sm"> 
            No services listed </p> 
          )} 
          </div>
          {/* ================= ACCESSORIES ================= */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-cyan-400 mb-2">
              🧰 Accessories
            </p>
            {b.accessories?.length > 0 ? ( 
                <ul className="text-lg-sm text-gray-300 space-y-1"> 
                {b.accessories.map((a, i) => ( 
                  <li key={i}> 
                  • {a.name} 
                  </li> 
                ))} 
              </ul> 
            ) : ( 
            <p className="text-gray-500 text-sm"> 
            No accessories listed</p> 
          )} 
          </div>

            {/* Date */}
            <p className="text-gray-300 mb-2">
              📅 {formatDate(b.serviceDate)}
            </p>

            {/* Membership */}
            <p>
              {user?.membership?.isActive ? (
                <span className="text-lg text-yellow-400 mb-3">
                  👑 Membership: {user.membership.plan}
                </span>
              ) : (
              <span className="text-gray-400">No active membership</span>
              )}
            </p>

            {b.customerNote && (
                <p className="text-sm text-gray-400 mt-2">
                  📝 {b.customerNote}
                </p>
              )}

            {/* Status */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg text-gray-400">Status</span>
              <span className={statusBadge(b.status)}>
                {b.status}
              </span>
            </div>
            <div className="bg-white/10 p-6 rounded-xl mt-6">
  <h3 className="text-lg font-bold mb-6">
    📍 Booking Timeline
  </h3>

  <div className="relative">
            {b.statusHistory?.map((item, index) => {
  const date = new Date(item.updatedAt);

  return (
    <div key={index} className="relative flex items-start gap-4 pb-8">

      <span className="relative z-10 w-4 h-4 bg-green-500 rounded-full mt-1"></span>

      <div>
        <p className="font-semibold text-white">
          {item.status}
        </p>

        <p className="text-sm text-gray-400">
          {date && !isNaN(date)
            ? date.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "Time not available"}
        </p>
      </div>
    </div>
  );
})}
  </div>
</div>
            {/* Delete */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => deleteBooking(b._id)}
                className="absolute-bottom text-red-400 hover:text-red-300 text-sm font-semibold"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
