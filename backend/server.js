import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config({quiet: true});
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB();
});
