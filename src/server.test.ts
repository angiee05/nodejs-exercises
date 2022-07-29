import supertest from "supertest";

import app from "./app";

const request = supertest(app);

test("GET /cities", async () => {
  const response = await request
    .get("/cities")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toEqual([{ city: "Naples" }, { city: "Florence" }]);
});
