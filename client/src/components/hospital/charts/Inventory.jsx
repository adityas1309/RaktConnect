import React from 'react';
import { bloodData } from '../../../utils/constants';
import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const Inventory = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Blood Unit Availability</h3>
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
  )
}

export default Inventory