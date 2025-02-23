import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Inventory = () => {
  const [bloodData, setBloodData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "hospital" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://raktconnect-backend.onrender.com/verify/hospital", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        setBloodData([
          { bloodType: "A+", units: data.user.bloodInventory.A_positive },
          { bloodType: "A-", units: data.user.bloodInventory.A_negative },
          { bloodType: "B+", units: data.user.bloodInventory.B_positive },
          { bloodType: "B-", units: data.user.bloodInventory.B_negative },
          { bloodType: "O+", units: data.user.bloodInventory.O_positive },
          { bloodType: "O-", units: data.user.bloodInventory.O_negative },
          { bloodType: "AB+", units: data.user.bloodInventory.AB_positive },
          { bloodType: "AB-", units: data.user.bloodInventory.AB_negative },
        ]);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    authenticateUser();
  }, [navigate]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Blood Unit Availability
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bloodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bloodType" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="units" fill="#E53E3E" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Inventory;
