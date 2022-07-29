import express from "express";
import "express-async-errors";

const app = express();

app.get("/cities", (request, response) => {
  response.json([{ city: "Naples" }, { city: "Florence" }]);
});

export default app;
