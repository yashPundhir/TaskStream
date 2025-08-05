import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({}, { timestamps: true });

export const SubTask = mongoose.model("SubTask", subTaskSchema);
