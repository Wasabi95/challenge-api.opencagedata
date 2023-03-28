import logo from "./logo.svg";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const API_KEY = "49fe8295151249359b0efb5aed84e8c3";
    const API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;
    try {
      const response = await axios.get(API_URL);
      const { results } = response.data;
      if (results.length > 0) {
        const { formatted } = results[0];
        setLocation(formatted);
      } else {
        setLocation("Location not found");
      }
    } catch (error) {
      console.log(error);
      setLocation("Error getting location");
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  return (
    <div className="App">
      <h1>OpenCageData Example</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Latitude:
          <input
            type="text"
            name="latitude"
            value={latitude}
            onChange={handleLatitudeChange}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </label>
        <br />
        <button type="submit">Get Location</button>
      </form>
      <p>Location: {location}</p>
    </div>
  );
};

export default App;
