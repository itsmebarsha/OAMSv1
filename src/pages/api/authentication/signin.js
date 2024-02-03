/** @format */

// pages/api/authentication/signin.js

import jwt from "jsonwebtoken";

import { serialize } from "cookie";
import passport from "passport";
import {
  deserializeUser,
  localStrategy,
  serializeUser,
} from "@/utlis/passport/passport-config";
import { connectDB } from "@/utlis/database/Mongodb";
import withAuth from "@/utlis/passport/authMiddleware";

const { SECRET_KEY } = process.env;
connectDB();

// Initialize Passport and the local strategy
passport.use("local", localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

async function handler(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", async (err, user) => {
      if (err || !user) {
        console.log("Error");
        res.status(401).json({ message: "Invalid credentials" });
        return resolve();
      }

      const { schoolCode } = req.body; // Assuming schoolCode is part of your login form
      if (schoolCode !== user.schoolCode) {
        console.log("School code does not match");
        res.status(401).json({ message: "Invalid school code" });
        return resolve();
      }
      console.log("user is", user.role);
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      // Set the token as a session property using next-iron-session
      req.session.set("user", {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        schoolCode: user.schoolCode,
        // Add any other relevant user information to the session
      });

      await req.session.save();
      // Store the token in a cookie
      const cookieOptions = {
        // httpOnly: true, // The cookie cannot be accessed by JavaScript on the client-side
        secure: process.env.NODE_ENV === "production", // Use 'secure' only in production to send the cookie over HTTPS
        maxAge: 60 * 60 * 1000, // 1 hour (optional: specify the token's lifetime)
        path: "/", // Specify the path for which the cookie is valid (optional)
        sameSite: "lax", // Set 'sameSite' attribute to 'lax' (optional)
      };

      res.setHeader("Set-Cookie", serialize("token", token, cookieOptions));

      console.log("Success");
      // Return the JWT token in the response

      res.status(200).json({
        message: "Login successful",
        session: req.session.get("user"),
        role: user.role,
      });
      return resolve();
    })(req, res, resolve);
  });
}

export default withAuth(handler);
