import express from "express";
import { getUsers, register, login, logout, updateStatusAndRole, deleteUser } from "../controllers/Users.js";
import { getCollections, createCollection, updateCollection, deleteCollection } from "../controllers/Collections.js";
import { getCollectionItems } from "../controllers/Items.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.put("/users/:id/updateStatusAndRole", updateStatusAndRole);
router.delete("/users/:id/delete", deleteUser);

router.get("/collections", getCollections);
router.post("/createCollection", createCollection);
router.put("/collections/:id/updateCollection", updateCollection);
router.delete("/collections/:id/deleteCollection", deleteCollection);

router.get("/collections/:id/items", getCollectionItems);

export default router;
