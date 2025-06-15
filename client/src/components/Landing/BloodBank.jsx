import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { FaClock, FaPhone, FaMapMarkerAlt, FaSearch, FaHeart, FaTint,FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const INDIA_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;
const SEARCH_ZOOM = 12;

// ✅ Component to update map view dynamically
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (
      Array.isArray(center) &&
      typeof center[0] === 'number' &&
      typeof center[1] === 'number' &&
      typeof zoom === 'number'
    ) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

// ✅ Prop validation for MapController
MapController.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

const BloodBankLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(INDIA_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample blood banks database for India (expanded dataset)
  const bloodBanksDatabase = [
    // Delhi
    { name: "Safdarjung Hospital Blood Bank", city: "Delhi", state: "Delhi", lat: 28.5763, lng: 77.2100, hours: "24/7", contact: "011-2610-6666", address: "Safdarjung Enclave, New Delhi" },
    { name: "Lady Hardinge Medical College Blood Bank", city: "Delhi", state: "Delhi", lat: 28.5890, lng: 77.2050, hours: "9 AM - 6 PM", contact: "011-2436-6681", address: "Bahadur Shah Zafar Marg, New Delhi" },
    { name: "Deep Chand Bandhu Hospital Blood Bank", city: "Delhi", state: "Delhi", lat: 28.6657, lng: 77.2545, hours: "8 AM - 8 PM", contact: "011-2297-8554", address: "Shahdara, Delhi" },
    { name: "Deen Dayal Upadhyay Hospital Blood Bank", city: "Delhi", state: "Delhi", lat: 28.7201, lng: 77.2580, hours: "24/7", contact: "011-2239-6414", address: "Shivaji Marg, New Delhi" },
    { name: "GTB Hospital Blood Bank", city: "Delhi", state: "Delhi", lat: 28.6672, lng: 77.2195, hours: "24/7", contact: "011-2356-1824", address: "Wazirabad Road, New Delhi" },
    { name: "AIIMS Blood Bank", city: "Delhi", state: "Delhi", lat: 28.5880, lng: 77.1980, hours: "24/7", contact: "011-2658-8500", address: "Ansari Nagar, New Delhi" },
    // Mumbai
    { name: "Tata Memorial Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 19.0176, lng: 72.8561, hours: "24/7", contact: "022-2417-7000", address: "Dr. E Borges Road, Parel, Mumbai" },
    { name: "KEM Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 18.9889, lng: 72.8317, hours: "24/7", contact: "022-2410-7000", address: "489, Rasta Peth, Pune Road, Mumbai" },
    { name: "Sir JJ Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 18.9560, lng: 72.8258, hours: "24/7", contact: "022-2302-3700", address: "Byculla East, Mumbai" },
    { name: "Fortis Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 19.1180, lng: 72.8430, hours: "24/7", contact: "022-4131-3131", address: "Mulund West, Mumbai" },
    { name: "Kokilaben Dhirubhai Ambani Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 19.0770, lng: 72.8408, hours: "24/7", contact: "022-3096-6000", address: "Andheri West, Mumbai" },
    { name: "Hinduja Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 19.1185, lng: 72.8562, hours: "24/7", contact: "022-2373-6666", address: "Mahim Junction, Mumbai" },
    { name: "Jaslok Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", lat: 18.9938, lng: 72.8172, hours: "24/7", contact: "022-6656-4444", address: "Pedder Road, Mumbai" },

    
    // Kolkata
    { name: "Medical College Hospital Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, hours: "24/7", contact: "033-2241-3106", address: "88, College Street, Kolkata" },
    { name: "SSKM Hospital Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5410, lng: 88.3468, hours: "24/7", contact: "033-2204-1000", address: "244, AJC Bose Road, Kolkata" },
    { name: "Belle Vue Clinic Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5370, lng: 88.3545, hours: "9 AM - 5 PM", contact: "033-2287-4081", address: "36, Ballygunge Circular Road, Kolkata" },
    { name: "Apollo Gleneagles Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5711, lng: 88.4004, hours: "24/7", contact: "033-3988-5050", address: "58B, Canal Circular Road, Kolkata" },
    { name: "Woodland Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5037, lng: 88.3235, hours: "8 AM - 8 PM", contact: "033-2454-6267", address: "25, Russell Street, Kolkata" },
    { name: "AMRI Hospital Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5645, lng: 88.3436, hours: "24/7", contact: "033-4026-6500", address: "1, AJC Bose Road, Kolkata" },
    { name: "National Medical College Blood Bank", city: "Kolkata", state: "West Bengal", lat: 22.5332, lng: 88.3604, hours: "24/7", contact: "033-2223-9232", address: "91, S P Mukherjee Road, Kolkata" },

    // Chennai
    { name: "Apollo Hospital Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 13.0358, lng: 80.2297, hours: "24/7", contact: "044-2829-3333", address: "21, Greams Lane, Off Greams Road, Chennai" },
    { name: "Government General Hospital Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 13.0878, lng: 80.2785, hours: "24/7", contact: "044-2819-3000", address: "EVR Periyar Salai, Park Town, Chennai" },
    { name: "Stanley Medical College Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 13.0858, lng: 80.2812, hours: "24/7", contact: "044-2560-5544", address: "Poonamallee High Road, Chennai" },
    { name: "Sri Ramachandra Medical College Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 13.0103, lng: 80.2552, hours: "24/7", contact: "044-2747-1444", address: "Porur, Chennai" },
    { name: "Madras Medical College Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 13.0638, lng: 80.2613, hours: "24/7", contact: "044-2530-1492", address: "Park Town, Chennai" },
    { name: "Dr. Rela Institute Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 12.9718, lng: 80.1995, hours: "24/7", contact: "044-4901-3333", address: "Chromepet, Chennai" },
    { name: "SRM Hospital Blood Bank", city: "Chennai", state: "Tamil Nadu", lat: 12.8275, lng: 80.0413, hours: "24/7", contact: "044-2745-0100", address: "Kattankulathur, Chennai" },

    // Bangalore
    { name: "Nimhans Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.9435, lng: 77.5962, hours: "24/7", contact: "080-2699-5745", address: "Hosur Road, Bangalore" },
    { name: "Victoria Hospital Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.9698, lng: 77.5986, hours: "8 AM - 8 PM", contact: "080-2670-1150", address: "Fort, Bangalore Medical College Road, Bangalore" },
    { name: "Fortis Hospital Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5760, hours: "24/7", contact: "080-2558-4333", address: "Bannerghatta Road, Bangalore" },
    { name: "Manipal Hospital Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.9430, lng: 77.5500, hours: "24/7", contact: "080-6760-1234", address: "Old Airport Road, Bangalore" },
    { name: "Columbia Asia Hospital Blood Bank", city: "Bangalore", state: "Karnataka", lat: 13.0005, lng: 77.5709, hours: "24/7", contact: "080-6678-4000", address: "Whitefield, Bangalore" },
    { name: "Hosmat Hospital Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.9682, lng: 77.5970, hours: "24/7", contact: "080‑2558‑8068", address: "Seshadripuram, Bangalore" },
    { name: "Narayana Health Blood Bank", city: "Bangalore", state: "Karnataka", lat: 12.8390, lng: 77.6510, hours: "24/7", contact: "080-6723-1234", address: "Kempfort, Bangalore" },

    // Hyderabad
    { name: "Gandhi Hospital Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.4435, lng: 78.4610, hours: "24/7", contact: "040-2754-2904", address: "Musheerabad, Hyderabad" },
    { name: "Osmania General Hospital Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, hours: "24/7", contact: "040-2460-7777", address: "Afzal Gunj, Hyderabad" },
    { name: "Yashoda Hospital Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.4239, lng: 78.3412, hours: "24/7", contact: "040-6555-8333", address: "Somajiguda, Hyderabad" },
    { name: "CARE Hospitals Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.4077, lng: 78.4380, hours: "24/7", contact: "040-2340-4567", address: "Banjara Hills, Hyderabad" },
    { name: "MaxCure Hospital Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.3854, lng: 78.4867, hours: "24/7", contact: "040-6655-8888", address: "Secunderabad, Hyderabad" },
    { name: "Sunshine Hospitals Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.4780, lng: 78.3804, hours: "9 AM – 6 PM", contact: "040-6466-6766", address: "Gachibowli, Hyderabad" },
    { name: "Manipal Hospital Blood Bank", city: "Hyderabad", state: "Telangana", lat: 17.4259, lng: 78.4053, hours: "24/7", contact: "040-6686-2000", address: "Banjara Hills, Hyderabad" },

    // Ahmedabad
    { name: "Civil Hospital Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, hours: "24/7", contact: "079-2268-9308", address: "Asarwa, Ahmedabad" },
    { name: "Prathama Blood Centre", city: "Ahmedabad", state: "Gujarat", lat: 23.0395, lng: 72.5660, hours: "9 AM - 6 PM", contact: "079-2630-5555", address: "Drive-in Road, Ahmedabad" },
    { name: "Shree Krishna Hospital Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0218, lng: 72.5554, hours: "8 AM – 8 PM", contact: "079-2754-4960", address: "Girdharnagar, Ahmedabad" },
    { name: "CIMS Hospital Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0368, lng: 72.5161, hours: "24/7", contact: "079-6675-3322", address: "Vejalpur, Ahmedabad" },
    { name: "Sterling Hospital Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0597, lng: 72.5533, hours: "24/7", contact: "079-4020-4222", address: "Ellis Bridge, Ahmedabad" },
    { name: "Sal Hospital Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0231, lng: 72.5552, hours: "9 AM – 6 PM", contact: "079-2754-6983", address: "Pethapur Rd, Ahmedabad" },
    { name: "Civil Hospital (Old Campus) Blood Bank", city: "Ahmedabad", state: "Gujarat", lat: 23.0240, lng: 72.5718, hours: "24/7", contact: "079-2268-9400", address: "Asarwa, Ahmedabad" },

    // Pune
    { name: "Sassoon General Hospital Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5196, lng: 73.8553, hours: "24/7", contact: "020-2612-7301", address: "Near Pune Railway Station, Pune" },
    { name: "Ruby Hall Clinic Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, hours: "24/7", contact: "020-2611-2121", address: "40, Sassoon Road, Pune" },
    { name: "Deenanath Mangeshkar Hospital Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5068, lng: 73.8203, hours: "24/7", contact: "020-2688-2006", address: "Erandwane, Pune" },
    { name: "Inamdar Multispeciality Hospital Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5190, lng: 73.8530, hours: "24/7", contact: "020-2565-8400", address: "Deccan Gymkhana, Pune" },
    { name: "Jehangir Hospital Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5195, lng: 73.8532, hours: "9 AM – 6 PM", contact: "020-2616-8333", address: "Shivaji Nagar, Pune" },
    { name: "Mumbai-Pune Road General Hospital Blood Bank", city: "Pune", state: "Maharashtra", lat: 18.5308, lng: 73.8871, hours: "24/7", contact: "020-2712-5981", address: "Wadgaon Khurd, Pune" },
    { name: "Ruby Hall Clinic Blood Bank (Koregaon Park)", city: "Pune", state: "Maharashtra", lat: 18.5310, lng: 73.8846, hours: "24/7", contact: "020-6603-3333", address: "Koregaon Park, Pune" },

    // Jaipur
    { name: "SMS Hospital Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, hours: "24/7", contact: "0141-251-8121", address: "JLN Marg, Jaipur" },
    { name: "Fortis Escorts Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.8467, lng: 75.8056, hours: "24/7", contact: "0141-254-7000", address: "Malviya Nagar, Jaipur" },
    { name: "SMS Medical College Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, hours: "24/7", contact: "0141-252-6500", address: "JLN Hospital Complex, Jaipur" },
    { name: "Narayana Super Speciality Hospital Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.8668, lng: 75.8136, hours: "24/7", contact: "0141-221-2345", address: "Vaishali Nagar, Jaipur" },
    { name: "Fortis Escorts Blood Bank (Malviya Nagar)", city: "Jaipur", state: "Rajasthan", lat: 26.8467, lng: 75.8056, hours: "24/7", contact: "0141-254-7000", address: "Malviya Nagar, Jaipur" },
    { name: "Apollo Spectra Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.9635, lng: 75.7793, hours: "24/7", contact: "0141-274-5555", address: "Malviya Nagar, Jaipur" },
    { name: "Chatrapati Hospital Blood Bank", city: "Jaipur", state: "Rajasthan", lat: 26.9158, lng: 75.8352, hours: "24/7", contact: "0141-236-1234", address: "Mansarovar, Jaipur" },

    // Lucknow
    { name: "King George Medical University Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8393, lng: 80.9231, hours: "24/7", contact: "0522-2258-800", address: "Chowk, Lucknow" },
    { name: "Balrampur Hospital Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8560, lng: 80.9370, hours: "24/7", contact: "0522-2265-801", address: "Sapru Marg, Lucknow" },
    { name: "King George’s Medical University Blood Bank (New Campus)", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8660, lng: 80.9230, hours: "24/7", contact: "0522-2258-800", address: "Gomti Nagar, Lucknow" },
    { name: "Sanjeevan Hospital Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8740, lng: 80.9155, hours: "24/7", contact: "0522-227-1246", address: "Gomti Nagar, Lucknow" },
    { name: "Apollo Hospital Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8580, lng: 80.8940, hours: "24/7", contact: "0522-297-9999", address: "Hazratganj, Lucknow" },
    { name: "Medanta Lucknow Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8214, lng: 80.9085, hours: "24/7", contact: "0522-4911-111", address: "Rajajipuram, Lucknow" },
    { name: "Railway Hospital (Northern Railway) Blood Bank", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8672, lng: 80.9460, hours: "24/7", contact: "0522-264-8920", address: "Charbagh, Lucknow" },

    // Patna
    { name: "Patna Medical College Hospital Blood Bank", city: "Patna", state: "Bihar", lat: 25.6093, lng: 85.1376, hours: "24/7", contact: "0612-2670-051", address: "Ashok Rajpath, Patna" },
    { name: "Sadar Hospital Blood Bank", city: "Patna", state: "Bihar", lat: 25.6100, lng: 85.1340, hours: "24/7", contact: "0612-2222-333", address: "Sadar, Patna" },
    { name: "AIIMS Patna Blood Bank", city: "Patna", state: "Bihar", lat: 25.6170, lng: 85.1500, hours: "24/7", contact: "0612-2450-300", address: "Phulwari Sharif, Patna" },
    { name: "NMCH Blood Bank", city: "Patna", state: "Bihar", lat: 25.5980, lng: 85.1270, hours: "24/7", contact: "0612-2671-500", address: "Danapur, Patna" },
    { name: "R D Gardi Medical College Blood Bank", city: "Patna", state: "Bihar", lat: 25.5874, lng: 85.1239, hours: "24/7", contact: "0612-2672-345", address: "Bajpura, Patna" },
    { name: "Jesraj Blood Bank", city: "Patna", state: "Bihar", lat: 25.6040, lng: 85.1000, hours: "24/7", contact: "0612-2334-567", address: "Khemnichak, Patna" },
    { name: "Indira Gandhi Institute Blood Bank", city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, hours: "24/7", contact: "0612-2297-049", address: "Sheikhpura, Patna" }
  ];

  // Custom marker icon
  const bloodIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter blood banks based on search query
    const filtered = bloodBanksDatabase.filter(bank => 
      bank.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    
    // If results found, center map on first result
    if (filtered.length > 0) {
      setMapCenter([filtered[0].lat, filtered[0].lng]);
      setMapZoom(SEARCH_ZOOM);
    } else {
      // Reset to India view if no results
      setMapCenter(INDIA_CENTER);
      setMapZoom(DEFAULT_ZOOM);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      
    

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-16 sm:pt-18 lg:pt-18 xl:pt-20">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-6rem)]">
          
          {/* Left Panel - Search and Results */}
          <div className="w-full lg:w-2/5 flex flex-col">
            
            {/* Search Section */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-3 mb-3 sm:mb-4 lg:mb-6 border border-red-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <FaSearch className="mr-2 text-red-600 text-base sm:text-lg" />
                Search Blood Banks
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter city, state, or hospital name..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-red-200 rounded-md sm:rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 pr-10 sm:pr-12"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="absolute right-2 top-1.5 sm:top-2 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-md transition-all duration-300 flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                  ) : (
                    <FaSearch className="text-xs sm:text-sm" />
                  )}
                </button>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Search across major cities in India
              </p>
            </div>

            {/* Return to Quick Search Button */}
            {hasSearched && (
              <div className="mb-3 sm:mb-4 lg:mb-6">
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setSearchResults([]);
                    setSearchQuery('');
                    setMapCenter([20.5937, 78.9629]);
                    setMapZoom(5);
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-md sm:rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium border border-red-200 hover:border-red-300 flex items-center"
                >
                  <FaArrowLeft className="mr-1 sm:mr-2 text-xs" />
                  Back to Quick Search
                </button>
              </div>
            )}

            {/* Quick Search Suggestions */}
            {!hasSearched && (
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-4 lg:mb-6 border border-red-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FaHeart className="mr-2 text-red-600 text-sm sm:text-base" />
                  Quick Search
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Patna', 'AIIMS'].map((city, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(city);
                        setTimeout(handleSearch, 100);
                      }}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all duration-300 text-xs sm:text-sm font-medium border border-red-200 hover:border-red-300"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Section */}
            <div className="flex-1 overflow-y-auto">
              {hasSearched && (
                <>
                  {loading ? (
                    <div className="text-center py-8 sm:py-12 bg-white rounded-lg sm:rounded-xl shadow-lg border border-red-100">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-600 mx-auto mb-3 sm:mb-4"></div>
                      <p className="text-gray-600 text-sm sm:text-base">Searching blood banks...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-red-100 p-3 sm:p-4 lg:p-6">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                          <FaTint className="mr-2 text-red-600 text-sm sm:text-base" />
                          Found {searchResults.length} Blood Bank{searchResults.length !== 1 ? 's' : ''}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">Click on any card to view location on map</p>
                      </div>
                      <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 lg:max-h-72 overflow-y-auto">
                        {searchResults.map((bank, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 rounded-md sm:rounded-lg p-2 sm:p-3 border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 cursor-pointer"
                            onClick={() => {
                              setMapCenter([bank.lat, bank.lng]);
                              setMapZoom(15);
                            }}
                          >
                            <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight pr-2">{bank.name}</h4>
                              <FaTint className="text-red-600 text-base sm:text-lg flex-shrink-0" />
                            </div>
                            <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="text-red-500 mt-0.5 sm:mt-1 flex-shrink-0 text-xs" />
                                <div>
                                  <p className="font-medium">{bank.city}, {bank.state}</p>
                                  <p className="text-xs">{bank.address}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-red-500 flex-shrink-0 text-xs" />
                                <p>{bank.hours}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaPhone className="text-red-500 flex-shrink-0 text-xs" />
                                <p>{bank.contact}</p>
                              </div>
                            </div>
                            <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-200">
                              <button className="text-red-600 hover:text-red-700 font-medium text-xs transition-colors duration-300">
                                View on Map →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12 bg-white rounded-lg sm:rounded-xl shadow-lg border border-red-100">
                      <FaSearch className="text-2xl sm:text-3xl text-gray-400 mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">No Blood Banks Found</h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                        We could not find any blood banks matching
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm px-4">
                        Try searching for major cities like Delhi, Mumbai, Kolkata, Chennai, etc.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-5 border border-red-100 h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[440px]">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-600 text-sm sm:text-base lg:text-lg" />
                Interactive Map
              </h3>
              <MapContainer 
                center={INDIA_CENTER} 
                zoom={DEFAULT_ZOOM} 
                className="h-[200px] sm:h-[280px] lg:h-[400px] xl:h-[500px] w-full rounded-md sm:rounded-lg shadow-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapController center={mapCenter} zoom={mapZoom} />
                {searchResults.map((bank, index) => (
                  <Marker 
                    key={index} 
                    position={[bank.lat, bank.lng]}
                    icon={bloodIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="space-y-2 sm:space-y-3 p-1 sm:p-2">
                        <h3 className="font-bold text-red-600 text-sm sm:text-base lg:text-lg">{bank.name}</h3>
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0 text-xs sm:text-sm" />
                          <p className="text-gray-700 text-xs sm:text-sm">{bank.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-red-500 text-xs sm:text-sm" />
                          <p className="text-gray-700 text-xs sm:text-sm">{bank.hours}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-red-500 text-xs sm:text-sm" />
                          <p className="text-gray-700 text-xs sm:text-sm">{bank.contact}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankLocator;