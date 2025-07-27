import mongoose from "mongoose";

const projectMemberSchema = new mongoose.Schema({}, { timestamps: true });

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema,
);
