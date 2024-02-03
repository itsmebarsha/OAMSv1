/** @format */

// utils/generateId.js

export const generateId = () => {
  const prefix = "SAOS";
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}${randomString}`;
};
