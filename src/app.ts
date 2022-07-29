import express from "express";
import "express-async-errors";
import "dotenv/config";

console.log(process.env.PORT);

const app = express();

app.get("/cities", (request, response) => {
  response.json([{ city: "Naples" }, { city: "Florence" }]);
});

export default app;
