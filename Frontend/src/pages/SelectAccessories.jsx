import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function SelectAccessories() {
  const navigate = useNavigate();

  const [accessories, setAccessories] = useState([]);
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedAccessories");
    return saved ? JSON.parse(saved) : [];
  });

  const [openCats, setOpenCats] = useState({});
  const [search, setSearch] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    API.get("/accessories").then(res =>
      setAccessories(res.data || [])
    );
  }, []);

  // ================= META LOGIC =================
  const getMeta = (name) => {
    const n = name.toLowerCase();

    if (n.includes("coating") || n.includes("ppf"))
      return { time: "6–12 hrs", skill: "Senior", diff: "Advanced" };

    if (n.includes("ecu") || n.includes("software"))
      return { time: "2–4 hrs", skill: "Master", diff: "Expert" };

    if (n.includes("exhaust") || n.includes("suspension"))
      return { time: "4–8 hrs", skill: "Senior", diff: "Advanced" };

    if (n.includes("light") || n.includes("camera"))
      return { time: "1–3 hrs", skill: "Certified", diff: "Standard" };

    return { time: "30–90 min", skill: "Certified", diff: "Basic" };
  };

  // ================= BAY ALLOCATION =================
const getBay = (name) => {
  const n = name.toLowerCase();

  if (n.includes("ecu") || n.includes("software") || n.includes("tune"))
    return { bay: "Bay 6", type: "Performance Calibration Bay 🏎" };

  if (n.includes("suspension") || n.includes("coilover") || n.includes("wheel") || n.includes("tyre"))
    return { bay: "Bay 4", type: "Chassis & Wheel Bay 🛞" };

  if (n.includes("light") || n.includes("camera") || n.includes("electronic"))
    return { bay: "Bay 5", type: "Electrical Integration Bay 🔋" };

  if (n.includes("exhaust"))
    return { bay: "Bay 7", type: "Exhaust Performance Bay 🔥" };

  if (n.includes("coating") || n.includes("ppf") || n.includes("detailing"))
    return { bay: "Detail Studio", type: "Luxury Detailing Zone 🧼" };

  if (n.includes("off-road") || n.includes("lift") || n.includes("snorkel"))
    return { bay: "Fabrication Bay", type: "Off-Road Build Zone 🏕" };

  if (n.includes("interior") || n.includes("ambient") || n.includes("seat"))
    return { bay: "Bay 3", type: "Interior Customization Bay ✨" };

  return { bay: "Bay 1", type: "General Installation Bay 🔧" };
};

// ================= POPULAR ACCESSORIES =================
const POPULAR_ACCESSORIES = [
  "Stage 1 ECU Tuning",
  "Valvetronic Exhaust System",
  "Adjustable Coilover Suspension Kit",
  "Forged Alloy Wheels",
  "Carbon Fiber Front Lip",
  "Full Color Change Wrap",
  "Paint Protection Film",
  "9H Ceramic Coating",
  "Ambient Lighting System",
  "Android Touchscreen Head Unit",
  "360° Camera System",
  "Big Brake Kit (6/8 Piston)"
];

const popularAccessories = accessories.filter(a =>
  POPULAR_ACCESSORIES.includes(a.name)
);

  // ================= GROUP + SORT =================
  const grouped = useMemo(() => {
  const map = {};

  accessories.forEach(a => {
    if (!map[a.category]) map[a.category] = [];
    map[a.category].push(a);
  });

  Object.keys(map).forEach(cat => {
    map[cat].sort((a, b) => a.name.localeCompare(b.name));
  });

  let sorted = Object.fromEntries(
    Object.entries(map).sort((a, b) =>
      a[0].localeCompare(b[0])
    )
  );

  if (popularAccessories.length) {
    sorted = {
      "⭐ Popular Accessories": popularAccessories,
      ...sorted
    };
  }

  return sorted;
}, [accessories, popularAccessories]);

const baySummary = selected.length
  ? [...new Set(selected.map(a => getBay(a.name).bay))].join(", ")
  : null;


const toggle = (acc) => {
    setSelected(prev => {
      const exists = prev.find(x => x._id === acc._id);
      if (exists) return prev.filter(x => x._id !== acc._id);
      return [...prev, acc];
    });
  };

  const done = () => {
  localStorage.setItem("selectedAccessories", JSON.stringify(selected));
  navigate("/add-booking");
};


  const isSelected = id =>
    selected.some(x => x._id === id);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      <h1 className="text-3xl font-bold mb-4">
        Premium Accessory Selection Hub 🧩
      </h1>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search accessories..."
        className="w-full mb-8 bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
      />


      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-6 border border-white/10 rounded-xl overflow-hidden">

          <Motion.button
            onClick={() => setOpenCats(p => ({ ...p, [cat]: !p[cat] }))}
            className="w-full px-5 py-4 bg-white/10 font-semibold flex justify-between"
          >
            {cat}
            <span>{openCats[cat] ? "▲" : "▼"}</span>
          </Motion.button>

          <AnimatePresence>
            {openCats[cat] && (
              <Motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="p-4 grid md:grid-cols-4 gap-4"
              >
                {items
                  .filter(a =>
                    a.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(a => {
                    const meta = getMeta(a.name);
                    const bay = getBay(a.name);

                    const diffColor =
                      meta.diff === "Basic"
                        ? "bg-green-600/20"
                        : meta.diff === "Advanced"
                        ? "bg-yellow-600/20"
                        : "bg-red-600/20";

                    return (
                      <Motion.button
                        key={a._id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggle(a)}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 hover:bg-white/10
                        ${isSelected(a._id)
                          ? "bg-green-600/20 border-green-500"
                          : "bg-gradient-to-br from-white/10 to-white/5 border-white/10"}
                        `}
                      >
                        <div className="font-semibold">{a.name}</div>

                        <div className="text-sm text-gray-400 mt-1">
                          ₹{a.minPrice} – ₹{a.maxPrice}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3 text-xs">
                          <span className="bg-blue-600/20 px-2 py-1 rounded">
                            ⏱ {meta.time}
                          </span>

                          <span className="bg-purple-600/20 px-2 py-1 rounded">
                            👨‍🔧 {meta.skill}
                          </span>

                          <span className={`${diffColor} px-2 py-1 rounded`}>
                            🧠 {meta.diff}
                          </span>

                          <span className="text-xs text-cyan-400 mt-2">
                            🏁 {bay.type} — {bay.bay}
                            </span>
                        </div>
                      </Motion.button>
                    );
                  })}
              </Motion.div>
            )}
          </AnimatePresence>

        </div>
      ))}

      {/* CONFIRM BAR */}
      <Motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 p-4 backdrop-blur-xl"
      >
       

        <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{selected.length} accessories selected</span>
            <span>Assigned Bays: {baySummary || "—"}</span>
        </div>

        <Motion.button
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.98 }}
          onClick={done}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold"
        >
          Proceed to Installation Booking 🚀
        </Motion.button>
      </Motion.div>

    </div>
  );
}
