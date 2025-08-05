export const userRolesEnum = {
  admin: "Admin",
  projectAdmin: "Project Admin",
  member: "Member",
};

export const availableUserRoles = Object.values(userRolesEnum);

export const taskStatusEnum = {
  todo: "Todo",
  inProgress: "In Progress",
  inReview: "In Review",
  done: "Done",
};

export const availableTaskStatuses = Object.values(taskStatusEnum);
