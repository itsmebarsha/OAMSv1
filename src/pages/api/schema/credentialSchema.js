/** @format */

import mongoose from "mongoose";
const credentialSchema = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  userName: {
    type: String,
  },

  userEmail: {
    type: String,
  },

  userPassword: {
    type: String,
  },
  userRole: {
    type: String,
  },
});

const Credential =
  mongoose.models.Credential || mongoose.model("Credential", credentialSchema);

module.exports = Credential;
