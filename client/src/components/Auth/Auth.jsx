import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";

const Auth = () => {
  const { redirectToSignUp } = useClerk();

  const handleLogin = (role) => {
    const lowercaseRole = role.toLowerCase();
    localStorage.setItem("selectedUserType", lowercaseRole);

    redirectToSignUp({
      redirectUrl: `/complete-profile?role=${lowercaseRole}`,
    });
  };

  useEffect(() => {
    document.title = "Login / Sign Up - RaktConnect";
  }, []);

  const roles = [
    { label: "🧍 Patient", value: "patient", color: "blue" },
    { label: "🩸 Donor", value: "donor", color: "green" },
    { label: "🏥 Hospital", value: "hospital", color: "purple" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-50 to-blue-50 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to RaktConnect
        </h2>
        <p className="text-lg text-gray-600">
          Please select your role to continue
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 w-full max-w-4xl">
        {roles.map((role) => (
          <div
            key={role.value}
            className={`cursor-pointer rounded-xl p-6 shadow-lg border border-gray-200 bg-white hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:border-${role.color}-500`}
            onClick={() => handleLogin(role.value)}>
            <div
              className={`text-5xl mb-4 text-${role.color}-600 flex justify-center`}>
              {role.label.split(" ")[0]}
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-800">
              {role.label.split(" ")[1]}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auth;
