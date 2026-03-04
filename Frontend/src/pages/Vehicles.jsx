import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";


const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await API.get("/vehicles");
        setVehicles(res.data);
      } catch {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch {
      alert("Failed to delete vehicle");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 relative"
      style={{ backgroundImage: "url('/vehicle-bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-white font-medium hover:underline"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-8 text-white">
          🚘 My Vehicles
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-400 mb-4 font-medium">
            {error}
          </p>
        )}

        {/* Loading */}
        {loading && <Loader />}

        {/* Empty State */}
        {!loading && vehicles.length === 0 && !error && (
          <div className="bg-black rounded-xl shadow p-6 text-center text-gray-400">
            No vehicles added yet.
          </div>
        )}

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div
            key={vehicle._id}
            className="animate-fade-in bg-black backdrop-blur-lg border border-white/10 
                 rounded-2xl p-6 shadow-xl text-white 
                 hover:scale-105 transition duration-300 
                 hover:shadow-white/50 hover:border-white
                 flex flex-col"
            >
              {/* Top content */}
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-gray-500 py-1">
                  Reg No: {vehicle.registrationNumber}
                </p>
              </div>
              
              {/* Delete button bottom-right */}
              <div className="mt-auto flex justify-end">
                <button
                onClick={() => deleteVehicle(vehicle._id)}
                className="text-red-500 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
