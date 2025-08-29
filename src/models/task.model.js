import mongoose from "mongoose";

import { availableTaskStatuses, taskStatusEnum } from "../constants/constants";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: availableTaskStatuses,
      default: taskStatusEnum.todo,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          size: Number,
          fileName: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);

// Tasks Hooks
