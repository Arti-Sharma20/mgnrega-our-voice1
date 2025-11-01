import React from "react";

function DistrictSelector({ districts, selectedDistrict, setSelectedDistrict }) {
  return (
    <div style={{ textAlign: "center", marginTop: "25px" }}>
      <label
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginRight: "10px",
          color: "#2c3e50"
        }}
      >
        Select District:
      </label>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        style={{
          width: "230px",
          height: "38px",
          borderRadius: "8px",
          border: "1px solid #3498db",
          paddingLeft: "10px",
          fontSize: "16px",
          backgroundColor: "#f7f9fc"
        }}
      >
        <option value="">-- Select --</option>
        {districts.map((d, idx) => (
          <option key={idx} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}

export default DistrictSelector;
