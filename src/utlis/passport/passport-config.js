/** @format */

// passport-config.js
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import newUser from "@/pages/api/schema/userSchema"; // Replace with the actual path to your user model
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
const { SECRET_KEY } = process.env;
// Local strategy for username/password authentication
export const localStrategy = new LocalStrategy(
  { usernameField: "email" }, // Adjust the field name for email as needed
  async (email, password, done) => {
    try {
      console.log("Received email:", email);

      const user = await newUser.findOne({ email });

      if (!user) {
        console.log("No user found for email:", email);
        return done(null, false, { message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Password not valid for email:", email);
        return done(null, false, { message: "Invalid credentials" });
      }

      console.log("User authenticated:", user);
      return done(null, user);
    } catch (error) {
      console.error("Error during authentication:", error);
      return done(error);
    }
  }
);

// Serialize the user ID to store in the session
export const serializeUser = (user, done) => {
  done(null, user.id);
};

// Deserialize the user object from the stored user ID in the session
export const deserializeUser = async (id, done) => {
  try {
    const user = await newUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY, // Replace with your actual secret key for JWT
};

// Implement the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    // Find the user based on the payload's user ID
    const user = await newUser.findById(jwtPayload.userId);

    // If the user exists, return the user object
    if (user) {
      return done(null, user);
    }

    // If the user does not exist, return false
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

// Export the local and JWT strategies
export { jwtStrategy };
