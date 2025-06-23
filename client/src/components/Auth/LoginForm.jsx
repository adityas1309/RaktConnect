import React from "react";


const LoginForm = ({ title, color, submit, email, setEmail, password, setPassword ,showPassword ,setShowPassword }) => {
  

  

  return (
    <>
    <PageMeta title="Login | RaktConnect" />

    <div className="flex justify-center items-center bg-calm/5 h-full">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-[400px]"
      >
        <h2 className={`text-2xl font-bold text-center text-${color}-600 mb-6`}>
          {title}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${color}-400`}
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${color}-400`}
          />
          <button
            type="button"
            className="absolute right-4 top-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
              alt="Toggle Password"
              className="w-6 h-6 invert-50 cursor-pointer"
            />
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white font-semibold py-3 rounded-lg cursor-pointer`}
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default LoginForm;