import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, inngestFunctions } from "./utils/inngest.js";
dotenv.config({quiet: true});
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true
}));

// Routes
app.use('/inngest', serve({client: inngest, functions: []}))

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB();
});
