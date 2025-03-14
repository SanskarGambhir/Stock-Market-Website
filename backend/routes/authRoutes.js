import { addUser } from "../controllers/authController.js";
import express from "express";
const router = express.Router();

// Define routes
router.post("/adduser", addUser);

export default router;
