import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.get("/cities", async (request, response) => {
  const cities = await prisma.city.findMany();

  response.json(cities);
});

export default app;
