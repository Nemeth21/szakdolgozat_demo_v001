import { POST } from "@/api/login"; 
import { NextResponse } from "next/server";
import * as mongodb from "@/lib/mongodb"; 
import bcrypt from "bcryptjs";
import User from "@/models/User";

jest.mock("@/lib/mongodb");
jest.mock("@/models/User");
jest.mock("bcryptjs");

describe("POST /api/login", () => {
  let mockConnectToDatabase: jest.Mock;
  let mockUserFindOne: jest.Mock;
  let mockBcryptCompare: jest.Mock;

  beforeEach(() => {
    mockConnectToDatabase = mongodb.connectToDatabase as jest.Mock;
    mockUserFindOne = User.findOne as jest.Mock;
    mockBcryptCompare = bcrypt.compare as jest.Mock;
  });

  it("should return 400 if email or password is missing", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "", password: "" }),
    };

    const response = await POST(req as any);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("hiányzó adatok!");
  });

  it("should return 400 if user is not found", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    };

    mockConnectToDatabase.mockResolvedValueOnce({});
    mockUserFindOne.mockResolvedValueOnce(null); 

    const response = await POST(req as any);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("hibás email vagy jelszó!");
  });

  it("should return 400 if password does not match", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    };

    mockConnectToDatabase.mockResolvedValueOnce({});
    mockUserFindOne.mockResolvedValueOnce({ password: "hashedPassword" });
    mockBcryptCompare.mockResolvedValueOnce(false); 

    const response = await POST(req as any);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("hibás email vagy jelszó!");
  });

  it("should return 200 if login is successful", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    };

    mockConnectToDatabase.mockResolvedValueOnce({});
    mockUserFindOne.mockResolvedValueOnce({ password: "hashedPassword" });
    mockBcryptCompare.mockResolvedValueOnce(true); 

    const response = await POST(req as any);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.email).toBe("test@example.com");
  });

  it("should return 500 if an error occurs", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    };

    mockConnectToDatabase.mockRejectedValueOnce(new Error("database connection error"));

    const response = await POST(req as any);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(" egy banális hiba történt!");
  });
});
