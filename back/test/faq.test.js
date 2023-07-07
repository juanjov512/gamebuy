const app = require("../src/index.js");
const request = require("supertest");

/*
  Test de crear faq
*/
describe("POST /faq", function () {
  it("responds with 200 ok", function (done) {
    const data = {
      title: "2. Why?",
      description: "Some test",
    };
    request(app)
      .post("/api/faq")
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
  Test de obtener faq
*/
describe("GET /faq", () => {
  it("respond with json of faqs", (done) => {
    request(app)
      .get("/api/faq")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
