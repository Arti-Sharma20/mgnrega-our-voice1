import axios from "axios";

// Fetch data from backend
export const fetchDistrictData = async (district) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/data/${district}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching district data:", err);
    return [];
  }
};

