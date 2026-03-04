import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ServiceHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH HISTORY =================
  const fetchHistory = useCallback(async () => {
    try {
      const res = await API.get("/bookings/service-history");
      setData(res.data || []);
    } catch (err) {
      console.error("Service history fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // ================= DOWNLOAD INVOICE PDF =================
  const downloadInvoicePDF = (entry, vehicle) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("LuxDrive Signature Auto Care", 20, 20);

    doc.setFontSize(12);
    doc.text("Service Invoice Copy", 20, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Service / Accessory"]],
      body: [
        ...(entry.services || []).map((s) => [s.name]),
        ...(entry.accessories || []).map((a) => [a.name]),
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [
        ["Vehicle", `${vehicle?.brand || ""} ${vehicle?.model || ""}`],
        [
          "Service Date",
          new Date(entry.serviceDate).toLocaleDateString("en-GB"),
        ],
        ["Invoice Amount", `Rs. ${entry.invoiceAmount}`],
        ["Status", "Paid"],
      ],
    });

    doc.save(`service_history_${entry._id}.pdf`);
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">
        Service History 📄
      </h1>

      {loading && <p>Loading service history...</p>}

      {!loading && data.length === 0 && (
        <p>No completed services found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {data.map((vehicleData) => (
          <div
            key={vehicleData.vehicle?._id}
            className="animate-fade-in bg-white/10 backdrop-blur-lg border border-white/10 
            rounded-2xl p-6 shadow-xl text-white hover:scale-105 transition duration-300 
            hover:shadow-white/50 hover:border-white"
          >
            {/* Vehicle Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {vehicleData.vehicle?.brand}
              </h2>

              <p className="text-blue-400 mt-2 font-medium font-semibold">
                Total Services Records: {vehicleData.history?.length || 0}
              </p>

              <p className="text-green-400 font-semibold">
                Total Spent: ₹{vehicleData.totalSpent || 0}
              </p>
            </div>

            {/* Service Entries */}
            <div className="space-y-8">
              {vehicleData.history?.map((entry) => (
                <div
                  key={entry._id}
                  className="border-t border-white/10 pt-6"
                >
                  {/* Date + Badge */}
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">
                      {new Date(entry.serviceDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>

                    <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
                      Paid
                    </span>
                  </div>

                  {/* Services */}
                  <div className="mb-3">
                    <p className="font-semibold mb-1">Services</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {(entry.services || []).map((s, i) => (
                        <li key={i}>• {s.name}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Accessories */}
                  {entry.accessories?.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold mb-1">
                        Accessories
                      </p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {entry.accessories.map((a, i) => (
                          <li key={i}>• {a.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Invoice */}
                  <p className="text-yellow-400 font-semibold mt-2">
                    Invoice Amount: ₹{entry.invoiceAmount}
                  </p>

                  {/* Download Button */}
                  <button
                    onClick={() =>
                      downloadInvoicePDF(entry, vehicleData.vehicle)
                    }
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Download Invoice PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHistory;