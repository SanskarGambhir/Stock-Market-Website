import React, { useContext, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";
import { AppContext } from "../context/appContext";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginUser, setloginUser } = useContext(AppContext);

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setloginUser(result.user);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Email & Password Login
  const handleEmailLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setloginUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Sign Up
  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setloginUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setloginUser(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  console.log(loginUser);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              {/* Welcome, {loginUser.displayName || "User"}! */}
            </h2>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
            )}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleEmailLogin}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Email"}
            </button>
            <button
              onClick={handleSignup}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mb-4"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <hr className="my-4 border-gray-300" />
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
