import React from "react";
import { motion } from "framer-motion";

const colorThemes = {
  blue: {
    focus: "focus:ring-blue-400",
    button: "from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600",
    text: "text-blue-700",
  },
  green: {
    focus: "focus:ring-green-400",
    button: "from-green-600 to-teal-400 hover:from-green-700 hover:to-teal-500",
    text: "text-green-700",
  },
  purple: {
    focus: "focus:ring-purple-400",
    button: "from-purple-600 to-indigo-400 hover:from-purple-700 hover:to-indigo-500",
    text: "text-purple-700",
  },
};

const LoginForm = ({
  title,
  color = "blue",
  submit,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSignUpClick,
  fullPage,
  isSignup = false,
  children,
}) => {
  const theme = colorThemes[color] || colorThemes.blue;
  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-rose-400 to-pink-300">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onSubmit={submit}
        className={`w-full max-w-lg flex flex-col gap-6 px-6 py-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl`}
        style={{ boxShadow: "0 8px 32px 0 rgba(255, 0, 0, 0.10)" }}
      >
        <div className="text-left mb-2">
          <h2 className={`text-4xl font-extrabold mb-1 tracking-tight ${theme.text}`}>
            {title}
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            {isSignup ? "Create your account to get started." : "Welcome back! Please sign in to your account."}
          </p>
        </div>

        {isSignup ? (
          children
        ) : (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-3 pl-11 border border-gray-200 rounded-xl focus:outline-none bg-gray-50 focus:bg-white transition-all duration-300 text-black ${theme.focus}`}
                  autoComplete="username"
                />
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text}`}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 5.12A2.25 2.25 0 0 1 4.75 4.5h10.5c.6 0 1.17.24 1.6.67.43.43.67 1 .67 1.6v6.46a2.25 2.25 0 0 1-.67 1.6c-.43.43-1 .67-1.6.67H4.75a2.25 2.25 0 0 1-1.6-.67A2.25 2.25 0 0 1 2.5 13.23V6.77c0-.6.24-1.17.67-1.6zm1.81-.62a.75.75 0 0 0-.75.75v.13l6 3.75 6-3.75v-.13a.75.75 0 0 0-.75-.75H4.75zm11.5 2.13-5.47 3.42a.75.75 0 0 1-.78 0L4.53 6.63V13.2c0 .41.34.75.75.75h10.5a.75.75 0 0 0 .75-.75V6.63z" /></svg>
                </span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full p-3 pl-11 border border-gray-200 rounded-xl focus:outline-none bg-gray-50 focus:bg-white transition-all duration-300 text-black ${theme.focus}`}
                  autoComplete="current-password"
                />
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text}`}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.5c-4.5 0-8 4.5-8 6.5s3.5 6.5 8 6.5 8-4.5 8-6.5-3.5-6.5-8-6.5zm0 11c-3.5 0-6.5-3.5-6.5-4.5S6.5 5.5 10 5.5s6.5 3.5 6.5 4.5-3 4.5-6.5 4.5zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /></svg>
                </span>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  <img
                    src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                    alt="Toggle Password"
                    className="w-6 h-6 opacity-70 cursor-pointer"
                  />
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className={`${theme.text} hover:underline text-sm font-medium`}>Forgot password?</a>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className={`w-full bg-gradient-to-r ${theme.button} text-white font-semibold py-3 rounded-xl transition-all text-lg tracking-wide shadow-md`}
        >
          {isSignup ? "Register" : "Login"}
        </button>

        {!isSignup && (
          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500 italic font-medium">Don't have an account?</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        )}

        {!isSignup && (
          <button
            type="button"
            onClick={onSignUpClick}
            className={`w-full bg-gradient-to-r ${theme.button} text-white font-semibold py-3 rounded-xl transition-all text-lg tracking-wide shadow-md mt-2`}
          >
            Sign Up
          </button>
        )}
      </motion.form>
    </div>
  );
};

export default LoginForm;