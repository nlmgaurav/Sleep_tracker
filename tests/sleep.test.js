const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sleepRoutes = require("../routes/sleep");
const SleepRecord = require("../models/SleepRecord");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/sleep", sleepRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sleep API", () => {
  let recordId;

  it("should create a new sleep record", async () => {
    const res = await request(app).post("/sleep").send({
      userId: "user123",
      hours: 7,
      timestamp: new Date(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.userId).toBe("user123");
    recordId = res.body._id;
  });

  it("should retrieve sleep records for a user", async () => {
    const res = await request(app).get("/sleep/user123");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should delete a sleep record", async () => {
    const res = await request(app).delete(`/sleep/${recordId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Record deleted");
  });
});
