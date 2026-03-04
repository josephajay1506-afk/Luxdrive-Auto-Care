import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useMemo} from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);


export default function TuningStages() {
  const navigate = useNavigate();
  const [openStage] = useState(null);
  const [selectedStage, setSelectedStage] = useState(1);


  const stages = [
    {
      id: 1,
      name: "Stage 1",
      color: "text-blue-400",
      price: "Starting ₹45,000",
      tagline: "OEM + Performance Optimization",
      power: "+20–45 HP",
      torque: "+40–80 Nm",
      content: [
        {
          title: "🔧 ECU & Calibration",
          items: [
            "Custom ECU remap (fuel, ignition, boost optimization)",
            "Throttle response refinement",
            "Torque limiter recalibration",
            "Rev limiter optimization (safe OEM margin)",
            "Speed governor removal (optional)"
          ]
        },
        {
          title: "🛡 Safety & Reliability",
          items: [
            "AFR safety calibration",
            "Knock sensor monitoring optimization",
            "Thermal management adjustment",
            "OEM file backup stored securely",
            "Conservative daily-drivable tuning strategy"
          ]
        },
        {
          title: "📊 Testing & Validation",
          items: [
            "Pre-tuning health diagnostics",
            "OBD system scan",
            "Road validation testing",
            "Performance log analysis",
            "Engine Dyno Validation Run",
            "Pressure Stability Testing"
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Stage 2",
      color: "text-yellow-400",
      price: "Starting ₹1,25,000",
      tagline: "Hardware + ECU Performance Package",
      power: "+60–110 HP",
      torque: "+100–180 Nm",
      content: [
        {
          title: "🔧 Hardware Upgrades",
          items: [
            "High-flow air intake system",
            "Performance downpipe (where legal)",
            "Intercooler upgrade (if required)",
            "High-pressure fuel calibration support",
            "Upgraded spark plug heat range"
          ]
        },
        {
          title: "🧠 ECU & Mapping",
          items: [
            "Custom dyno calibration",
            "Boost pressure enhancement",
            "Fuel delivery optimization",
            "Ignition timing optimization",
            "Torque management refinement"
          ]
        },
        {
          title: "📈 Validation",
          items: [
            "Dyno tuning session",
            "AFR live monitoring",
            "Boost leak testing",
            "Heat cycle evaluation",
            "Post-tuning road validation",
            "Launch Control Testing"
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Stage 3",
      color: "text-red-400",
      price: "Starting ₹4,50,000",
      tagline: "Full Performance Build",
      power: "+120–300+ HP",
      torque: "+200–400+ Nm",
      content: [
        {
          title: "🏎 Major Hardware",
          items: [
            "Turbo upgrade / Hybrid turbo",
            "Upgraded injectors",
            "High-pressure fuel pump",
            "Performance intercooler",
            "Full performance exhaust system",
            "Forged internal compatibility check"
          ]
        },
        {
          title: "🧠 Advanced Calibration",
          items: [
            "Multi-session dyno tuning",
            "Boost control reprogramming",
            "Launch control tuning",
            "Burble / exhaust tuning (optional)",
            "Track map optimization"
          ]
        },
        {
          title: "🧪 Motorsport Validation",
          items: [
            "Extended dyno sessions",
            "Data logging analysis",
            "Heat stress validation",
            "Boost pressure stability testing",
            "Track-focused calibration profile"
          ]
        }
      ]
    }
  ];

  const [hp, setHp] = useState("");
  const [torque, setTorque] = useState("");
  const [stage, setStage] = useState(1);

  const multiplier = {
    1: 1.12,
    2: 1.28,
    3: 1.45,
  };

  const calculate = () => {
    if (!hp || !torque) return null;

    const newHP = Math.round(hp * multiplier[stage]);
    const newTorque = Math.round(torque * multiplier[stage]);

    return { newHP, newTorque };
  };

  const result = calculate();


 const dynoData = useMemo(() => {
  const stock = [120,150,180,210,230,240,250,248,240,220];

  const multiplier = {
    1: 1.12,
    2: 1.28,
    3: 1.45
  };

  const tuned = stock.map(v =>
    Math.round(v * multiplier[selectedStage])
  );

  return {
    labels: ["1500","2000","2500","3000","3500","4000","4500","5000","5500","6000"],
    datasets: [
      {
        label: "Stock Power",
        data: stock,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        tension: 0.4,
        fill: true,
      },
      {
        label: `Stage ${selectedStage} Tuned`,
        data: tuned,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        fill: true,
      }
    ]
  };
}, [selectedStage]);


const dynoOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: "#fff" },
    },
  },
  scales: {
    x: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
    y: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
  },
};

const sectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      {/* HEADER */}
      <Motion.h1
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-4xl font-bold text-center mb-4"
>
  Performance Tuning Division 🏎️
</Motion.h1>

<Motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="text-center text-gray-400 mb-12"
>
  Precision engineered ECU & hardware performance upgrades
</Motion.p>


      {/* STAGE CARDS */}
      <div className="grid md:grid-cols-3 gap-8">
        {stages.map(stage => (
          <Motion.div
          key={stage.id}
          variants={sectionAnim}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: stage.id * 0.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
            className="bg-black/30 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-white/50 hover:border-white transition"
          >
            <h2 className={`text-2xl font-bold mb-2 ${stage.color}`}>
              {stage.name}
            </h2>

            <p className="text-gray-400 mb-2">{stage.tagline}</p>

            <div className="text-lg font-semibold mb-3 text-green-400">
              {stage.price}
            </div>

            <div className="text-sm text-gray-300 mb-4">
              ⚡ {stage.power} <br />
              🔩 {stage.torque}
            </div>
             {/* ALWAYS EXPANDED CONTENT */}
            <div className="space-y-6 text-sm">
              {stage.content.map((section, i) => (
                <div key={i}>
                  <h4 className="font-semibold mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1 text-gray-300">
                    {section.items.map((item, idx) => (
                      <li key={idx}>✔ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {openStage === stage.id && (
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-6 text-sm"
                >
                  {stage.content.map((section, i) => (
                    <div key={i}>
                      <h4 className="font-semibold mb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-1 text-gray-300">
                        {section.items.map((item, idx) => (
                          <li key={idx}>✔ {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => navigate("/add-booking")}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold"
            >
              Book Performance Upgrade 🚀
            </button>
          </Motion.div>
        ))}
      </div>

      {/* ================= EVERY STAGE INCLUDES ================= */}
<Motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.97 }}

  className="mt-20 bg-black/30 border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-white/50 hover:border-white transition"
>
  <Motion.h3
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-2xl font-bold mb-6"
  >
    🏁 Every Stage Includes
  </Motion.h3>

  <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-300">
    {[
      "Pre-Tuning 40-Point Health Inspection",
      "ECU Full Backup & Recovery File",
      "Fault Code Deep Scan",
      "Boost Leak Test",
      "Fuel Pressure Monitoring",
      "AFR Safety Verification",
      "Post-Tuning Road Validation",
      "Dyno Performance Report (Digital Copy)",
      "Performance Certificate Issued",
      "After-Tune Support (7–14 days)",
      "Calibration Warranty Support",
      "Torque & Throttle Response Optimization",
      "Transmission Adaptation Reset & Learning",
      "Thermal Stress Monitoring (Engine & Turbo)",
      "Knock Detection & Ignition Timing Verification",
      "Data Log Transparency Report"
    ].map((item, i) => (
      <Motion.div
        key={i}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.04 }}
        viewport={{ once: true }}
        className="hover:text-white transition"
      >
        ✔ {item}
      </Motion.div>
    ))}
  </div>
</Motion.div>

      {/* ================= COMPARISON TABLE ================= */}
<Motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="mt-20 overflow-x-auto"
>
  <Motion.h3
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-2xl font-bold text-center mb-8"
  >
    Stage Comparison
  </Motion.h3>

  <Motion.table
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    viewport={{ once: true }}
    className="w-full text-sm rounded-xl bg-black/30 border border-white/20 overflow-hidden"
  >
    <thead className="bg-white/10">
      <tr>
        <th className="p-4">Feature</th>
        <th className="p-4">Stage 1</th>
        <th className="p-4">Stage 2</th>
        <th className="p-4">Stage 3</th>
      </tr>
    </thead>

    <tbody>
      {[
        ["Power Gain","+20–45 HP","+60–110 HP","+120–300+ HP"],
        ["Torque Gain","+40–80 Nm","+100–180 Nm","+200–400+ Nm"],
        ["Hardware Mods","❌","Required","Extensive"],
        ["Dyno Tuning","Basic","Advanced","Multi-Session"],
        ["Daily Drivable","✔ Yes","✔ Yes","⚠ Limited"],
        ["Fuel System Upgrade","❌","Optional","Required"],
        ["Turbo Upgrade","❌","Optional","Required"],
        ["Cooling Upgrade","❌","Recommended","Mandatory"],
        ["Track Compatibility","❌","Limited","✔ Yes"],
        ["Warranty Impact","Minimal","Moderate","Significant"],
        ["Installation Time","3–4 Hours","1–2 Days","5–10 Days"],
        ["Skill Level Required","Certified","Senior","Master Technician"]
      ].map((row, i) => (
        <Motion.tr
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 hover:bg-white/5 transition"
        >
          {row.map((cell, idx) => (
            <td key={idx} className="p-4 text-center">
              {cell}
            </td>
          ))}
        </Motion.tr>
      ))}
    </tbody>
  </Motion.table>
</Motion.div>

{/* ================= DYNO SECTION ================= */}
<Motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="mt-20 bg-zinc-900/60 backdrop-blur-lg border border-white/10 rounded-xl p-8"
>

  <Motion.h2
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-2xl font-bold text-center mb-6"
  >
    Dyno Performance Validation 📊
  </Motion.h2>

  {/* ================= Stage Selector ================= */}
  <div className="flex justify-center gap-4 mb-8">
  {[1, 2, 3].map(stage => (
    <button
      key={stage}
      onClick={() => setSelectedStage(stage)}
      className={`px-6 py-2 rounded-lg transition ${
        selectedStage === stage
          ? "bg-green-600 text-white"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      Stage {stage}
    </button>
  ))}
</div>


  {/* ================= Chart Animation ================= */}
  <Motion.div
    key={selectedStage}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <Line data={dynoData} options={dynoOptions} />
  </Motion.div>

  {/* ================= Performance Cards ================= */}
  <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">

    {[
      {
        title: "Estimated HP Gain",
        value: selectedStage === 1 ? "20–45" : selectedStage === 2 ? "60–110" : "120–300+",
        color: "green"
      },
      {
        title: "Estimated Torque Gain",
        value: selectedStage === 1 ? "40–80" : selectedStage === 2 ? "100–180" : "200–400+",
        color: "blue"
      },
      {
        title: "Dyno Validation Level",
        value:
          selectedStage === 1
            ? "Road Verified"
            : selectedStage === 2
            ? "Dyno Calibrated"
            : "Multi-Session Dyno Tuned",
        color: "purple"
      }
    ].map((card, i) => (
      <Motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.15 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className={`bg-${card.color}-600/10 border border-${card.color}-500/30 rounded-lg p-4`}
      >
        <p className="text-gray-400 text-sm">{card.title}</p>
        <p className={`text-2xl font-bold text-${card.color}-400`}>
          {card.title.includes("Gain") ? "+" : ""}{card.value}
          {card.title.includes("HP") ? " HP" : card.title.includes("Torque") ? " Nm" : ""}
        </p>
      </Motion.div>
    ))}

  </div>

</Motion.div>

{/* ================= WHY DYNO VALIDATION ================= */}
<Motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="mt-10 pt-7"
>
  <Motion.h3
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-2xl font-bold text-center mb-6"
  >
    Why Dyno Validation Matters ⚠
  </Motion.h3>

  <div className="grid md:grid-cols-2 gap-6 text-sm">
    {[
      {
        title: "Verifies real power gains",
        desc: "Confirms actual horsepower and torque improvements under controlled load conditions."
      },
      {
        title: "Ensures safe AFR levels",
        desc: "Maintains optimal air-fuel ratios to protect engine internals from lean or rich damage."
      },
      {
        title: "Confirms boost stability",
        desc: "Validates turbo boost consistency and eliminates pressure spikes or drops."
      },
      {
        title: "Validates calibration accuracy",
        desc: "Ensures ignition timing, torque limits, and fuel delivery are precisely mapped."
      },
      {
        title: "Detects thermal stress early",
        desc: "Identifies excessive heat buildup before it affects engine longevity."
      },
      {
        title: "Provides documented proof of performance",
        desc: "Digital dyno reports offer measurable data instead of marketing claims."
      }
    ].map((item, i) => (
      <Motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        viewport={{ once: true }}
        
        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
      >
        ✔ {item.title}
        <p className="text-gray-400 mt-2">
          {item.desc}
        </p>
      </Motion.div>
    ))}
  </div>

  {/* Authority Banner */}
  <Motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    viewport={{ once: true }}
    className="mt-10 bg-gradient-to-r from-green-600/10 to-cyan-600/10 border border-green-500/20 rounded-xl p-6 text-center"
  >
    <p className="text-lg font-semibold">
      Real Performance Is Measured — Not Assumed.
    </p>
    <p className="text-gray-400 text-sm mt-2">
      Every tuning stage is validated for safety, stability, and sustainable power delivery.
    </p>
  </Motion.div>
</Motion.div>


{/* ================= PERFORMANCE CALCULATOR ================= */}
<Motion.div
  initial={{ opacity: 0, y: 70 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 mt-16"
>
  <Motion.h3
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="text-xl font-semibold mb-6 text-center"
  >
    Performance Estimate Calculator ⚙️
  </Motion.h3>

  <div className="grid md:grid-cols-3 gap-4 mb-6">
    <input
      type="number"
      placeholder="Current HP"
      value={hp}
      onChange={(e) => setHp(Number(e.target.value))}
      className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-green-500 transition"
    />

    <input
      type="number"
      placeholder="Current Torque (Nm)"
      value={torque}
      onChange={(e) => setTorque(Number(e.target.value))}
      className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 transition"
    />

    <select
      value={stage}
      onChange={(e) => setStage(Number(e.target.value))}
      className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 transition"
    >
      <option value={1}>Stage 1</option>
      <option value={2}>Stage 2</option>
      <option value={3}>Stage 3</option>
    </select>
  </div>

  {result && (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <Motion.div
        key={result.newHP}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-green-600/10 border border-green-500/30 rounded-lg p-4 text-center"
      >
        <p className="text-sm text-gray-400">Estimated HP</p>
        <p className="text-2xl font-bold text-green-400">
          {result.newHP} HP
        </p>
      </Motion.div>

      <Motion.div
        key={result.newTorque}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 text-center"
      >
        <p className="text-sm text-gray-400">Estimated Torque</p>
        <p className="text-2xl font-bold text-blue-400">
          {result.newTorque} Nm
        </p>
      </Motion.div>
    </div>
  )}

  <p className="text-xs text-gray-500 mt-6 text-center">
    Estimates vary based on engine condition, hardware compatibility, fuel quality and calibration safety limits.
  </p>
</Motion.div>

<div className="h-20"></div>
    </div>
  );
}

export function PerformanceCalculator() {
  return null;
}
