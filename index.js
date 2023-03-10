import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: ["https://main.d2nb1gulmumrp7.amplifyapp.com", "http://localhost:3000", "https://mybucketforcourseproject.s3.eu-central-1.amazonaws.com/"], methods: ["GET", "POST", "DELETE", "PUT"] }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server running at port 5000"));
