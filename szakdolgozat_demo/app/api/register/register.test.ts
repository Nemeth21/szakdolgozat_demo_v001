import { POST } from "@/api/register"; // Regisztrációs API importálása
import { NextResponse } from "next/server";
import User from "@/models/User"; // User modell importálása
import bcrypt from "bcryptjs";

// Mocking a database call and bcrypt hash function
jest.mock("@/lib/mongodb", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("POST /api/register", () => {
  it("should return error if email or password is missing", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue({ email: "", password: "" }),
    };

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "❌ Hiányzó adatok!" });
  });

  it("should return error if email is already taken", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password" }),
    };
    // Mocking User.findOne to return an existing user
    User.findOne.mockResolvedValue({ email: "test@example.com" });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "❌ Az email már foglalt!" });
  });

  it("should hash the password and create a new user if email is not taken", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue({ email: "newuser@example.com", password: "password" }),
    };
    // Mocking User.findOne to return null (no existing user)
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed_password"); // Mocking bcrypt.hash

    const saveMock = jest.fn().mockResolvedValue({});
    User.prototype.save = saveMock;

    const response = await POST(req);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, email: "newuser@example.com" });
    expect(User.prototype.save).toHaveBeenCalledTimes(1); // Ensure save method is called once
    expect(bcrypt.hash).toHaveBeenCalledWith("password", 10); // Ensure bcrypt.hash is called with correct arguments
  });

  it("should return server error if an exception occurs", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue({ email: "newuser@example.com", password: "password" }),
    };
    // Mocking User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await POST(req);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "⚠️ Szerverhiba történt!" });
  });
});
