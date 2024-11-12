import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import MapComponent from "../Map";

const Converter: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [mapLatitude, setMapLatitude] = useState<string>("");
  const [mapLongitude, setMapLongitude] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const convertCoords = (): void => {
    if (latitude && longitude) {
      const latDMS = convertDDtoDMS(parseFloat(latitude), true);
      const lonDMS = convertDDtoDMS(parseFloat(longitude), false);
      setResult(`Latitude: ${latDMS}, Longitude: ${lonDMS}`);
    } else {
      toast.error("Please input Latitude and Longitude value.");
    }
  };

  const convertDDtoDMS = (dd: number, isLat: boolean): string => {
    const dir = dd < 0 ? (isLat ? "S" : "W") : isLat ? "N" : "E";
    const absDD = Math.abs(dd);
    const degrees = Math.floor(absDD);
    const minutes = Math.floor((absDD - degrees) * 60);
    const seconds = Math.round((absDD - degrees - minutes / 60) * 3600);
    return `${degrees}°${minutes}'${seconds}" ${dir}`;
  };

  const showOnMap = () => {
    if (latitude && longitude) {
      setMapLatitude(latitude);
      setMapLongitude(longitude);
    } else {
      toast.error("Please input Latitude and Longitude value.");
    }
  };

  const saveCoords = async (): Promise<void> => {
    try {
      if (latitude && longitude) {
        const response = await fetch(`${API_URL}/save-coords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            notes: "Some notes",
          }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Coordinates saved successfully!");
        }
      } else {
        toast.error("Please input Latitude and Longitude value.");
      }
    } catch (error) {
      toast.error("Failed to save coordinates. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      {/* Flex container for inputs and buttons */}
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Latitude (DD)"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <input
          type="text"
          placeholder="Longitude (DD)"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          onClick={convertCoords}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Convert Coords
        </button>
        <button
          onClick={showOnMap}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Show Coords on Map
        </button>
        <button
          onClick={saveCoords}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
        >
          Save Coords
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-medium">Converted Output: {result}</p>
      </div>

      <div className="mt-10">
        <MapComponent latitude={mapLatitude} longitude={mapLongitude} />
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Converter;
