import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getUser } from "../utils/auth";
import Toast from "../components/Toast";

const AddBooking = () => {
  const user = getUser();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);

  const [vehicleId, setVehicleId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [serviceDate, setServiceDate] = useState("");

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const [customerNote, setCustomerNote] = useState("");


  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    const load = async () => {
      try {
        const [vRes] = await Promise.all([
          API.get("/vehicles"),
          API.get("/services"),
        ]);
        setVehicles(vRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load vehicles or services");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ================= LOAD SELECTED SERVICES & ACCESSORIES =================
useEffect(() => {
  const services =
    JSON.parse(localStorage.getItem("selectedServices")) || [];

  const accessories =
    JSON.parse(localStorage.getItem("selectedAccessories")) || [];

  setSelectedServices(services);
  setSelectedAccessories(accessories);
}, []);


// ================= VEHICLE SELECT =================
  const handleVehicleChange = (id) => {
    const v = vehicles.find((x) => x._id === id);
    if (!v) return;
    setVehicleId(v._id);
    setVehicleName(`${v.brand} ${v.model} (${v.registrationNumber})`);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");

    if (!vehicleId || !serviceDate || (selectedServices.length === 0 && selectedAccessories.length === 0)) {
      setError("Please select vehicle, services and date");
      return;
    }

    setSubmitting(true);

    const payload = {
      customerName: user?.name || "Customer",
      vehicleId,
      vehicleName,
      serviceDate,
      customerNote,   // ✅ ADD THIS
      serviceIds: selectedServices.map(s => s._id),
      accessoryIds: selectedAccessories.map(a => a._id),
    };

    try {
      await API.post("/bookings", payload);
      localStorage.removeItem("selectedServices");
      localStorage.removeItem("selectedAccessories");
      setSelectedServices([]);
      setSelectedAccessories([]);
      setVehicleId("");
      setVehicleName("");
      setServiceDate("");
      setCustomerNote("");
      setToast("Booking added successfully 🚗✅");
      setTimeout(() => navigate("/bookings"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Booking failed");
      setSubmitting(false);
    }
  };

// ================= UI =================
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/src/assets/service-bg.png')" }}
    >
      {toast && <Toast message={toast} />}

      <div className="bg-black rounded-xl shadow-xl p-8 w-full max-w-lg text-white 
      border border-white/10 hover:shadow-white/50 hover:border-white transition">

        <h2 className="text-2xl font-bold text-center mb-6">
          Book Service 🛠️
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {loading && (
          <p className="text-gray-400 text-sm text-center mb-4">
            Loading vehicles & services...
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* SERVICE & ACCESSORY SELECTION */}

          <button
          type="button"
          onClick={() => navigate("/select-services")}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold"
          >
            Select Services 🔧
          </button>

          <button
          type="button"
          onClick={() => navigate("/select-accessories")}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
          >
            Select Accessories 🛍️
          </button>

           {/* VEHICLE */}
          <select
          value={vehicleId}
          onChange={(e) => handleVehicleChange(e.target.value)}
          className="w-full bg-white/10 border text-white font-semibold rounded-lg px-4 py-3"
          >
            <option value="" className="text-black">
              Select Vehicle
            </option>
            {vehicles.map(v => (
              <option
              key={v._id}
              value={v._id}
              className="text-black bg-white"
              >
                {v.brand} {v.model} ({v.registrationNumber})
              </option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full bg-white/10 border rounded-lg px-4 py-3"
          />

          {/* CUSTOMER NOTE */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Service Instructions (Optional)
            </label>
            <textarea
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 placeholder-gray-400"
            rows={0}
            />
          </div>


          {/* SELECTED SUMMARY */}
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 mb-6">
          
           <div className="flex justify-between text-gray-300 text-sm">
            <span>
              🛠 {selectedServices.length} Services Selected
            </span>
            <span>
              🧩 {selectedAccessories.length} Accessories Selected
            </span>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            {submitting ? "Booking Added ✓" : "Book Service"}
          </button>

          <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-400 text-bold-sm hover:underline"
          >
            ← Back to Home
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;
