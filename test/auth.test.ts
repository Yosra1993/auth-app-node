import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { setupDatabase } from "../src/models/userModel";

const { expect } = chai;
chai.use(chaiHttp);

const request = chai.request(app);

describe("Auth Routes", function () {
  before(async function () {
    await setupDatabase(); // Set up the database before tests
  });

  it("should register a user", function (done) {
    request
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" })
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User registered successfully"
        );
        done();
      });
  });

  it("should authenticate a user and return a JWT", function (done) {
    chai;
    request
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" })
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should access a public route", function (done) {
    chai;
    request.get("/api/public").end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(200);
      done();
    });
  });

  it("should not access a private route without token", function (done) {
    chai;
    request.get("/api/private").end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(401);
      done();
    });
  });

  it("should access a private route with a valid token", function (done) {
    chai;
    request
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" })
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        const token = res.body.token;
        chai;
        request
          .get("/api/private")
          .set("Authorization", `Bearer ${token}`)
          .end((err: any, res: any) => {
            if (err) {
              return done(err);
            }
            expect(res).to.have.status(200);
            done();
          });
      });
  });
});
