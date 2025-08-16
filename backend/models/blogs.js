import mongoose from "mongoose";
import { Users } from "./users.js";
const blogsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

export const Blogs = mongoose.model("Blogs", blogsSchema);