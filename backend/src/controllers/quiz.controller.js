import Quiz from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    if(!(req.user?.role === "FACULTY")){
        throw new ApiError(403, "Access Denied")
    }
    quiz.createdBy = req.user?._id;
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Quiz creation failed:", error);
  res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: error.errors || error.message
  })
}
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "fullName email");
    return res.status(200).json({
      status: 200,
      data: quizzes,
      message: "Quizzes fetched successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch quizzes"
    });
  }
};


const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found");
    }
    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not authorized to delete this quiz");
    }
    await quiz.deleteOne();
    
    return res.status(200).json({
      status: 200,
      message: "Quiz deleted successfully",
      data: {}
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || "Something went wrong"
    });
  }
};



export {createQuiz, getAllQuizzes,deleteQuiz}