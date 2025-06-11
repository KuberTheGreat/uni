import express from "express";
import {createQuiz, getAllQuizzes, deleteQuiz} from "../controllers/quiz.controller.js";
import { authorizeRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(verifyJWT, authorizeRoles("FACULTY"), createQuiz);
router.route("/all").get(verifyJWT, authorizeRoles("FACULTY"), getAllQuizzes);
router.route("/delete/:id").delete(verifyJWT, authorizeRoles("FACULTY"), deleteQuiz);


export default router;
