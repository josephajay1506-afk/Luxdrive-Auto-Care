import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    title: "Essential Package",
    tagline: "Smart care for Engaged automobiles",
    price: "₹8,999",
    includes: [
      "40-point vehicle health inspection",
      "Engine oil & filter check",
      "Brake system inspection",
      "Battery & charging system test",
      "Tyre pressure & tread check",
      "Fluid top-up (coolant, brake, washer)",
      "AC performance check",
      "Software fault scan",
      "Exterior wash & interior vacuum",
    ],
    offers: [
      "Free diagnostic health report",
      "Free premium wash",
      "5% discount on labor",
    ],
  },
  {
    title: "Prime Plus Package",
    tagline: "Balance of power and elegance",
    price: "₹14,999",
    includes: [
      "Full ECU & system diagnostics",
      "Wheel alignment & balancing",
      "Brake cleaning & calibration",
      "Suspension & steering optimization",
      "Climate control calibration",
      "Noise & vibration inspection",
      "Electrical & sensor inspection",
      "Interior deep cleaning",
      "Wax polish exterior",
    ],
    offers: [
      "10% discount on service bill",
      "Free AC sanitization",
      "Free alignment check next visit",
    ],
  },
  {
    title: "Grand Signature Package",
    tagline: "Crafted for perfection and excellence",
    price: "₹22,999",
    includes: [
      "Engine tuning & software update",
      "Transmission & gearbox inspection",
      "Premium ceramic wash",
      "Paint gloss enhancement polish",
      "Leather seat conditioning",
      "Infotainment & driver-assist system check",
      "Exhaust & emission optimization",
      "Underbody inspection",
    ],
    offers: [
      "Priority service slot",
      "Free premium polish",
      "15% discount on labor",
      "Free pickup & drop (once)",
    ],
  },
  {
    title: "Ultimate Elite Package",
    tagline: "Maximum care. Maximum confidence.",
    price: "₹31,999",
    includes: [
      "Paint protection coating (Ceramic/PPF)",
      "Underbody anti-rust coating",
      "Fuel system cleaning",
      "Cooling system flush",
      "Brake disc & suspension deep inspection",
      "Road test & quality certification",
      "Detailed performance & comfort report",
    ],
    offers: [
      "20% discount on premium services",
      "Free roadside assistance (1 month)",
      "Free interior detailing",
      "Dedicated service advisor",
      "Luxury fragrance kit",
    ],
  },
];

const Service = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-3 py-14">

      {/* Header */}
      <Motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        🛠️ LuxDrive's Signature Service Packages 📦
      </Motion.h1>

      <p className="text-center text-gray-400 mb-12">
        Engineered for luxury. Designed for perfection.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        {packages.map((pkg, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="animate-fade-in bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl text-white hover:scale-105 transition duration-300 hover:shadow-white/70 hover:border-white"
          >

            {/* Title */}
            <h2 className="text-2xl font-bold mb-1">{pkg.title}</h2>
            <p className="text-blue-400 italic mb-2">{pkg.tagline}</p>

            <p className="text-3xl font-bold text-green-400 mb-4">
              {pkg.price}
            </p>

            {/* Includes */}
            <h3 className="text-lg font-semibold mb-2">Includes:</h3>
            <ul className="space-y-1 text-sm text-gray-300 mb-4">
              {pkg.includes.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>

            {/* Offers */}
            <h3 className="text-lg font-semibold text-green-400 mb-2">Offers:</h3>
            <ul className="space-y-1 text-sm text-green-300">
              {pkg.offers.map((offer, i) => (
                <li key={i}>🎁 {offer}</li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => navigate("/add-booking")}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-blue-400/50"
            >
              Book This Package
            </button>
          </Motion.div>
        ))}
      </div>

       {/* Pricing Notice */}
       <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
       {/* Transparent Pricing Notice */}
       <div className="max-w-6xl mx-auto mt-12 relative overflow-hidden
    rounded-3xl
    border border-blue-400/50
    bg-gradient-to-br from-blue-500/10 via-black/60 to-black/90
    backdrop-blur-xl
    p-8 md:p-10
    shadow-lg
    hover:shadow-blue-400
    hover:border-blue-400
    transition duration-300">
        <div className="flex items-start md:items-center gap-6">
          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Transparent & Valuable Pricing
            </h3>
            <div className="space-y-2 text-gray-200 leading-relaxed">
              <p>
                The prices shown are starting from the listed amount and are inclusive of applicable taxes.
              </p>
              <p className="text-gray-300">
                Service package pricing may vary depending on your vehicle 
                configuration and technical specifications.
              </p>
              <p className="text-gray-400">
                Final estimates are provided after a detailed inspection to 
                ensure accurate and valuable pricing.
              </p>
            </div>
          </div>
          </div>
        </div>
      </Motion.div>

      {/* Bottom CTA */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          Not sure which package suits you?
        </h2>
        <button
          onClick={() => navigate("/contact-us")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Talk to Our Service Advisor
        </button>
      </Motion.div>

    </div>
  );
};

export default Service;
