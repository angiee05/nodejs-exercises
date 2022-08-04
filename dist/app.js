"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = require("@prisma/client");
const validation_1 = require("./validation");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/cities", async (request, response) => {
    const cities = await prisma.city.findMany();
    response.json(cities);
});
app.post("/cities", (0, validation_1.validate)({ body: validation_1.citySchema }), async (req, res, next) => {
    try {
        const CityData = req.body;
        const city = await prisma.city.create({
            data: CityData,
        });
        res.status(201).json(`Correctly added city with ID: ${city.id}`);
    }
    catch (error) {
        res.status(400).json(error);
        return next(error);
    }
});
app.use(validation_1.ValidationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map