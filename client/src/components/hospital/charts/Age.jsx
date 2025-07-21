import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import PageMeta from "../../common/PageMeta";
const donorAgeData = [
  { ageGroup: "18-25", donors: 150 },
  { ageGroup: "26-35", donors: 200 },
  { ageGroup: "36-45", donors: 180 },
  { ageGroup: "46-55", donors: 100 },
  { ageGroup: "56+", donors: 50 }
];

const Age = () => {
  return (
    <>
     <PageMeta title="Age | RaktConnect" />
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Donor Age Group Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={donorAgeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="donors" fill="#4F46E5" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  );
};

export default Age;
