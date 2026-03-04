import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

const AdminPriceApproval = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPendingBookings();
  }, []);

  // ================= LOAD BOOKINGS =================
  const loadPendingBookings = async () => {
    try {
      const res = await API.get("/bookings/admin");
      const pending = res.data.filter(
        (b) => b.status === "Pending"
      );
      setBookings(pending);
    } catch (err) {
      console.error(err);
      setToast("Failed to load bookings ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE SERVICE PRICE (LOCAL ONLY) =================
  const updateServicePrice = (bookingId, index, value) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b._id !== bookingId) return b;

        const updatedServices = [...b.services];
        updatedServices[index] = {
          ...updatedServices[index],
          finalPrice: value,
        };

        return { ...b, services: updatedServices };
      })
    );
  };

  // ================= UPDATE ACCESSORY PRICE (LOCAL ONLY) =================
  const updateAccessoryPrice = (bookingId, index, value) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b._id !== bookingId) return b;

        const updatedAccessories = [...(b.accessories || [])];
        updatedAccessories[index] = {
          ...updatedAccessories[index],
          finalPrice: value,
        };

        return { ...b, accessories: updatedAccessories };
      })
    );
  };

  // ================= SAVE FINAL PRICES =================
  const saveFinalPrices = async (booking) => {
    const invalidService = booking.services.some(
      (s) => !s.finalPrice || Number(s.finalPrice) <= 0
    );

    if (invalidService) {
      setToast("All services must have valid final prices ❌");
      return;
    }

    const invalidAccessory = booking.accessories?.some(
      (a) => !a.finalPrice || Number(a.finalPrice) <= 0
    );

    if (invalidAccessory) {
      setToast("All accessories must have valid final prices ❌");
      return;
    }

    try {
      await API.put(`/bookings/admin/${booking._id}/set-prices`, {
        services: booking.services,
        accessories: booking.accessories || [],
      });

      setToast("Final prices saved successfully ✅");
      setTimeout(() => navigate("/admin"), 1500);
      loadPendingBookings(); // refresh after save only
    } catch (err) {
      console.error(err);
      setToast("Failed to save prices ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {toast && <Toast message={toast} />}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin – Price Approval</h1>

        <button
          onClick={() => navigate("/admin")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      {loading && <Loader />}

      {!loading && bookings.length === 0 && (
        <div className="bg-white/10 p-6 rounded-xl text-gray-300">
          No bookings waiting for price approval.
        </div>
      )}

      {/* BOOKINGS */}
      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white/10 border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold">{b.customerName}</h2>

            <p className="text-gray-300 font-medium">
              {b.user?.membership.plan || "None"}
            </p>

            <p className="text-gray-300">
              Vehicle: <b>{b.vehicleName}</b>
            </p>

            <p className="text-gray-400 mb-4">
              Service Date: {b.serviceDate}
            </p>

            {/* ================= SERVICES ================= */}
            <div className="space-y-3 mt-6">
              <p className="text-lg font-semibold text-green-400 mb-2">
                Services 🛠️
              </p>

              {b.services.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-sm text-gray-400">
                      Range: ₹{s.minPrice} – ₹{s.maxPrice}
                    </p>
                  </div>

                  <input
                    type="number"
                    min={s.minPrice}
                    max={s.maxPrice}
                    value={s.finalPrice || ""}
                    onChange={(e) =>
                      updateServicePrice(b._id, i, e.target.value)
                    }
                    placeholder="Final price"
                    className="w-32 px-3 py-2 rounded bg-black border border-gray-500 text-white"
                  />
                </div>
              ))}
            </div>

            {/* ================= ACCESSORIES ================= */}
            {b.accessories && b.accessories.length > 0 && (
              <div className="space-y-3 mt-6">
                <p className="text-lg font-semibold text-green-400 mb-2">
                  Accessories 🛍
                </p>

                {b.accessories.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-sm text-gray-400">
                        Range: ₹{a.minPrice} – ₹{a.maxPrice}
                      </p>
                    </div>

                    <input
                      type="number"
                      min={a.minPrice}
                      max={a.maxPrice}
                      value={a.finalPrice || ""}
                      onChange={(e) =>
                        updateAccessoryPrice(b._id, i, e.target.value)
                      }
                      placeholder="Final price"
                      className="w-32 px-3 py-2 rounded bg-black border border-gray-500 text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* SAVE BUTTON */}
            <button
              onClick={() => saveFinalPrices(b)}
              className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
            >
              Save Prices & Mark Ready
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPriceApproval;
