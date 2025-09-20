import { ApiResponse } from "../utils/apiResponse.js";

export const healthCheck = (req, res) => {
  const response = new ApiResponse(200, "System is up and running.");

  res.status(200).json(response);
};
