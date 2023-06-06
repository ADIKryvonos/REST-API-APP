// const mongoose = require("mongoose");
// const request = require("supertest");

// const app = require("../../app");

// const { DB_HOST_TEST, PORT = 3000 } = process.env;

// // 1. відповідь повина мати статус-код 200
// // 2. у відповіді повинен повертатися токен
// // 3. у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

// describe("login route test", () => {
//   let server = null;
//   beforeAll(async () => {
//     server = app.listen(PORT);
//     await mongoose.connect(DB_HOST_TEST);
//   });

//   afterAll(async () => {
//     server.close();
//     await mongoose.connection.close();
//   });

//   test("test login", async () => {
//     const loginData = {
//       email: "Cactus@dictum.com",
//       password: "123456",
//     };
//     const { statusCode, body, token } = await request(app)
//       .post("/users/login")
//       .send(loginData);

//     expect(statusCode).toBe(200);

//     expect(body.user).toBe(loginData);
//   });
// });
