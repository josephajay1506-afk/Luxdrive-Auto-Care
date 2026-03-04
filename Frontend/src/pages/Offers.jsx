import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const specialOffers = [
  "Engine Care Offer – 15% off labor + free diagnostics + engine bay shine",
  "Climate Comfort Offer – 10% off AC service + cabin filter cleaning + antibacterial spray",
  "Safety Drive Offer – 10% off brake & suspension + free 20-point safety inspection",
  "Luxury Shine Offer – 15% off detailing + dashboard polish + fragrance kit",
  "Power Care Offer – 10% off battery replacement + free digital health report",
  "Performance Check Bonus – Free road-test evaluation + performance report"
];

const campaignOffers = [
  "Smart Drive Offer – Free software scan + 10% off electronics service",
  "Road Trip Ready Offer – Free long-drive inspection + tyre & fluid check",
  "First-Time Visitor Offer – Flat 10% off + free premium wash",
  "Loyalty Reward Offer – Extra 5% off for repeat customers",
  "Night Service Bonus – Free car wash for evening bookings",
  "Express Service Offer – Priority service + 5% off labor",
  "Green Drive Offer – Free emission test + 10% off eco services",
  "Quick Care Bonus – Free minor top-ups (washer fluid, coolant level check)"
];

const membershipOffers = [
  {
    title: "Select Membership",
    benefits: [
      "7% discount on all services",
      "Free car wash once",
      "Priority booking",
      "Free tyre pressure & fluid check anytime",
    ],
  },
  {
    title: "Prestige Membership",
    benefits: [
      "12% discount",
      "Free diagnostics",
      "Free pickup & drop (1 time)",
      "Free interior cleaning",
      "Free AC performance check",
      "Birthday special reward",
    ],
  },
  {
    title: "Imperial Membership",
    benefits: [
      "20% discount",
      "Free premium detailing once",
      "Free emergency inspection",
      "Dedicated service advisor",
      "VIP priority support",
      "Free roadside assistance (1 time)",
      "Luxury fragrance",
      "Priority service lane",
    ],
  },
];

const seasonalOffers = [
  "Summer AC Health Offer – Free AC check + 10% off + cooling spray",
  "Monsoon Safety Offer – Free underbody & brake inspection + wiper check",
  "Diwali Royal Offer – Free polish + gift hamper + festive discount",
  "New Year Elite Offer – Flat 15% off premium packages + free car spa",
  "Birthday Special – Free car wash + luxury fragrance",
  "Anniversary Drive Offer – Free inspection + special discount",
  "Weekend Special Offer – Free interior vacuum + 5% off",
  "Student Special Offer – Extra 5% off with ID",
  "Corporate Client Offer – Custom discounts for fleet owners",
  "Festive Fast-Track – Priority booking slot during festival rush"
];

const cardStyle =
  "bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl shadow-xl hover:border-white/70 hover:shadow-white/30 transition";

const Offers = () => {
  const navigate = useNavigate();

  const sectionAnim = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14">

      <Motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        🎁 LuxDrive Exclusive Offers & Discounts 🎁
      </Motion.h1>

      <p className="text-center text-gray-400 mb-12">
        Luxury benefits crafted for loyal customers
      </p>

      {/* Special */}
      <Motion.section variants={sectionAnim} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-6">🌟 Special Discount Campaign Offers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {specialOffers.map((offer, i) => (
            <div key={i} className={cardStyle}>
              ✔ {offer}
            </div>
          ))}
        </div>
      </Motion.section>

      {/* Campaign */}
      <Motion.section variants={sectionAnim} initial="hidden" whileInView="visible" transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="mt-14">
        <h2 className="text-3xl font-bold mb-6">🆕 Unique Campaign Offers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {campaignOffers.map((offer, i) => (
            <div key={i} className={cardStyle}>
              ✔ {offer}
            </div>
          ))}
        </div>
      </Motion.section>

      {/* Membership */}
      <Motion.section variants={sectionAnim} initial="hidden" whileInView="visible" transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="mt-14">
        <h2 className="text-3xl font-bold mb-6">💎 Membership Discount Offers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {membershipOffers.map((m, i) => (
            <Motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:border-white/70
              hover:shadow-white/30 transition"
            >
              <h3 className="text-2xl font-bold mb-3">{m.title}</h3>
              <ul className="space-y-2 text-gray-300">
                {m.benefits.map((b, idx) => (
                  <li key={idx}>✔ {b}</li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Seasonal */}
      <Motion.section variants={sectionAnim} initial="hidden" whileInView="visible" transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }} className="mt-14">
        <h2 className="text-3xl font-bold mb-6">🎊 Seasonal & Festival Offers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {seasonalOffers.map((offer, i) => (
            <div key={i} className={cardStyle}>
              ✔ {offer}
            </div>
          ))}
        </div>
      </Motion.section>

      {/* CTA */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          Want to unlock exclusive offers?
        </h2>
        <button
          onClick={() => navigate("/contact-us")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-4 rounded-full font-semibold shadow-xl 
          hover:border-white/70 hover:shadow-yellow-500/20 hover:scale-105 transition"
        >
          Contact Our Service Advisor
        </button>
      </Motion.div>

    </div>
  );
};

export default Offers;
