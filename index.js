import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

const allowedOrigins = ["https://main.d2nb1gulmumrp7.amplifyapp.com", "https://coursebackproject.onrender.com"];

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use(
  "/login",
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
  })
);

app.listen(5000, () => console.log("Server running at port 5000"));
