import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

import {
  validate,
  ValidationErrorMiddleware,
  citySchema,
  CityData,
} from "./validation";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/cities", async (request, response) => {
  const cities = await prisma.city.findMany();
  response.json(cities);
});

app.post("/cities", validate({ body: citySchema }), async (req, res, next) => {
  try {
    const CityData: CityData = req.body;
    const city = await prisma.city.create({
      data: CityData,
    });

    res.status(201).json(`Correctly added city with ID: ${city.id}`);
  } catch (error) {
    res.status(400).json(error);
    return next(error);
  }
});

app.use(ValidationErrorMiddleware);

export default app;
