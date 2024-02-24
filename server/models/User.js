import mongoose from "mongoose"
import { Schema } from "mongoose"

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
} , { timestamps: true} )

export const User = mongoose.model("User", UserSchema);