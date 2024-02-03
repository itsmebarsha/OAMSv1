/** @format */

// utils/session.js

import { withIronSession } from "next-iron-session";
const { SECRET_KEY } = process.env;
export default function withAuth(handler) {
  return withIronSession(handler, {
    password: SECRET_KEY, // Replace with a secure secret key
    cookieName: "inpro",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    // Optionally, configure session expiration, etc.
  });
}
export function isAuthenticated(req) {
  return !!req.session.get("user");
}
