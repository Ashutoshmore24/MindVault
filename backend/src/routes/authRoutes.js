import express from "express";
import passport from "passport";
import { googleAuthCallback , getProfile , googleAuthLogout} from '../controllers/auth.controller.js';

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: 'select_account'})
);

router.get(
  "/google/callback",
  (req, res, next) => {
    const failureRedirect = process.env.CLIENT_URL 
      ? `${process.env.CLIENT_URL.replace(/\/$/, '')}/login` 
      : '/login';
    passport.authenticate("google", { failureRedirect })(req, res, next);
  },
  googleAuthCallback
);

router.get('/profile', getProfile);

router.get("/logout", googleAuthLogout);

export default router;
