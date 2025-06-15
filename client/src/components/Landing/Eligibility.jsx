import React, { useState } from 'react'
import { format, differenceInMonths } from "date-fns";
import bloodDonationImg from '/public/bloodDonation.png'

const Eligibility = () => {

    const[formData, setFormData]= useState({
        age:"", weight: "", lastDonation: "", chronicDisease: "No", diseaseName: "", recentProcedure: "No", feelingHealthy: "Yes",
    });

    const [eligibility, setEligibility] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const checkEligibility = () => {
      if (!formData.age || !formData.weight || !formData.lastDonation) {
        setEligibility("Please fill out all required fields.");
        return;
      }

      const age = Number(formData.age);
      const weight = Number(formData.weight);
      const lastDonationDate = new Date(formData.lastDonation);
      const monthsSinceLastDonation = differenceInMonths(new Date(), lastDonationDate);


      if (age < 18 || age > 65) {
        setEligibility("Not eligible: Age must be between 18 and 65.");
      } else if (weight < 50) {
        setEligibility("Not eligible: Minimum weight should be more than 50 kg.");
      } else if (formData.chronicDisease === "Yes" && !formData.diseaseName.trim()) {
        setEligibility("Not eligible: Please specify your chronic disease.");
      } else if (formData.chronicDisease === "Yes") {
        setEligibility("Not eligible: You have a chronic disease.");
      } else if (formData.recentProcedure === "Yes") {
        setEligibility("Not eligible: Wait 6 months after tattoo/piercing/surgery.");
      } else if (formData.feelingHealthy === "No") {
        setEligibility("Not eligible: You must be in good health to donate.");
      } else if (monthsSinceLastDonation < 3) {
        setEligibility("Not eligible: You must wait at least 3 months between donations.");
      } else {
        setEligibility("Eligible: You meet the requirements to donate blood.");
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-20">
        <h1 className="text-6xl font-extrabold text-center text-red-600 mb-3 p-6">Blood Donation Eligibility Test</h1>
        <p className="text-center max-w-3xl mx-auto text-m font-medium mb-10 text-gray-700 pb-5">
          Donating blood is a simple, safe, and life-saving act, but not everyone is eligible at all times. 
          To ensure both your safety and the safety of the patient receiving your blood, take our Donor Eligibility Test for a quick self-assessment.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
          <div className="w-full md:w-1/2">
            <div className="p-6 space-y-4 shadow-xl bg-red-100 rounded-lg">
              <div className="space-y-1">
                <label className="block font-medium">Age</label>
                <input className="w-full border p-2 rounded bg-red-50" type="number" name="age" value={formData.age} onChange={handleChange}/>
              </div>
              <div className="space-y-1">
                <label className="block font-medium">Weight (kg)</label>
                <input className="w-full border p-2 rounded bg-red-50" type="number" name="weight" value={formData.weight} onChange={handleChange}/>
              </div>
              <div className="space-y-1">
                <label className="block font-medium">Last Donation Date</label>
                <input className="w-full border p-2 rounded bg-red-50" type="date" name="lastDonation" value={formData.lastDonation} onChange={handleChange}/>
              </div>
              <div className="space-y-1">
                <label className="block font-medium">Do you have any chronic diseases?</label>
                <select name="chronicDisease" value={formData.chronicDisease} onChange={handleChange} className="w-full border p-2 rounded bg-red-50">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              {formData.chronicDisease === "Yes" && (
                <div className="space-y-1">
                  <label className="block font-medium">If Yes, please specify</label>
                  <input className="w-full border p-2 rounded bg-red-50" name="diseaseName" value={formData.diseaseName} onChange={handleChange}/>
                </div>
              )}
              <div className="space-y-1">
                <label className="block font-medium">Have you had a tattoo, piercing, or surgery in the last 6 months?</label>
                <select name="recentProcedure" value={formData.recentProcedure} onChange={handleChange} className="w-full border p-2 rounded bg-red-50">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-medium">Are you currently feeling healthy?</label>
                <select name="feelingHealthy" value={formData.feelingHealthy} onChange={handleChange} className="w-full border p-2 rounded bg-red-50">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition" onClick={checkEligibility}>Check Eligibility</button>
              {eligibility && (
                <div className="mt-4 p-4 bg-red-50 rounded text-center font-medium">
                  {eligibility}
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src={bloodDonationImg} alt="Donate Blood" className="pt-15 w-full max-w-md object-contain"/>
          </div>
        </div>
      </div>
    )
}

export default Eligibility
