import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      <ul className="space-y-3">
        {bookings.map((b) => (
          <li key={b._id} className="border p-3 rounded">
            <p>
              <strong>Service:</strong> {b.service}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(b.serviceDate).toDateString()}
            </p>
            <p>
              <strong>Status:</strong> {b.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
