import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("username").isLength({ min: 3 }).withMessage("Username too short"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("password").exists().withMessage("Password required"),
  body("identifier").exists().withMessage("Email or username required"),
];

export const todoCreateValidator = [
  body("title").isLength({ min: 1, max: 100 }).withMessage("Title required (max 100)"),
  body("description").optional().isLength({ max: 500 }).withMessage("Description too long"),
  body("category").optional().isIn(["Urgent", "Non-Urgent"]),
];
