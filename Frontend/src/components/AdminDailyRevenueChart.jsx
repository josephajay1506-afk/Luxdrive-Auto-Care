import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const AdminDailyRevenueChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchDailyRevenue = async () => {

      try {

        const res = await API.get("/admin/daily-revenue");

        setData(res.data);

      } catch (err) {

        console.error("Daily revenue error:", err);

      }

    };

    fetchDailyRevenue();

  }, []);

  return (

    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        📈 Revenue Summary
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#444"/>

          <XAxis dataKey="date" stroke="#ccc" padding={{ left: 40, right: 40 }} />

          <YAxis stroke="#ccc" width={50} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.4}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AdminDailyRevenueChart;