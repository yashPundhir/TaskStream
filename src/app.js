import express from "express";

// router imports
import healthCheckRouter from "./routes/healthCheck.routes.js";

const app = express();

app.use("/api/v1/healthCheck", healthCheckRouter);

export default app;
