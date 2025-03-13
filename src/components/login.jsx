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
import { Button } from "@/components/ui/button";

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg rounded-xl p-10 w-full max-w-md transform transition duration-300 hover:scale-102">
        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              Welcome, {loginUser?.displayName || "User"}!
            </h2>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-700 transition-transform duration-300 hover:scale-110"
              />
            )}
            <Button
              onClick={handleLogout}
              className="w-full bg-gray-600 text-gray-100 py-2 rounded-md hover:bg-gray-700 transition ease-in-out duration-300"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">Login</h2>
            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
            />
            <Button
              onClick={handleEmailLogin}
              className="w-full bg-blue-600 text-gray-100 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 mb-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Email"}
            </Button>
            <Button
              onClick={handleSignup}
              className="w-full bg-green-600 text-gray-100 py-2 rounded-lg hover:bg-green-700 transition ease-in-out duration-300 mb-4"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-700" />
              <span className="mx-2 text-gray-200">or</span>
              <hr className="flex-grow border-gray-700" />
            </div>
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-gray-100 py-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
