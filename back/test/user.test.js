const app = require("../src/index.js");
const request = require("supertest");

/*
  Test de crear usuario
*/
describe("POST /users", function () {
  it("responds with 200 ok", function (done) {
    const data = {
      name: "Juan",
      lastName: "Villegas",
      userName: "juanvillegas",
      age: 21,
      email: "test123@test.com",
      password: "test",
      isPublisher: true,
    };
    request(app)
      .post("/api/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/*
  Test de obtener usuarios
*/
describe("GET /users", () => {
  it("respond with json of users", (done) => {
    request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
