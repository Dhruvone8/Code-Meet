import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { connectDB } from "./config/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, inngestFunctions } from "./utils/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoute from "./routes/chatRoute.js";
import sessionRoute from "./routes/sessionRoute.js";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true
}));
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Sever is Up and Running" });
});
app.use('/inngest', serve({ client: inngest, inngestFunctions }))
app.use("/chat", chatRoute)
app.use('/sessions', sessionRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB();
});
