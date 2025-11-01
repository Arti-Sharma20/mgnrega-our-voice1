import React, { useState } from "react";
import DistrictSelector from "../components/DistrictSelector";  // exact match
import Dashboard from "../components/Dashboard";



function HomePage() {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div>
      <DistrictSelector onSelect={setSelectedDistrict} />
      <Dashboard district={selectedDistrict} />
    </div>
  );
}

export default HomePage;
