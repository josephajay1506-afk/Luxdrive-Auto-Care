import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const AdminRevenueChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchRevenue = async () => {
      try {

        const res = await API.get("/admin/revenue-analytics");

        setData(res.data);

      } catch (err) {

        console.error("Revenue analytics error:", err);

      }
    };

    fetchRevenue();

  }, []);

  return (

    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        📈 Payment Amount Analytics
      </h2>

      <ResponsiveContainer width="100%" height={340}>

        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#555" />

          <XAxis
            dataKey="booking"
            stroke="#aaa"
            padding={{ left: 40, right: 40 }}
          />

          <YAxis stroke="#aaa" width={50} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #444",
              color: "#fff"
            }}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AdminRevenueChart;