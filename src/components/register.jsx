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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update Firebase User Profile
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      const userdata = {
        uid: userCredential.user.uid,
        displayName: name,
        email: userCredential.user.email,
        phoneNumber: mobile,
      };

      // Update state
      setloginUser(userdata);

      // Save user to Firestore
      await saveUserToFirestore(userdata);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mb-4"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Register"}
        </button>

        <hr className="my-4 border-gray-300" />

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign up with Google"}
        </button>
      </div>
    </div>
  );
}
