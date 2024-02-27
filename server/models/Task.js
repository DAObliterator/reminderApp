import mongoose from "mongoose";
import { Schema } from "mongoose";


const TaskSchema = Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    taskname: {
        type: String
    },
    times: [{
        type: String
    }],
    days: [{
        type: String
    }]

})

export const Task = mongoose.model("Task" , TaskSchema);