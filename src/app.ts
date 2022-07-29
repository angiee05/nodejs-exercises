import express from "express";
import "express-async-errors";

const app = express();

app.get("/andiamo", (request, response) => {
  response.json([{ città: "Tbilisi" }, { provincia: "Kartli" }]);
});

export default app;