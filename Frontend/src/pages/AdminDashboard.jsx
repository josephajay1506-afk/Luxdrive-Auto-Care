import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import AdminRevenueChart from "../components/AdminRevenueChart";
import AdminProfitChart from "../components/AdminProfitChart";
import AdminDailyRevenueChart from "../components/AdminDailyRevenueChart";
import AdminServicePopularityChart from "../components/AdminServicePopularityChart";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
 
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const bookingRes = await API.get("/bookings/admin");
      

      setBookings(bookingRes.data || []);
      
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

// ================= UPDATE STATUS =================
const updateStatus = async (id, newStatus, booking) => {
  if (!booking) return;

  // 🚫 Do not allow manual completion
  if (newStatus === "Completed") {
    alert("Booking will be marked Completed automatically after payment.");
    return;
  }

  if (!window.confirm(`Change status to "${newStatus}"?`)) return;

  try {
    await API.put(`/bookings/admin/${id}/status`, {
      status: newStatus,
    });

    setToast(`Status updated to "${newStatus}" ✅`);
    loadAllData();
    setTimeout(() => setToast(""), 2000);

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to update status ❌");
  }
};

  // ================= STATS =================
  const total = bookings.length;
  const pendingPrice = bookings.filter(
    (b) => b.status === "Pending"
  ).length;
  const diagnosis = bookings.filter((b) => b.status === "Diagnosis").length;
  const inProgress = bookings.filter((b) => b.status === "Service In Progress").length;
  const completed = bookings.filter((b) => b.status === "Completed").length;

  const [data, setData] = useState(null);

  useEffect(() => {
    const loadRevenue = async () => {
      try {
        const res = await API.get("/admin/revenue");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load revenue");
      }
    };

    loadRevenue();
  }, []);

  const [revenueData, setRevenueData] = useState([]);

useEffect(() => {

  const fetchRevenue = async () => {

    try {

      const res = await API.get("/admin/revenue-analytics");

      setRevenueData(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  fetchRevenue();

}, []);

  if (!data) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 relative"
      style={{ backgroundImage: "url('/src/assets/admin-bg.png')" }}
    >
      {toast && <Toast message={toast} />}

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl text-white font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>

        {/* QUICK ACTION */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/price-approval")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
          >
            Go to Price Approval
          </button>
          <button
          onClick={() => navigate("/admin/appointments")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
          >
          Service Appointments
          </button>
          <button
          onClick={() => navigate("/admin/messages")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
          >
          Customer Messages
          </button>
          <button
          onClick={() => navigate("/admin/users")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
          >
          User Details
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard title="Total Bookings" value={total} />
          <StatCard title="Pending" value={pendingPrice} />
          <StatCard title="Diagnosis" value={diagnosis} />
          <StatCard title="Service In Progress" value={inProgress} />
          <StatCard title="Completed" value={completed} />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">

        <RevenueCard
          title="Total Revenue"
          value={`₹ ${data.totalRevenue.toLocaleString()}`}
          className="bg-green-900/40 p-4 rounded text-center"
        />

        <RevenueCard
          title="Paid Invoices"
          value={data.paidCount}
          className="bg-blue-900/40 p-4 rounded text-center"
        />

        <RevenueCard
          title="Unpaid Invoices"
          value={data.unpaidCount}
        />

        <RevenueCard
          title="Average Invoice Value"
          value={`₹ ${data.averageInvoiceValue.toLocaleString()}`}
        />

        <RevenueCard
          title="Estimated Profit"
          value={`₹ ${data.estimatedProfit.toLocaleString()}`}
        />

      </div>

        {loading && <Loader />}
        {error && <p className="text-red-400">{error}</p>}

        {/* Admiin Dashboard Analytics */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <AdminRevenueChart data={revenueData} />
          <AdminProfitChart />  
          <AdminDailyRevenueChart />
          <AdminServicePopularityChart />
        </div>

        {/* BOOKINGS */}
        <h2 className="text-2xl text-white font-bold mb-4 mt-4">Service Bookings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-black/60 backdrop-blur-xl rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-200 mb-1">
                👤 {b.customerName}
              </h3>

              <p className="text-lg text-gray-300 font-medium mb-2">
                👑 Membership: {b.user?.membership.plan || "None"}
              </p>

              <p className="text-lg text-gray-300 font-medium mb-2">
                🛠️ Services:
              </p>

              <ul className="text-lg text-gray-300 mb-2">
                {b.services && b.services.length > 0 ? (
                  b.services.map((s, index) => (
                  <li key={index}>
                    • {s.name || "Unnamed Service"}
                  </li>
                  ))
                ) : (
                <li>No services</li>
                )}
              </ul>

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
            No accessories listed </p> 
          )} 
          </div>

              <p className="text-base text-lg text-gray-300 font-semibold">
                🚗 Vehicle: {b.vehicleName} {b.carModel}
              </p>

              <p className="text-base text-lg text-gray-200 mb-5">
                📅 Date:{" "}
                {b.serviceDate
                  ? new Date(b.serviceDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>

              {b.customerNote && (
                <p className="text-md text-gray-400 mt-2">
                  📝 {b.customerNote}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-300">
                  Status
                </span>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b._id, e.target.value, b)}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-white text-black border border-gray-600"
                >
                  <option value="Pending">Pending</option>
                  <option value="Diagnosis">Diagnosis</option>
                  <option value="Service In Progress">Service In Progress</option>
                  <option value="Invoice Generated">Invoice Generated</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white/80 text-black p-4 rounded shadow text-center">
    <p className="text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const RevenueCard = ({ title, value }) => (
  <div className="bg-green-900/80 p-4 rounded text-center">
    <p className="text-sm text-gray-300">{title}</p>
    <p className="text-2xl font-bold text-green-400">{value}</p>
  </div>
);

export default AdminDashboard;
