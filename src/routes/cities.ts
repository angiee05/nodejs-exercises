import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";

import {
  validate,
  ValidationErrorMiddleware,
  citySchema,
  CityData,
} from "../middleware/validation";
import { request } from "http";

const prisma = new PrismaClient();

import { initMulterMiddleware } from "../middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/cities", async (request, response) => {
  const cities = await prisma.city.findMany();
  response.json(cities);
});

router.get("/:id(\\d+)", async (req, res, next) => {
  try {
    const cityId: number = Number(req.params.id);

    const city = await prisma.city.findUnique({ where: { id: cityId } });

    if (!city) {
      res.status(404);
      return next(`Can NOT Get City With ID: ${cityId}`);
    }

    res.json(city);
  } catch (error) {
    res.status(400).json(error);
    return next(error);
  }
});

router.post(
  "/cities",
  validate({ body: citySchema }),
  async (req, res, next) => {
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
  }
);

router.patch(
  "/:id(\\d+)",
  validate({ body: citySchema }),
  async (req, res, next) => {
    try {
      const CityData: CityData = req.body;
      const { id } = req.params;
      const city = await prisma.city.update({
        where: { id: Number(id) },
        data: CityData,
      });

      res.status(201).json(`Correctly Updated City With ID: ${city.id}`);
    } catch (error) {
      res.status(400).json(error);
      return next(error);
    }
  }
);

router.delete("/:id(\\d)", async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = await prisma.city.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(`Correctly deleted city ID: ${city.id}`);
  } catch (error) {
    res.status(400).json(error);
    return next(error);
  }
});

router.post(
  "/cities/:id(\\d+)/photo",
  upload.single("photo"),
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No photo uploaded");
    }

    const photoFilename = request.file.filename;

    response.status(201).json({ photoFilename });
  }
);

export default router;
