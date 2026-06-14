import express from "express";
import passport from "passport";
import {
    googleAuthCallback,
    getProfile,
    googleAuthLogout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
    passport.authenticate("google",
        {
            failureRedirect: "http://localhost:5173/login",
        }
    ),
  googleAuthCallback
);

router.get('/profile', getProfile);

router.get("/logout", googleAuthLogout);

export default router;
