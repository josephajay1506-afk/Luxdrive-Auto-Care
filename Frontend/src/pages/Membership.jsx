/* eslint-disable-next-line no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";

const membershipPlans = [
  {
    title: "Select Membership 🥉",
    duration: "3 Months",
    price: "₹3,990",
    tagline: "Smart savings with premium care",
    benefits: [
       "8% discount on all services",
      "Complimentary premium car wash — 1 time",
      "Priority booking slots",
      "Free tyre pressure & top-up fluid check anytime",
      "Digital vehicle health report access",
      "Member-only seasonal offers",
      "Service reminder alerts",
      "Faster service queue access",
    ],
    ideal: "Customers who want smart savings with premium care.",
  },
  {
    title: "Prestige Membership 🥈",
    duration: "6 Months",
    price: "₹7,990",
    tagline: "Balance of luxury and value",
    benefits: [
      "12% discount on all services",
      "Free advanced diagnostic scan — 1 time",
      "Free pickup & drop — 1 time",
      "Complimentary interior deep cleaning — 1 time",
      "Free AC performance & cooling efficiency check",
      "Birthday month service benefit",
      "Priority service lane access",
      "Extended labor warranty on serviced parts",
      "Gold member exclusive campaign offers",
      "Dedicated support desk response",
    ],
    ideal: "Owners who expect balanced luxury and comfort.",
  },
  {
    title: "Imperial Membership 🥇",
    duration: "12 Months",
    price: "₹11,990",
    tagline: "The ultimate luxury experience",
    benefits: [
      "18% discount on all services",
      "Free premium detailing — 1 time",
      "Free emergency inspection — anytime",
      "Dedicated personal service advisor",
      "VIP priority workshop handling",
      "Complimentary roadside assistance (city coverage)",
      "Pickup & drop — 3 times",
      "Luxury fragrance & care kit",
      "Express service lane access",
      "Annual full vehicle inspection report",
      "Invitation to exclusive service events",
      "Priority spare parts sourcing",
      "Complimentary minor scan during every visit",     
    ],
    ideal: "Elite automobile owners who demand the finest care.",
  },
];

const privileges = [
  "Faster service turnaround",
  "Personalized service history tracking",
  "Festival & seasonal rewards",
  "Early access to new offers",
  "Dedicated customer care",
  "Luxury waiting lounge access",
  "Priority workshop entry",
  "Complimentary pick-up & drop (within city limits)",
];

const rewards = [
  "Summer Comfort Reward – Free AC check",
  "Monsoon Safety Reward – Free underbody inspection",
  "Festive Royal Reward – Free polish or gift hamper",
  "New Year Elite Reward – Flat 15% off premium services",
  "Anniversary Special – Complimentary car wash",
  "Birthday Month Benefit – Extra 10% discount on any two service"
];

/* ================= COMPONENT ================= */

const Membership = () => {
  const navigate = useNavigate();

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= ANIMATION ================= */

  const fadeAnim = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  /* ================= LOAD RAZORPAY ================= */

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  /* ================= FETCH MEMBERSHIP ================= */

  useEffect(() => {
  const fetchMembership = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/membership/my-membership",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Membership API error:", text);
        return;
      }

      const data = await res.json();

      if (data.membership?.isActive) {
        setMembership(data.membership);
      }

    } catch (err) {
      console.error("Membership fetch error:", err);
    }
    setLoading(false);
  };

  fetchMembership();
}, []);

  /* ================= PRICE → NUMBER ================= */

  const getAmountFromPrice = (priceStr) =>
    Number(priceStr.replace(/[^\d]/g, ""));

  /* ================= BUY MEMBERSHIP ================= */

  const buyMembership = async (plan) => {
    try {
      const amount = getAmountFromPrice(plan.price);

      if (!amount) {
        alert("Invalid price");
        return;
      }

      /* CREATE ORDER */
      const { data: order } = await API.post("/membership/create-order", {
        amount
      });

      const options = {
        key: "rzp_test_SBbQjpVmTvtt7K",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "LuxDrive",
        description: "Membership Purchase",

        handler: async () => {

          await API.post("/membership/purchase", {
            membership: plan.title
          });

          alert("Membership Activated 🎉");

          window.location.reload();
        },

        theme: {
          color: "#3b82f6"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err?.response?.data || err);
      alert("Payment failed");
    }
  };

   /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading membership...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        💎 LuxDrive's Membership Privileges 💎
      </motion.h1>

      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-10">
        Exclusive care. Exceptional value. Elite experience.  
        Join our Membership Program and unlock premium benefits, priority service, and luxury care for your automobile.
      </p>

      {/* Why Become Member */}
      <motion.section
        variants={fadeAnim}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">🌟 Why Become a Member?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Priority service & faster turnaround",
            "Exclusive member-only discounts",
            "Complimentary premium services",
            "Dedicated service support",
            "Special rewards & seasonal privileges",
            "Elevated luxury service experience",
          ].map((item, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl 
            hover:border-white/70 hover:shadow-white/30 transition">
              ✔ {item}
            </div>
          ))}
        </div>
      </motion.section>
      {/* Membership Plans */}
<motion.section
  variants={fadeAnim}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="mb-20"
>
  <h2 className="text-3xl font-bold mb-8">👑 Membership Plans</h2>

  <div className="grid md:grid-cols-3 gap-8">

    {membershipPlans.map((plan, i) => {

      const isActive = membership?.plan === plan.title && membership?.isActive;

      return (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl 
          hover:border-white/70 hover:shadow-white/50 transition"
        >

          {/* PLAN TITLE */}
          <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>

          <p className="text-blue-400 mb-2">{plan.duration}</p>

          <p className="italic text-gray-400 mb-4">{plan.tagline}</p>

          {/* PRICE */}
          <p className="text-3xl font-bold text-green-400 mb-4">
            {plan.price}
          </p>

          {/* BENEFITS */}
          <ul className="space-y-2 text-gray-300 mb-4">
            {plan.benefits.map((b, idx) => (
              <li key={idx}>✔ {b}</li>
            ))}
          </ul>

          <p className="text-sm text-gray-400 mt-2">
            {plan.ideal}
          </p>


          {/* ================= BUTTON / ACTIVE STATUS ================= */}

          {isActive ? (

            <div className="mt-5 text-center">

              <div className="bg-green-500/20 border border-green-500 
              text-green-400 py-3 rounded-xl font-semibold">

                ✓ Active Membership

              </div>

              {/* Expiry date */}
              {membership?.expiryDate && (
                <p className="text-xs text-gray-400 mt-2">
                  Valid until{" "}
                  {new Date(membership.expiryDate).toLocaleDateString()}
                </p>
              )}

            </div>

          ) : (

            <button
              onClick={() => buyMembership(plan)}
              className="mt-5 w-full bg-gradient-to-r from-yellow-500 to-orange-500 
              text-black font-bold py-3 rounded-xl hover:scale-105 transition"
            >
              Buy Membership 💳
            </button>

          )}

        </motion.div>
      );
    })}

  </div>
</motion.section>

      {/* Member Privileges */}
      <motion.section
        variants={fadeAnim}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">🌟 Member-Only Privileges</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {privileges.map((p, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl 
            hover:border-white/70 hover:shadow-white/30 transition">
              ✔ {p}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Rewards */}
      <motion.section
        variants={fadeAnim}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-6">🎁 Seasonal & Exclusive Rewards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rewards.map((r, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl
            hover:border-white/70 hover:shadow-white/30 transition">
              ✔ {r}
            </div>
          ))}
        </div>
      </motion.section>

      {/* How it Works */}
      <motion.section
        variants={fadeAnim}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-6">🔄 How Membership Works</h2>
        <div className="grid md:grid-cols-5 gap-4 text-center">
          {[
            "Choose your plan",
            "Register online or at desk",
            "Receive digital membership card",
            "Enjoy exclusive benefits",
            "Track rewards in account",
          ].map((step, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-xl 
            hover:border-white/70 hover:shadow-white/30 transition">
              <span className="text-2xl font-bold block mb-2">{i + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">
          Join our circle of excellence and experience a new standard of luxury automobile care.
        </h2>

        <button
          onClick={() => navigate("/contact-us")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-14 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Talk to Our Service Advisor
        </button>
      </motion.div>
    </div>  
  );
};

export default Membership;