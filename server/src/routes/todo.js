import express from "express";
import authenticateToken from "../middleware/auth.js";
import { todoCreateValidator } from "../utils/validators.js";
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { body } from "express-validator";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getTodos);
router.post("/", todoCreateValidator, createTodo);
router.get("/:id", getTodoById);
router.put("/:id", [
  body("title").optional().isLength({ min: 1, max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("category").optional().isIn(["Urgent", "Non-Urgent"]),
], updateTodo);
router.delete("/:id", deleteTodo);

export default router;
