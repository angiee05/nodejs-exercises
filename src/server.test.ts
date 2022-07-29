import supertest from "supertest"

import app from "./app";

const request = supertest(app);


test('GET /andiamo', async () => { 
  const response = await request
    .get("/andiamo")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toEqual([
    { città: "Tbilisi" },
    { provincia: "Kartli" },
  ]);
})