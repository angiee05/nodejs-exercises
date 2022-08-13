import express from "express";
import "express-async-errors";

import { ValidationErrorMiddleware } from "./middleware/validation";
import { initCorsMiddleware } from "./middleware/validation/cors";
import { initSessionMiddleware } from "./middleware/session";
import { passport } from "./middleware/passport";

import citiesRoutes from "./routes/cities";

import authRoutes from "./routes/auth";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(initCorsMiddleware());
app.use("/auth", authRoutes);
app.use("/cities", citiesRoutes);
app.use(ValidationErrorMiddleware);

export default app;
