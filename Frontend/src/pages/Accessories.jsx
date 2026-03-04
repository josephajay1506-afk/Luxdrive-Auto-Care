import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

const accessoryCategoryOrder = [
  "🧰 Essential Accessories",
  "🎨 Exterior Styling",
  "✨ Interior Luxury Enhancements",
  "🔊 Audio & Infotainment",
  "💡 Lighting & Visibility",
  "🛞 Wheels & Tyre Enhancements",
  "🛑 Suspension & Braking",
  "🏎 Performance & Engine Bay",
  "🔊 Exhaust & Sound Systems",
  "🛡️ Safety & Security",
  "🏕 Off-Road & Utility Accessories",
  "🧼 Detailing & Preservation",
  "📦 Bundled Packages"
];

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    API.get("/accessories")
      .then((res) => setAccessories(res.data || []))
      .catch(() => {});
  }, []);

  /* ================= ANIMATION VARIANTS ================= */

  const categoryVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  /* ================= CATEGORY LIST ================= */

  const categories = useMemo(() => {
    const unique = [...new Set(accessories.map((a) => a.category))];
    return ["All", ...unique];
  }, [accessories]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return accessories.filter((a) => {
      const matchSearch = a.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" ||
        a.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [accessories, search, selectedCategory]);

  /* ================= GROUP BY CATEGORY ================= */

  const grouped = useMemo(() => {
    return filtered
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((groups, item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
        return groups;
      }, {});
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      {/* ================= HERO ================= */}
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-4 mt-4"
      >
        🚗 LuxDrive Accessories Catalog ✨
      </Motion.h1>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-lg text-gray-400 mb-12"
      >
        Enhance. Personalize. Elevate.
      </Motion.p>

      {/* ================= SEARCH + FILTER ================= */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center mb-10 mt-12 mr-10"
      >
        <Motion.input
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          placeholder="Search accessories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border border-white/10 px-6 py-2 rounded-lg"
        />

        <Motion.select
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-black border border-white/10 px-4 py-2 rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Motion.select>
      </Motion.div>

      {/* ================= PREMIUM PRICING NOTE ================= */}
<Motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-12 max-w-3xl mx-auto"
>
  <div className="relative overflow-hidden rounded-3xl border border-yellow-400/40 
                  bg-gradient-to-br from-yellow-500/10 via-black/70 to-black 
                  backdrop-blur-xl p-10 shadow-xl hover:shadow-yellow-400/40 hover:border-yellow-400">

    {/* Glow Effect Line */}
    <div className="absolute top-0 left-0 w-full h-[2px] 
                    bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>

    <div className="flex items-start gap-6">

    

      {/* Content */}
      <div>
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4 tracking-wide">
          Customization-Based Pricing
        </h3>

        <div className="space-y-4 text-gray-300 leading-relaxed text-[15px] md:text-base">

          <p className="italic">
            Designed to enhance. Built to fit.
          </p>

          <p className="text-gray-400">
              Pricing varies based on compatibility, brand selection, and installation requirements.
          </p>

          <p className="text-gray-500">
             Final quotation ensures seamless integration and premium finish.
          </p>

        </div>
      </div>

    </div>

    {/* Bottom Glow Line */}
    <div className="absolute bottom-0 left-0 w-full h-[1px] 
                    bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
  </div>
</Motion.div>

      {/* ================= ACCESSORIES LIST ================= */}
<div className="mt-16 space-y-20">

  <AnimatePresence mode="popLayout">
    {accessoryCategoryOrder
      .filter(category => grouped[category])
      .map((category) => {
        const items = grouped[category];

        return (
          <Motion.div
            key={category}
            layout
            variants={categoryVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* CATEGORY HEADER */}
            <h2 className="text-3xl font-bold mb-8 border-b border-white/10 pb-4">
              {category}
            </h2>

            {/* GRID */}
            <Motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <Motion.div
                    key={item._id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/30 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/40 hover:border-white transition"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4">
                      {item.description}
                    </p>

                    <div className="text-green-400 font-semibold text-lg mb-2">
                      ₹{item.minPrice.toLocaleString()} - ₹
                      {item.maxPrice.toLocaleString()}
                    </div>
                  </Motion.div>
                ))}
              </AnimatePresence>
            </Motion.div>
          </Motion.div>
        );
      })}
  </AnimatePresence>
</div>

      {/* ================= FOOTER TAGLINE ================= */}
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16 text-gray-400"
      >
        <p className="text-xl font-semibold text-yellow-400">
          Luxury Car Service Platform
        </p>
        <p>Performance. Precision. Premium Care.</p>
      </Motion.div>
    </div>
  );
}