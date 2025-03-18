import React from "react";

const LoginForm = ({ title, color, submit, email, setEmail, password, setPassword, showPassword, setShowPassword, isLoading }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className={`text-2xl font-bold text-center text-${color}-600 mb-8`}>
          {title}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${color}-400 transition-all duration-300`}
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${color}-400 transition-all duration-300`}
            />
            <button
              type="button"
              disabled={isLoading}
              className="absolute right-3 top-[38px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                alt="Toggle Password"
                className="w-6 h-6 opacity-50 hover:opacity-75 transition-opacity"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-8 bg-gradient-to-r from-${color}-500 to-${color}-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;