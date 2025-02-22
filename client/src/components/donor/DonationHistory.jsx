import React from "react";

const donationData = [
  { date: "Jan 10, 2025", location: "City Hospital", bloodType: "O+" },
  { date: "Oct 15, 2024", location: "Health Center", bloodType: "O+" },
  { date: "Jul 05, 2024", location: "Blood Bank", bloodType: "O+" }
];

const DonationHistory = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Donation History</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3">Date</th>
            <th className="p-3">Location</th>
            <th className="p-3">Blood Type</th>
          </tr>
        </thead>
        <tbody>
          {donationData.map((donation, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-3">{donation.date}</td>
              <td className="p-3">{donation.location}</td>
              <td className="p-3 font-bold">{donation.bloodType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;
