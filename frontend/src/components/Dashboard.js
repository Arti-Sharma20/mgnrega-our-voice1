import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Dashboard({ selectedDistrict }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedDistrict) return;

    axios
      .get(`http://localhost:5000/api/data/${selectedDistrict}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("API error:", err);
        setData([]);
      });
  }, [selectedDistrict]);

  if (!selectedDistrict)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        🙏 कृपया जिला चुनें / Please select a district
      </h2>
    );

  if (data.length === 0)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        ⚠️ कोई डेटा उपलब्ध नहीं / No data available
      </h2>
    );

  const totalWorkers = data.reduce((sum, d) => sum + d.total_workers, 0);
  const totalWorkdays = data.reduce((sum, d) => sum + d.total_workdays, 0);
  const totalExpenditure = data.reduce((sum, d) => sum + d.expenditure, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        📊 {selectedDistrict} Performance
      </h2>

      {/* Summary Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "20px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >
        <div style={cardStyle}>
          <h3>👷 Total Workers</h3>
          <p style={valueStyle}>{totalWorkers}</p>
        </div>
        <div style={cardStyle}>
          <h3>📅 Total Workdays</h3>
          <p style={valueStyle}>{totalWorkdays}</p>
        </div>
        <div style={cardStyle}>
          <h3>💰 Total Expenditure</h3>
          <p style={valueStyle}>₹{totalExpenditure.toLocaleString()}</p>
        </div>
      </div>

      <h3 style={{ textAlign: "center", marginTop: "30px" }}>
        Monthly Trend 📈
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month_year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_workers" fill="#2980b9" name="Workers" />
          <Bar dataKey="total_workdays" fill="#27ae60" name="Workdays" />
          <Bar dataKey="expenditure" fill="#f39c12" name="Expenditure" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#ecf0f1",
  padding: "15px 30px",
  borderRadius: "12px",
  border: "2px solid #3498db",
  textAlign: "center",
  minWidth: "200px",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
};

const valueStyle = {
  fontSize: "22px",
  color: "#2c3e50",
  margin: 0,
};

export default Dashboard;
