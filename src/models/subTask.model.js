import mongoose from "mongoose";

import { availableTaskStatuses, taskStatusEnum } from "../constants/constants";

const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    status: {
      type: String,
      enum: availableTaskStatuses,
      default: taskStatusEnum.todo,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const SubTask = mongoose.model("SubTask", subTaskSchema);
