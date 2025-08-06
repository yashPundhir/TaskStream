import mongoose from "mongoose";

import { availableUserRoles, userRolesEnum } from "../constants/constants";

const projectMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: availableUserRoles,
      default: userRolesEnum.member,
    },
  },
  { timestamps: true },
);

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema,
);
