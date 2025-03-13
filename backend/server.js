/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());

// Import routes
app.use("/api", apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
