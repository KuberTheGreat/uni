import express from "express";
const router = express.Router();
import { createTask, getTasksByStudent, deleteTask, updateTask } from "../controllers/task.controller.js";

router.post('/create', createTask);
router.get('/student/:studentId', getTasksByStudent);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
