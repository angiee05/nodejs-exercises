import express from "express";
import "express-async-errors";

import { ValidationErrorMiddleware } from "./middleware/validation";
import { initCorsMiddleware } from "./middleware/validation/cors";
import citiesRoutes from "./routes/cities";

const app = express();

app.use(express.json());
app.use(initCorsMiddleware());
app.use("/cities", citiesRoutes);
app.use(ValidationErrorMiddleware);

export default app;
