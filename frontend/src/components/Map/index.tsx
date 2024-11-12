import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, TAMPA_BAY } from "../../config";

interface MapComponentProps {
  latitude: string;
  longitude: string;
}

const libraries: any = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "400px",
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>(TAMPA_BAY);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCenter({ lat, lng });
        setMarker({ lat, lng });
      }
    }
  }, [latitude, longitude]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
