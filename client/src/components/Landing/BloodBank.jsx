import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Coordinates for West Bengal center point (approx)
const WB_CENTER = [22.5868, 87.8550]; // Near Kolkata
const ZOOM_LEVEL = 10;

const BloodBanks = () => {
  // Sample blood banks in West Bengal
  const banks = [
    { 
      name: "Central Blood Bank, Kolkata",
      lat: 22.5726, 
      lng: 88.3639,
      hours: "24/7",
      contact: "033-2225-6789",
      address: "12, Lenin Sarani, Kolkata"
    },
    { 
      name: "Howrah District Blood Bank",
      lat: 22.5958, 
      lng: 88.2636,
      hours: "8 AM - 8 PM",
      contact: "033-2660-4321",
      address: "G.T. Road, Howrah"
    },
    { 
      name: "North Bengal Blood Bank",
      lat: 26.7271, 
      lng: 88.3953,
      hours: "9 AM - 9 PM",
      contact: "0353-254-6789",
      address: "Hill Cart Road, Siliguri"
    }
  ];

  // Custom marker icon
  const bloodIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8 mt-12">West Bengal Blood Banks</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <MapContainer 
            center={WB_CENTER} 
            zoom={ZOOM_LEVEL} 
            className="h-96 z-1 w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {banks.map((bank, index) => (
              <Marker 
                key={index} 
                position={[bank.lat, bank.lng]}
                icon={bloodIcon}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="font-bold text-red-600">{bank.name}</h3>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <p>{bank.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-red-500" />
                      <p>{bank.hours}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-red-500" />
                      <p>{bank.contact}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {banks.map((bank, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{bank.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <p>{bank.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-red-500" />
                  <p>{bank.hours}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-red-500" />
                  <p>{bank.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodBanks;