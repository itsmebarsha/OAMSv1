/** @format */

// pages/api/some-protected-api.js

import { jwtStrategy } from "@/utlis/passport/passport-config";
import passport from "passport";
import withAuth from "@/utlis/passport/authMiddleware";
import { isAuthenticated } from "@/utlis/passport/authMiddleware";

passport.use(jwtStrategy); // Use the imported jwtStrategy

const handler = (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // // If the user is authenticated via JWT, check if the session also exists
    // const authenticated = isAuthenticated(req);

    // if (!authenticated) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // If the user is authenticated and the session exists, proceed with the protected API logic
    // For example, fetch user-specific data from the database
    // const userId = req.session.get("user"); // Assuming you store user ID in the session
    // ... Fetch user data or perform other actions ...
    return res.status(200).json(user);
  })(req, res);
};

export default withAuth(handler);
