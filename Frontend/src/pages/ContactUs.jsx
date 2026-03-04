import { motion as Motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useState } from "react";
import API from "../api/axios";

const ContactUs = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sectionAnim = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  // ✅ FINAL submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    try {
      setSending(true);

      await API.post("/contact", {
        name,
        email,
        phone,
        message
      });

      setSent(true);
      setTimeout(() => setSent(false), 3000);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">

      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
          Contact LuxDrive
        </h1>
        <p className="text-gray-400 mt-4">
          Premium support for premium vehicles
        </p>
      </Motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ================= LEFT INFO ================= */}
        <Motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <InfoCard icon={<FaPhoneAlt />} title="Call Us" text="+91 9789182816" />
          <InfoCard icon={<FaEnvelope />} title="Email" text="support@luxdrive.com" />
          <InfoCard icon={<FaMapMarkerAlt />} title="Workshop" text="Chennai - 600088" />
          <InfoCard icon={<FaClock />} title="Working Hours" text="Mon–Sat • 9AM — 8PM" />
        </Motion.div>

        {/* ================= FORM ================= */}
        <Motion.form
          onSubmit={handleSubmit}
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl hover:border-yellow-500 hover:shadow-yellow-500/50 transition space-y-5"
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Send a Message
          </h2>

          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />

          <textarea
            required
            rows="0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={sending}
            className={`w-full font-bold py-3 rounded-xl transition ${
              sending
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
            }`}
          >
            {sending ? "Sending..." : "Send Message 🚀"}
          </Motion.button>

          {sent && (
            <p className="text-green-400 text-center mt-3">
              ✅ Message sent successfully!
            </p>
          )}

        </Motion.form>

      </div>

      {/* Footer */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-20 text-gray-400"
      >
        <p className="text-yellow-400 font-semibold">
          LuxDrive Premium Service Platform
        </p>
        <p>Performance • Precision • Premium Care</p>
      </Motion.div>

    </div>
  );
};

// ================= INFO CARD =================

const InfoCard = ({ icon, title, text }) => (
  <Motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 rounded-2xl p-6 shadow-lg flex items-center gap-5 
    border border-white/10 hover:border-yellow-500 hover:shadow-yellow-500/50 transition"
  >
    <div className="text-yellow-400 text-2xl">{icon}</div>
    <div>
      <p className="font-bold text-lg">{title}</p>
      <p className="text-gray-400">{text}</p>
    </div>
  </Motion.div>
);

export default ContactUs;
