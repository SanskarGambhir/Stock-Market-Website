import React, { useState, useContext } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase";
import { AppContext } from "../context/appContext";
import { saveUserToFirestore } from "../firebase/functions"; // Ensure this function is properly defined

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setloginUser } = useContext(AppContext);

  // Google Sign-Up
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      setloginUser(result.user);
      await saveUserToFirestore({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        mobile: result.user.phoneNumber || "",
      });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // Email & Password Sign-Up
  const handleSignup = async () => {
    setLoading(true);
    setError("");

    if (!name || !mobile || !email || !password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update Firebase User Profile
      await updateProfile(userCredential.user, { displayName: name });
      const userdata = {
        uid: userCredential.user.uid,
        displayName: name,
        email: userCredential.user.email,
        phoneNumber: mobile,
      };
      setloginUser(userdata);
      await saveUserToFirestore(userdata);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg rounded-xl p-10 w-full max-w-md transform transition duration-200 hover:scale-102">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
          Register
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
        />

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

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mb-4"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Register"}
        </button>

        <hr className="my-4 border-white/50" />

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign up with Google"}
        </button>
      </div>
    </div>
  );
}
