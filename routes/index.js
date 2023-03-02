import express from "express";
import { getUsers, register, login, logout, updateStatusAndRole, deleteUser } from "../controllers/Users.js";
import { getCollections, createCollection, updateCollection, deleteCollection } from "../controllers/Collections.js";
import { getItems, getAllItems, getItem, createComment, updateItem, deleteItem, createItem } from "../controllers/Items.js";
import { getThemes } from "../controllers/Themes.js";
import { createLike, getLike, deleteLike } from "../controllers/Likes.js";

//import { getComments } from "../controllers/Comments";
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

router.get("/collections/:id/items", getItems);
router.post("/createItem", createItem);
router.get("/collections/items", getAllItems);
router.get("/itemPage/:id/", getItem);
router.put("/itemPage/:id/", updateItem);
router.delete("/itemPage/:id/", deleteItem);

router.post("/itemPage/:id/comment", createComment);

router.post("/itemPage/:id/likes", createLike);
router.get("/itemPage/:id/likes/:userId", getLike);
router.delete("/itemPage/:id/likes/:userId", deleteLike);

router.get("/themes", getThemes);

export default router;
