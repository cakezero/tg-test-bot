import express from "express";
import {
	home,
	twitterOauth,
	logout,
} from "../controllers/twitterController.js";

const router = express.Router();

router.get("/", home);
router.get("/auth/twitter", twitterOauth);
router.get("/logout", logout);

export default router;
