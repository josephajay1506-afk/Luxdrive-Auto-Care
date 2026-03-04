import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Toast from "../components/Toast";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [toast, setToast] = useState("");

  // ✅ Load profile when page opens
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        const data = res.data;

        if (!data) return;

        setPhone(data.phone ? data.phone.replace("+91", "") : "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setStateName(data.state || "");
        setPincode(data.pincode || "");
      } catch {
        console.log("Profile not found");
      }
    };

    fetchProfile();
  }, []);

  // =============== FETCH USER ===================
  useEffect(() => {

  const fetchUser = async () => {
    try {

      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUser(res.data);

    } catch (err) {

      console.error("User fetch error:", err);

    }
  };

  fetchUser();

}, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setToast("Phone number must be exactly 10 digits ❌");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      await API.put("/users/profile", {
        phone: `+91${phone}`,
        address,
        city,
        state: stateName,
        pincode,
      });

      setToast("Profile details saved successfully ✅");
      setTimeout(() => setToast(""), 2000);
    } catch {
      setToast("Failed to save profile details ❌");
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/src/assets/vehicle-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {toast && <Toast message={toast} />}

      {/* CARD */}
      <div className="relative bg-black rounded-2xl shadow-2xl w-full max-w-lg p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-2">My Profile</h1>
        <p className="text-gray-400 text-center mb-6">
          Manage your personal details
        </p>

        {/* NAME + MEMBERSHIP */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">FULL NAME</p>
            <p className="text-lg font-semibold">{user?.name}</p>
          </div>

          {/* ✅ MEMBERSHIP DISPLAY */}
        <p>
          {user?.membership ? (
            <span className="px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-500 to-orange-700 text-black">
              {user.membership.plan}
            </span>
          ) : (
            <span className="text-gray-400">No active membership</span>
          )}
        </p>
      </div>

        {/* EMAIL */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">EMAIL ADDRESS</p>
          <p className="text-lg font-semibold">{user?.email}</p>
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
            <span className="px-4 border-r border-white/10 text-white font-medium">+91</span>
            <span className="text-gray-400">|</span>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              className="w-full bg-white/10 text-white px-4 py-3 focus:outline-none"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* CITY & STATE */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/10 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="bg-white/10 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* PINCODE */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          Save Details
        </button>

        {/* BACK */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-400 hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
