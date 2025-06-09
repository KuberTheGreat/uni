import mongoose, {Schema} from "mongoose"

const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    isCompleted: { type: Boolean, default: false },
    dueDate: Date
});

export const Task = mongoose.model('Task', taskSchema);
