import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [25.7466, 89.2517]; // default center
  const serviceData = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    const district = serviceData.find((c) =>
      c.district.toLowerCase().includes(value.toLowerCase())
    );
    if (district) {
      const cord = [district.latitude, district.longitude];
      mapRef.current.flyTo(cord, 12, { duration: 1.5 });
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="text-center my-20 space-y-8 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 shadow-sm w-full max-w-md">
          <svg
            className="h-5 w-5 text-gray-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search district..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
        <button className="btn btn-primary px-6 py-2 rounded-full">
          Search
        </button>
      </form>

      {/* Map */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-xl shadow-md overflow-hidden h-[500px]">
        <MapContainer
          center={position}
          ref={mapRef}
          zoom={8}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceData.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
