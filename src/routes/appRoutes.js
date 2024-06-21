import requireAuth from "./src/middlewares/authToken";
import express from "express";
import {
	home,
	login,
	register,
	register_post,
	login_post,
} from "../controllers/appController";

const router = express.Router();

router.get("/", requireAuth, home);
router.get("/login", login);
router.post("register", register_post);
router.get("register", register);
router.post("/login", login_post);
