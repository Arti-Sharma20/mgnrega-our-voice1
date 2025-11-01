import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DistrictSelector from "./components/DistrictSelector";
import Dashboard from "./components/Dashboard";

const districtsList = [
  "Pune", "Una", "Mumbai", "Nagpur", "Shimla", "Aurangabad", "Solapur",
  "Kolhapur", "Thane", "Raigad", "Amravati", "Satara", "Wardha", "Nanded"
];

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const districtName = data.address.county || data.address.city || "";
          if (districtsList.includes(districtName)) {
            setSelectedDistrict(districtName);
          }
        } catch (err) {
          console.log("Error fetching district from coordinates:", err);
        } finally {
          setLoadingLocation(false);
        }
      }, () => setLoadingLocation(false));
    } else {
      setLoadingLocation(false);
    }
  }, []);

  return (
    <div>
      <Header />
      {loadingLocation ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>Detecting your district...</p>
      ) : (
        <>
          <DistrictSelector
            districts={districtsList}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
          <Dashboard selectedDistrict={selectedDistrict} />
        </>
      )}
    </div>
  );
}

export default App;
