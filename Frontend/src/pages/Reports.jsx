import React, { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const res = await API.get("/reports");
    setData(res.data.invoices);
  };
  fetchData();
}, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="bg-gray-900 p-6 rounded-xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="service" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
