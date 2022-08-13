"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const validation_1 = require("../middleware/validation");
const passport_1 = require("../middleware/passport");
const prisma = new client_1.PrismaClient();
const multer_1 = require("../middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    const cities = await prisma.cities.findMany();
    response.json(cities);
});
router.get("/:id(\\d+)", async (req, res, next) => {
    try {
        const cityId = Number(req.params.id);
        const city = await prisma.cities.findUnique({ where: { id: cityId } });
        if (!city) {
            res.status(404);
            return next(`Can NOT Get City With ID: ${cityId}`);
        }
        res.json(city);
    }
    catch (error) {
        res.status(400).json(error);
        return next(error);
    }
});
router.post("/", passport_1.checkAuthotization, (0, validation_1.validate)({ body: validation_1.citySchema }), async (req, res, next) => {
    try {
        const CityData = req.body;
        const username = req.user?.username;
        const city = await prisma.cities.create({
            data: { ...CityData, createdBy: username, updatedBy: username },
        });
        res.status(201).json(`Correctly added city with ID: ${city.id}`);
    }
    catch (error) {
        res.status(400).json(error);
        return next(error);
    }
});
router.patch("/:id(\\d+)", passport_1.checkAuthotization, (0, validation_1.validate)({ body: validation_1.citySchema }), async (req, res, next) => {
    try {
        const CityData = req.body;
        const username = req.user?.username;
        const { id } = req.params;
        const city = await prisma.cities.update({
            where: { id: Number(id) },
            data: { ...CityData, updatedBy: username },
        });
        res.status(201).json(`Correctly Updated City With ID: ${city.id}`);
    }
    catch (error) {
        res.status(400).json(error);
        return next(error);
    }
});
router.delete("/:id(\\d)", passport_1.checkAuthotization, async (req, res, next) => {
    try {
        const { id } = req.params;
        const city = await prisma.cities.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(`Correctly deleted city ID: ${city.id}`);
    }
    catch (error) {
        res.status(400).json(error);
        return next(error);
    }
});
router.post("/:id(\\d+)/photo", passport_1.checkAuthotization, upload.single("photo"), async (request, response, next) => {
    console.log("request.file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No photo uploaded");
    }
    const photoFilename = request.file.filename;
    response.status(201).json({ photoFilename });
});
exports.default = router;
//# sourceMappingURL=cities.js.map