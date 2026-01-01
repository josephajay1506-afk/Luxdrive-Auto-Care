import { useEffect, useState } from "react";
import axios from "axios";

function BookService() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("");
  const [serviceDate, setServiceDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(res.data);
    };
    fetchVehicles();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { vehicle, service, serviceDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Service booked successfully");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          required
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.brand} {v.model}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="">Select Service</option>
          <option>Premium Car Inspection</option>
          <option>Oil Change</option>
          <option>Brake Service</option>
          <option>Interior Cleaning</option>
        </select>

        <input
          type="date"
          className="w-full border p-2"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Book Service
        </button>
      </form>
    </div>
  );
}

export default BookService;
