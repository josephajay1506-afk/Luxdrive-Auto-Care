import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const token = localStorage.getItem("token");

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles(res.data);
    }  catch (error) {
  alert(error.response?.data?.message || "Failed");
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
  let mounted = true;
  const safeFetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (mounted) setVehicles(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };
  safeFetch();
  return () => {
    mounted = false;
  };
}, [token]);
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Vehicles</h2>

      <Link to="/add-vehicle">
        <button>Add Vehicle</button>
      </Link>

      {vehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        <ul>
          {vehicles.map((v) => (
            <li key={v._id}>
              {v.brand} {v.model} ({v.year}) – {v.registrationNumber}
              <button onClick={() => deleteVehicle(v._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Vehicles;
