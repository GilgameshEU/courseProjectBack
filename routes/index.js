import express from "express";
import { getUsers, Register, Login, Logout, updateStatusAndRole, DeleteUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/users/:id/updateStatusAndRole", updateStatusAndRole);
router.delete("/users/:id/delete", DeleteUser);

export default router;
