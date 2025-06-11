import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Quiz', 'Midterm', 'Final Exam', 'Other'],
    default: 'Quiz'
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Store time as 'HH:MM AM/PM' or 24hr format
    required: true
  },
  location: {
    type: String,
    default: 'TBD'
  },
  syllabus: {
    type: String,
    default: ''
  },
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", 
  required: true
}

}, {
  timestamps: true
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
