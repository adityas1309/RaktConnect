import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const DonorNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNotifications([]); 
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-8">
          <div className="w-full mx-auto bg-white p-8 shadow-lg rounded-lg animate-pulse space-y-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-8">
        <div className="w-full mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 border-b-2 pb-4 mb-6">
            Notifications
          </h3>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center text-gray-600">
              <FaBell className="text-6xl text-gray-400" />
              <p className="text-lg">No new notifications yet</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm text-gray-700"
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorNotification;
