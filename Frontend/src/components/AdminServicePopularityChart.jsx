import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
"#3b82f6",
"#22c55e",
"#f59e0b",
"#ef4444",
"#8b5cf6",
"#14b8a6",
"#06b6d4",
"#84cc16",
"#f97316",
"#ec4899",
"#6366f1",
"#9f5bdf"
];

const AdminServicePopularityChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchServices = async () => {

      try {

        const res = await API.get("/admin/service-popularity");

        setData(res.data);

      } catch (err) {

        console.error("Service popularity error:", err);

      }

    };

    fetchServices();

  }, []);

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        🔧 Service Popularity
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="service"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AdminServicePopularityChart;