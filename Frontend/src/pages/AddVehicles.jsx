import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Toast from "../components/Toast";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await API.post("/vehicles", {
        brand,
        model,
        year,
        registrationNumber,
      });

      setToast("Vehicle added successfully ✅");
      setTimeout(() => setToast(""), 2000);

      setTimeout(() => {
        navigate("/vehicles");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add vehicle");
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/src/assets/vehicle-bg.png')" }}
    >
      {toast && <Toast message={toast} />}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>


      {/* Card */}
      <div className="relative w-full max-w-md bg-black rounded-2xl shadow-xl p-8 
      border border-white/10 hover:shadow-white/50 hover:border-white transition">

        <h2 className="text-2xl text-white font-bold text-center mb-6">
          Register Vehicle
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-green-600 text-sm text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            className="w-full bg-white/10 text-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              submitting
                ? "bg-green-600 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {submitting ? "Vehicle Added ✓" : "Add Vehicle"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-400 text-bold-sm hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
