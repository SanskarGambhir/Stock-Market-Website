import express from "express";
import { sayHello } from "../controllers/helloController.js";

const router = express.Router();

// Define routes
router.get("/hello", sayHello);

export default router;
