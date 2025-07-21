import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { FaClock, FaPhone, FaMapMarkerAlt, FaSearch, FaHeart, FaTint, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PageMeta from '../common/PageMeta';
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

  // ...[Rest of the bloodBanksDatabase array, unchanged for brevity]
  // Please paste your bloodBanksDatabase array here as in your original code

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
    await new Promise(resolve => setTimeout(resolve, 500));
    const filtered = bloodBanksDatabase.filter(bank =>
      bank.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
    if (filtered.length > 0) {
      setMapCenter([filtered[0].lat, filtered[0].lng]);
      setMapZoom(SEARCH_ZOOM);
    } else {
      setMapCenter(INDIA_CENTER);
      setMapZoom(DEFAULT_ZOOM);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
    <PageMeta title="Blood Bank | RaktConnect" />

    <div
      className="min-h-screen py-0"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-16 sm:pt-18 lg:pt-18 xl:pt-20">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-6rem)]">
          {/* Left Panel - Search and Results */}
          <div className="w-full lg:w-2/5 flex flex-col">
            {/* Search Section */}
            <div
              className="rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-3 mb-3 sm:mb-4 lg:mb-6 border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(255,0,0,0.07)",
                color: "var(--text-main)",
              }}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center" style={{ color: "var(--text-main)" }}>
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
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-main)"
                  }}
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
              <p className="text-xs sm:text-sm mt-2" style={{ color: "var(--text-muted)" }}>
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
              <div
                className="rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-4 lg:mb-6 border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "rgba(255,0,0,0.07)",
                  color: "var(--text-main)"
                }}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center" style={{ color: "var(--text-main)" }}>
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
                    <div
                      className="text-center py-8 sm:py-12 rounded-lg sm:rounded-xl shadow-lg border"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "rgba(255,0,0,0.07)",
                        color: "var(--text-main)"
                      }}
                    >
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-600 mx-auto mb-3 sm:mb-4"></div>
                      <p className="text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>Searching blood banks...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div
                      className="rounded-lg sm:rounded-xl shadow-lg border p-3 sm:p-4 lg:p-6"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "rgba(255,0,0,0.07)",
                        color: "var(--text-main)"
                      }}
                    >
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-bold flex items-center" style={{ color: "var(--text-main)" }}>
                          <FaTint className="mr-2 text-red-600 text-sm sm:text-base" />
                          Found {searchResults.length} Blood Bank{searchResults.length !== 1 ? 's' : ''}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-muted)" }}>Click on any card to view location on map</p>
                      </div>
                      <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 lg:max-h-72 overflow-y-auto">
                        {searchResults.map((bank, index) => (
                          <div
                            key={index}
                            className="rounded-md sm:rounded-lg p-2 sm:p-3 border hover:border-red-300 hover:bg-red-50 transition-all duration-300 cursor-pointer"
                            style={{
                              background: "var(--bg-main)",
                              borderColor: "rgba(200,200,200,0.10)",
                              color: "var(--text-main)"
                            }}
                            onClick={() => {
                              setMapCenter([bank.lat, bank.lng]);
                              setMapZoom(15);
                            }}
                          >
                            <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                              <h4 className="text-sm sm:text-base font-semibold pr-2" style={{ color: "var(--text-main)" }}>{bank.name}</h4>
                              <FaTint className="text-red-600 text-base sm:text-lg flex-shrink-0" />
                            </div>
                            <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
                              <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="text-red-500 mt-0.5 sm:mt-1 flex-shrink-0 text-xs" />
                                <div>
                                  <p className="font-medium" style={{ color: "var(--text-main)" }}>{bank.city}, {bank.state}</p>
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
                            <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t" style={{ borderColor: "rgba(200,200,200,0.10)" }}>
                              <button className="text-red-600 hover:text-red-700 font-medium text-xs transition-colors duration-300">
                                View on Map →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-center py-8 sm:py-12 rounded-lg sm:rounded-xl shadow-lg border"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "rgba(255,0,0,0.07)",
                        color: "var(--text-main)"
                      }}
                    >
                      <FaSearch className="text-2xl sm:text-3xl text-gray-400 mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: "var(--text-main)" }}>No Blood Banks Found</h3>
                      <p className="mb-3 sm:mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
                        We could not find any blood banks matching
                      </p>
                      <p className="text-xs sm:text-sm px-4" style={{ color: "var(--text-muted)" }}>
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
            <div
              className="rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-5 border h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[440px]"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(255,0,0,0.07)",
                color: "var(--text-main)"
              }}
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center" style={{ color: "var(--text-main)" }}>
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
                          <p className="text-xs sm:text-sm" style={{ color: "var(--text-main)" }}>{bank.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-red-500 text-xs sm:text-sm" />
                          <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{bank.hours}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-red-500 text-xs sm:text-sm" />
                          <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{bank.contact}</p>
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
    </>
  );
};

export default BloodBankLocator;