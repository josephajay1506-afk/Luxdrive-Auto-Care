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

const AdminProfitChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchProfit = async () => {

      try {

        const res = await API.get("/admin/profit-analytics");

        setData(res.data);

      } catch (err) {

        console.error("Profit analytics error:", err);

      }

    };

    fetchProfit();

  }, []);

  return (

    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        💰 Profit Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#444"/>

          <XAxis dataKey="booking" stroke="#ccc" padding={{ left: 40, right: 40 }} />

          <YAxis stroke="#ccc" width={50} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#facc15"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AdminProfitChart;