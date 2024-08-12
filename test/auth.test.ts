import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { getDatabase, setupDatabase } from "../src/models/database";

const { expect } = chai;
chai.use(chaiHttp);

const request = chai.request(app);

describe("Auth Routes", function () {
  // Set up the database before all tests
  before(async function () {
    await setupDatabase();
  });

  beforeEach(async function () {
    const db = await getDatabase();
    await db.exec("DELETE FROM users"); // Nettoie la table 'users' avant chaque test
  });

  // Clean up or reset database after each test if needed
  afterEach(async function () {
    // Implement cleanup logic if required
  });

  it("should register a user", async function () {
    const res = await request
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      "message",
      "User registered successfully"
    );
  });

  it("should authenticate a user and return a JWT", function (done) {
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
    request.get("/api/public").end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message", "This is a public route");
      done();
    });
  });

  it("should not access a private route without token", function (done) {
    request.get("/api/private").end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(401);
      expect(res.body).to.have.property(
        "error",
        "Token missing from authorization header"
      );
      done();
    });
  });

  it("should access a private route with a valid token", async function () {
    // First, login to get the token
    const loginRes = await request
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    // Assert that the login response contains a token
    expect(loginRes).to.have.status(200);
    expect(loginRes.body).to.have.property("token");

    const token = loginRes.body.token;

    // Use the token to access the private route
    const privateRes = await request
      .get("/api/private")
      .set("Authorization", `Bearer ${token}`);

    // Assert that the private route response is as expected
    expect(privateRes).to.have.status(200);
    expect(privateRes.body).to.have.property(
      "message",
      "This is a private route"
    );
  });
});
