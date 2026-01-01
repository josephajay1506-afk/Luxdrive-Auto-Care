import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!brand || !model || !year || !registrationNumber) {
      setMessage("All fields are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/vehicles",
        {
          brand,
          model,
          year,
          registrationNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Vehicle added successfully");
      setTimeout(() => navigate("/vehicles"), 1000);
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Failed to add vehicle");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Vehicle
        </h2>

        {message && (
          <p className="mb-3 text-center text-red-600">{message}</p>
        )}

        <input
          type="text"
          placeholder="Brand"
          className="w-full p-2 border mb-3"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="text"
          placeholder="Model"
          className="w-full p-2 border mb-3"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="w-full p-2 border mb-3"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          type="text"
          placeholder="Registration Number"
          className="w-full p-2 border mb-4"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
}

export default AddVehicle;
