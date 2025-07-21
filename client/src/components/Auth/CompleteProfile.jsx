import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUser,
  FaPhoneAlt,
  FaStethoscope,
  FaHospitalAlt,
  FaIdBadge,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CompleteProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    medicalCondition: "",
    licenseNumber: "",
    state: "",
    district: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted Data:", { role, ...formData });
  };

  const renderDonorFields = () => (
    <>
      <Input label="Name" name="name" icon={FaUser} required />
      <Input label="Age" name="age" type="number" required />
      <Input label="Contact Number" name="contact" icon={FaPhoneAlt} required />
    </>
  );

  const renderPatientFields = () => (
    <>
      <Input label="Name" name="name" icon={FaUser} required />
      <Input label="Age" name="age" type="number" required />
      <Input label="Contact Number" name="contact" icon={FaPhoneAlt} required />
      <Input
        label="Medical Condition (Optional)"
        name="medicalCondition"
        icon={FaStethoscope}
      />
    </>
  );

  const renderHospitalFields = () => (
    <>
      <Input label="Hospital Name" name="name" icon={FaHospitalAlt} required />
      <Input
        label="License Number"
        name="licenseNumber"
        icon={FaIdBadge}
        required
      />
      <Input label="Contact" name="contact" icon={FaPhoneAlt} required />
      <Input label="State" name="state" icon={FaMapMarkerAlt} required />
      <Input label="District" name="district" icon={FaMapMarkerAlt} required />
    </>
  );

  const Input = ({ label, name, type = "text", icon: Icon, required }) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Complete {role?.charAt(0).toUpperCase() + role?.slice(1)} Profile
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {role === "donor" && renderDonorFields()}
        {role === "patient" && renderPatientFields()}
        {role === "hospital" && renderHospitalFields()}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
      {submitted && (
        <div className="mt-4 text-green-600 text-center font-medium">
          ✅ Profile submitted successfully!
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
