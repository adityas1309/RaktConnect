import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("selectedUserType", role);
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-calm/10">
      <h2 className="text-2xl font-bold mb-4">Login as:</h2>
      <div className="flex gap-6">
        <button
          onClick={() => handleLogin("Patient")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg">
          Patient
        </button>
        <button
          onClick={() => handleLogin("Donor")}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg">
          Donor
        </button>
        <button
          onClick={() => handleLogin("Hospital")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg">
          Hospital
        </button>
      </div>
    </div>
  );
};

export default Auth;
