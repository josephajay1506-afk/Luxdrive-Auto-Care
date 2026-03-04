import { useEffect, useState } from "react";
import API from "../api/axios";
import { motion as Motion } from "framer-motion";

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AdminAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {
      try {

        const res = await API.get("/admin/bookings");
        setAppointments(res.data);

      } catch (err) {
        console.error("Appointments fetch error:", err);
      }
    };

    fetchAppointments();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white px-8 py-12">

      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-blue-400 mb-10"
      >
        📅 Admin Service Appointments
      </Motion.h1>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl overflow-x-auto">

        <table className="w-full text-left text-gray-300">

          <thead className="border-b border-white/20 text-gray-400">

            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Services</th>
              <th className="py-3 px-4">Accessories</th>
              <th className="py-3 px-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map((b) => (

              <Motion.tr
                key={b._id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >

                <td className="py-3 px-4">
                  {formatDate(b.serviceDate)}
                </td>

                <td className="py-3 px-4">
                  {b.customerName}
                </td>

                <td className="py-3 px-4">
                  {b.vehicleName}
                </td>

                <td className="py-3 px-4">

                  {b.services?.slice(0,2).map((s,i)=>(
                    <p key={i}>• {s.name}</p>
                  ))}

                  {b.services?.length > 2 && (
                    <p className="text-gray-500">
                      +{b.services.length - 2} more
                    </p>
                  )}

                </td>

                 <td className="py-3 px-4">

                  {b.accessories?.slice(0,2).map((a, i) => (
                    <p key={i}>• {a.name}</p>
                  ))}

                  {b.accessories?.length > 2 && (
                    <p className="text-gray-500">
                      +{b.accessories.length - 2} more
                    </p>
                  )}

                </td>

                <td className="py-3 px-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm

                    ${b.status === "Pending" && "bg-yellow-500/20 text-yellow-400"}
                    ${b.status === "Service In Progress" && "bg-blue-500/20 text-blue-400"}
                    ${b.status === "Completed" && "bg-green-500/20 text-green-400"}
                    `}
                  >

                    {b.status}

                  </span>

                </td>

              </Motion.tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default AdminAppointments;