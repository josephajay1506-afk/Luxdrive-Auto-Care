import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import API from "../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaFileInvoice,
  FaCar,
  FaCalendarAlt,
  FaUser,
  FaCrown,
  FaRupeeSign,
  FaCreditCard,
} from "react-icons/fa";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // ✅ FIXED fetch (no warning)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await API.get("/invoices");
        setInvoices(res.data || []);
      } catch (err) {
        console.error("Failed to load invoices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
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

  // ================= PAY NOW =================
  const handlePayNow = async (invoice) => {
  try {
    const orderRes = await API.post("/payments/create-order", {
      invoiceId: invoice._id, // send only invoiceId
    });

    const order = orderRes.data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "LuxDrive Auto Care",
      description: "Service Payment",
      order_id: order.id,

      handler: async function (response) {
        try {
          await API.post("/payments/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            invoiceId: invoice._id,
          });
          
          setToast("Payment successful ✅");
          setTimeout(() => setToast(""), 2000);
          window.location.reload();
        } catch (err) {
          console.error(err);
          alert("Payment verification failed ❌");
        }
      },

      prefill: {
        name: invoice.customerName,
      },

      theme: {
        color: "#22c55e",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment initiation failed ❌");
  }
};

  // ================= DOWNLOAD PDF =================
  const downloadPDF = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("LuxDrive Signature Auto Care", 20, 20);
    doc.setFontSize(12);
    doc.text("Service Invoice", 20, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Service and Accessory", "Price"]],
      body: [
        ...invoice.services.map((s) => [s.name, `Rs. ${s.price}`]),
        ...invoice.accessories.map((a) => [a.name, `Rs. ${a.price}`]),
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [
        ["Customer", invoice.customerName],
        ["Vehicle", invoice.vehicleName],
        ["Service Date", new Date(invoice.serviceDate).toLocaleDateString("en-GB")],
        ["Invoice Date", new Date(invoice.createdAt).toLocaleDateString("en-GB")],
        ["Subtotal", `Rs. ${invoice.subTotal}`],
        ["Tax", `Rs. ${invoice.tax}`],
        ["Discount", `Rs. ${invoice.discount}`],
        ["Total", `Rs. ${invoice.finalAmount}`],
        ["Status", invoice.status],
      ],
    });

    doc.text(
      "Thank you for choosing LuxDrive Auto Care.",
      20,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`invoice_${invoice._id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaFileInvoice className="text-blue-400 animate-pulse" />
          My Invoices
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading invoices...</p>}
      {toast && <Toast message={toast} />}

      {!loading && invoices.length === 0 && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-gray-400">
          No invoices available.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="animate-fade-in bg-white/10 backdrop-blur-lg border border-white/10 
            rounded-2xl p-6 shadow-xl text-white hover:scale-105 transition duration-300 
            hover:shadow-white/50 hover:border-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-400">
                Invoice #{invoice._id.slice(-6)}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  invoice.status === "Paid"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {invoice.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-2 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <FaUser className="text-pink-400" />
                Customer: {invoice.customerName}
              </p>

              <p className="flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                Membership: {user?.membership.plan || "None"}
              </p>

              <p className="flex items-center gap-2">
                <FaCar className="text-purple-400" />
                Vehicle: {invoice.vehicleName}
              </p>

              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-400" />
                Service Date:{" "}
                {new Date(invoice.serviceDate).toLocaleDateString("en-GB")}
              </p>

              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-400" />
                Invoice Date:{" "}
                {new Date(invoice.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Services */}
            <div className="mt-4 border-t border-white/10 pt-3">
              <h3 className="font-semibold mb-2">Services</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                {invoice.services.map((s, i) => (
                  <li key={i}>
                    • {s.name} — ₹{s.price}
                  </li>
                ))}
              </ul>
            </div>

            {/* Accessories */}
            <div className="mt-4 border-t border-white/10 pt-3">
            <h3 className="font-semibold mb-2">Accessories</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              {invoice.accessories.map((a, i) => (
                <li key={i}>
                  • {a.name} — ₹{a.price}
                </li>
              ))}
            </ul>
            </div>
            
           {/* Amount */}
           <div className="mt-3 border-t border-white/10 pt-3 space-y-2 text-sm">
           <div className="flex justify-between text-gray-200">
            <span>Subtotal</span>
            <span>₹{invoice.subTotal}</span>
            </div>
            <div className="flex justify-between text-yellow-400">
              <span>Tax</span>
              <span>₹{invoice.tax}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>
                  Discount {invoice.discountPercentage ? `(${invoice.discountPercentage}%)` : ""}
                </span>
                <span>−₹{invoice.discount}</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-semibold text-white">
            <span>Total Payable</span>
            <span>₹{invoice.finalAmount}</span>
          </div>
          </div>

            {/* Actions */}
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => downloadPDF(invoice)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Download PDF
              </button>

              {invoice.status === "Unpaid" && (
                <button
                  onClick={() => handlePayNow(invoice)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg 
                             font-semibold transition flex items-center gap-2"
                >
                  <FaCreditCard />
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;

