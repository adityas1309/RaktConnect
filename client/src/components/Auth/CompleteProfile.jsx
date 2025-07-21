"use client";

import { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint,
  FaVenusMars,
} from "react-icons/fa";

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    bloodType: "",
    location: "",
    phoneNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted data:", formData);
    // Reset form if needed: setFormData({ name: "", ... })
  };

  const Input = ({
    id,
    name,
    type = "text",
    placeholder,
    icon: Icon,
    required = false,
  }) => (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
      <input
        id={id}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />
    </div>
  );

  const Select = ({
    id,
    name,
    options,
    icon: Icon,
    required = false,
    defaultOption,
  }) => (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
      <select
        id={id}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="w-full appearance-none pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition">
        <option value="">{defaultOption}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-700">
        Complete Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1 block">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            icon={FaUser}
            required
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="text-sm font-medium text-gray-700 mb-1 block">
            Gender
          </label>
          <Select
            id="gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            icon={FaVenusMars}
            required
            defaultOption="Select your gender"
          />
        </div>

        <div>
          <label
            htmlFor="bloodType"
            className="text-sm font-medium text-gray-700 mb-1 block">
            Blood Type
          </label>
          <Select
            id="bloodType"
            name="bloodType"
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            icon={FaTint}
            required
            defaultOption="Select your blood type"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-700 mb-1 block">
            Location
          </label>
          <Input
            id="location"
            name="location"
            placeholder="Enter your city"
            icon={FaMapMarkerAlt}
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-gray-700 mb-1 block">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            icon={FaPhoneAlt}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02]">
          Submit
        </button>
      </form>

      {submitted && (
        <div className="text-green-600 text-center font-medium">
          ✅ Profile submitted successfully!
        </div>
      )}
    </div>
  );
}
