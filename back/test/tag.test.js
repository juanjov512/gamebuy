const app = require("../src/index.js");
const request = require("supertest");

/*
  Test de crear etiquetas
*/
describe("POST /tags", function () {
  it("responds with 200 ok", function (done) {
    const data = {
      tag: "testTag",
    };
    request(app)
      .post("/api/tags")
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
  Test de obtener etiquetas
*/
describe("GET /tags", () => {
  it("respond with json of tags", (done) => {
    request(app)
      .get("/api/tags")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
