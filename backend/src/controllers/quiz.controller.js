import Quiz from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    if(!(req.user?.role === "FACULTY")){
        throw new ApiError(403, "Access Denied")
    }
    quiz.createdBy = req.user?.username;
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "name email");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {createQuiz, getAllQuizzes}