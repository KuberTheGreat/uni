import express from "express";
import {createQuiz, getAllQuizzes} from "../controllers/quiz.controller.js";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(verifyJWT, createQuiz, authorizeRoles("FACULTY"));
router.route("/all").get(verifyJWT, getAllQuizzes, authorizeRoles("FACULTY"));

export default router;
