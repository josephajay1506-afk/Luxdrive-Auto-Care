import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-xl font-bold text-blue-600">
          Luxury Car Service Platform 🚗
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome, {user?.name} 👋
        </h2>

        <p className="text-gray-600 mb-6">
          Manage your vehicles and service bookings easily.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Vehicles */}
          <div className="bg-white p-5 rounded shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">🚘 My Vehicles</h3>
            <p className="text-gray-600 mb-3">
              View and manage your registered cars.
            </p>
            <button className="text-blue-600 font-medium">
              View Vehicles →
            </button>
          </div>

          {/* Bookings */}
          <div className="bg-white p-5 rounded shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">🛠 Service Bookings</h3>
            <p className="text-gray-600 mb-3">
              Track your service appointments.
            </p>
            <button className="text-blue-600 font-medium">
              View Bookings →
            </button>
          </div>

          {/* Profile */}
          <div className="bg-white p-5 rounded shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">👤 My Profile</h3>
            <p className="text-gray-600 mb-3">
              View your account details.
            </p>
            <button className="text-blue-600 font-medium">
              View Profile →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
