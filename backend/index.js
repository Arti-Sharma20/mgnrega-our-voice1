import React, { useState } from "react";
import Header from "./components/Header";
import DistrictSelector from "./components/DistrictSelector";
import Dashboard from "./components/Dashboard";

const districtsList = ["Pune", "Una", "Mumbai", "Nagpur", "Shimla"]; // add more districts

function App() {
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  return (
    <div>
      <Header />
      <DistrictSelector districts={districtsList} selectedDistricts={selectedDistricts} setSelectedDistricts={setSelectedDistricts} />
      <Dashboard selectedDistricts={selectedDistricts} />
    </div>
  );
}

export default App;
