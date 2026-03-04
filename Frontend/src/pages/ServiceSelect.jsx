import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

/* ================= CATEGORY ORDER (STABLE CONST) ================= */
const CATEGORY_ORDER = [
  "🔧 General Maintenance & Inspection",
  "🔋 Electrical & Battery",
  "🛑 Brake System",
  "🛞 Suspension & Steering",
  "🏎️ Engine & Performance",
  "❄️ AC & Climate",
  "🎨 Detailing & Paint",
  "🛋️ Interior & Comfort",
  "🛡️ Safety & Security",
  "⚡ Hybrid & EV",
  "👑 Premium Service Packages",
  "🚀 Performance Tuning Stages",
  "🧾 Diagnostic Packages",
  "➕ Extra High-End Services"
];

/* ================= POPULAR ================= */
const POPULAR_SERVICE_NAMES = [
  "Premium Engine Oil + Filter (Synthetic)",
  "Basic Health Check & Diagnostics",
  "Brake Pad Replacement",
  "Wheel Alignment + Balancing (Laser)",
  "AC Gas Refill",
  "Premium Detailing",
  "Ceramic Coating",
  "ADAS Calibration",
  "Battery Health Check + Replacement",
  "Turbocharger Service",
  "Suspension Overhaul",
  "Interior Deep Cleaning"
];

export default function ServiceSelect() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState({});

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedServices");
    return saved ? JSON.parse(saved) : [];
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    API.get("/services").then(r => setServices(r.data || []));
  }, []);

  const normalize = (str) =>
  str.toLowerCase().trim();

  /* ================= POPULAR ================= */
  const popularServices = useMemo(() => {
    return services.filter(service =>
      POPULAR_SERVICE_NAMES.some(pop =>
        normalize(pop) === normalize(service.name)
      )
    );
  }, [services]);

  /* ================= WORKSHOP BAY LOGIC ================= */
  const getBay = (name) => {
    const n = name.toLowerCase();

    if (n.includes("oil") || n.includes("filter") || n.includes("wheel"))
      return { bay: "Bay 2", type: "Quick Service Bay ⚡" };

    if (n.includes("brake") || n.includes("suspension"))
      return { bay: "Bay 4", type: "Chassis & Brake Bay 🛞" };

    if (n.includes("engine") || n.includes("turbo") || n.includes("calibration") || n.includes("tune") || n.includes("track") || n.includes("upgrade"))
      return { bay: "Bay 6", type: "Engine Specialist Bay 🏎️" };

    if (n.includes("stage 1") || n.includes("stage 2") || n.includes("stage 3"))
      return { bay: "Bay 8", type: " Performance Tuning Dyno Bay 🚀" };

    if (n.includes("cooling") || n.includes("climate") || n.includes("ac"))
      return { bay: "Bay 3", type: "AC Climate Bay ❄️" };

    if (n.includes("detail") || n.includes("coating") || n.includes("wash") || n.includes("polish") || n.includes("restore") || n.includes("repaint"))
      return { bay: "Detail Studio", type: "Luxury Detailing Zone ✨" };

    if (n.includes("diagnostic") || n.includes("scan"))
      return { bay: "Diag Lane", type: "Diagnostic Lane 🧾" };

    if (n.includes("battery") || n.includes("electrical"))
      return { bay: "Bay 5", type: "Electrical Bay 🔋" };

    if (n.includes("essential") || n.includes("grand signature") || n.includes("prime plus") || n.includes("ultimate elite"))
      return { bay: "Bay 7", type: "Multi-Service Bay 🛠️" };

    return { bay: "Bay 1", type: "General Service Bay 🔧" };
  };

  /* ================= META ================= */
  const getMeta = (name) => {
    const n = name.toLowerCase();

    if (n.includes("oil") || n.includes("filter") || n.includes("health check") || n.includes("diagnostic") || n.includes("alignment") || n.includes("balancing") || n.includes("battery") || n.includes("check") || n.includes("refill") || n.includes("cleaning"))
      return { time: "60–90 min", skill: "Certified", diff: "Basic" };

    if (n.includes("brake") || n.includes("suspension") || n.includes("interior") || n.includes("detailing") || n.includes("coating") || n.includes("calibration") || n.includes("deep cleaning") || n.includes("audio") || n.includes("system") || n.includes("light"))
      return { time: "90–150 min", skill: "Senior", diff: "Advanced" };

    if (n.includes("stage 1"))
      return { time: "5-7 hrs", skill: "Tuning Master", diff: "Expert" };

    if (n.includes("stage 2"))
      return { time: "10-12 hrs", skill: "Tuning Master", diff: "Expert" };

    if (n.includes("stage 3"))
      return { time: "1-2 days", skill: "Tuning Master", diff: "Expert"};

    if (n.includes("essential") || n.includes("grand signature"))
      return { time: "5-6 hrs", skill: "Senior", diff: "Advanced"};

    if (n.includes("prime plus") || n.includes("ultimate elite"))
      return { time: "8-12 hrs", skill: "Specialist", diff: "Expert"};

    if (n.includes("engine") || n.includes("turbo") || n.includes("performance") || n.includes("overhaul") || n.includes("ceramic") || n.includes("LED") || n.includes("tint") || n.includes("kit") || n.includes("box") || n.includes("spoiler") || n.includes("diffuser"))
      return { time: "4–8 hrs", skill: "Master", diff: "Expert" };

    if (n.includes("coating") || n.includes("ppf") || n.includes("wrap") || n.includes("tint") || n.includes("body") || n.includes("led") || n.includes("spoiler") || n.includes("diffuser") || n.includes("audio") || n.includes("stereo") || n.includes("speaker"))
      return { time: "1–2 days", skill: "Detail Master", diff: "Expert" };

    return { time: "60–120 min", skill: "Certified", diff: "Standard" };
  };

  /* ================= GROUP + ORDER + SEARCH ================= */
  const grouped = useMemo(() => {
    const map = {};

    services.forEach(s => {
      const match = s.name.toLowerCase().includes(search.toLowerCase());
      if (!match) return;

      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    });

    const ordered = {};

    // popular always top
    if (popularServices.length) {
      ordered["⭐ Popular Services"] = popularServices.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    CATEGORY_ORDER.forEach(cat => {
      if (map[cat]?.length) ordered[cat] = map[cat];
    });

    return ordered;
  }, [services, popularServices, search]);

  /* ================= SELECT ================= */
  const toggle = (svc) => {
    setSelected(prev => {
      const exists = prev.find(x => x._id === svc._id);
      if (exists) return prev.filter(x => x._id !== svc._id);
      return [...prev, svc];
    });
  };

  const isSelected = id => selected.some(x => x._id === id);

  /* ================= BAY SUMMARY ================= */
  const baySummary = selected.length
    ? [...new Set(selected.map(s => getBay(s.name).bay))].join(", ")
    : null;

  /* ================= CARD ================= */
  const ServiceCard = ({ s }) => {
    const meta = getMeta(s.name);
    const bay = getBay(s.name);

    const diffColor =
      meta.diff === "Basic"
        ? "bg-green-600/20"
        : meta.diff === "Advanced"
        ? "bg-yellow-600/20"
        : "bg-red-600/20";

    return (
      <Motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => toggle(s)}
        className={`p-4 rounded-xl border text-left transition-all duration-200
        hover:bg-white/10
        ${isSelected(s._id)
          ? "bg-green-600/20 border-green-500"
          : "bg-gradient-to-br from-white/10 to-white/5 border-white/10"}
        `}
      >
        <div className="font-semibold">{s.name}</div>

        <div className="text-sm text-gray-400 mt-1">
          ₹{s.minPrice} – ₹{s.maxPrice}
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
        </div>

        <div className="text-xs text-cyan-400 mt-2">
          🏁 {bay.type} — {bay.bay}
        </div>
      </Motion.button>
    );
  };

  /* ================= DONE ================= */
  const done = () => {
    localStorage.setItem("selectedServices", JSON.stringify(selected));
    navigate(-1);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold">
            Premium Service Selection Hub 🏁
          </h1>
          <p className="text-gray-400">
            Intelligent workshop service & bay allocation
          </p>
        </Motion.div>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search services..."
        className="w-full mb-8 bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
      />

      {/* CATEGORIES */}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-5 border border-white/10 rounded-xl overflow-hidden">

          <Motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            onClick={() => setOpenCats(p => ({ ...p, [cat]: !p[cat] }))}
            className="w-full px-5 py-4 bg-white/10 font-semibold flex justify-between transition"
          >
            {cat}
            <span>{openCats[cat] ? "▲" : "▼"}</span>
          </Motion.button>

          <AnimatePresence>
            {openCats[cat] && (
              <Motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4 grid md:grid-cols-4 gap-3"
              >
                {items.map(s => (
                  <ServiceCard key={s._id} s={s} />
                ))}
              </Motion.div>
            )}
          </AnimatePresence>

        </div>
      ))}

      <div className="h-36" />

      {/* CONFIRM BAR */}
      <Motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 p-4 backdrop-blur-xl"
      >
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{selected.length} services selected</span>
          <span>Assigned Bays: {baySummary || "—"}</span>
        </div>

        <Motion.button
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.65 }}
          onClick={done}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold transition"
        >
          Confirm Selection ✅
        </Motion.button>
      </Motion.div>

    </div>
  );
}
