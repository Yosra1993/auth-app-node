import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import { setupDatabase } from "../src/models/database";

const { expect } = chai;
chai.use(chaiHttp);

const request = chai.request(app);

describe("Auth Routes", function () {
  // Set up the database before all tests
  before(async function () {
    await setupDatabase();
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

  it("should authenticate a user and return a JWT", async function () {
    const res = await request
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("should access a public route", async function () {
    const res = await request.get("/api/public");

    expect(res).to.have.status(200);
  });

  it("should not access a private route without token", async function () {
    const res = await request.get("/api/private");

    expect(res).to.have.status(401);
  });

  it("should access a private route with a valid token", async function () {
    // First, login to get the token
    const loginRes = await request
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    const token = loginRes.body.token;

    // Use the token to access the private route
    const privateRes = await request
      .get("/api/private")
      .set("Authorization", `Bearer ${token}`);

    expect(privateRes).to.have.status(200);
  });
});
