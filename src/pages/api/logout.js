// api/logout.js
import { destroyCookie } from "cookies";

export default async function handler(req, res) {
  try {
    // Clear the authentication-related cookies
    destroyCookie({ res }, "token");
    destroyCookie({ res }, "inpro");

    // Redirect the user to the login page
    res.writeHead(302, { Location: "/auth/signin" });
    res.end();
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "An error occurred while logging out." });
  }
}
