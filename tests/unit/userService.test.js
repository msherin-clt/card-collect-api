import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../../src/repositories/userRepo.js", () => ({
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
}));

const { createUser, findUserByEmail } = await import(
  "../../src/repositories/userRepo.js"
);

const { Prisma } = await import("@prisma/client");
const { signUp, login } = await import("../../src/service/userService.js");

describe("UserService", () => {
  describe("signUp", () => {
    it("should return user and token", async () => {
      const username = "testUsername";
      const email = "testEmail@email.com";
      const password = "testPassword";

      const createUserMock = jest.fn().mockResolvedValue({
        id: 1,
        username,
        email,
        password: "hashedPassword",
      });

      createUser.mockImplementation(createUserMock);

      const result = await signUp(username, email, password);

      expect(result).toEqual({
        user: {
          id: 1,
          username,
          email,
          password: "hashedPassword",
        },
        token: expect.any(String),
      });
    });
    it("should throw error if email already in use", async () => {
      const username = "testUsername";
      const email = "testEmail";
      const password = "testPassword";

      const createUserMock = jest.fn().mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          "The record with email testEmail already exists",
          {
            code: "P2002",
            clientVersion: "4.5.0",
            meta: {
              target: "User.email",
            },
          }
        )
      );

      createUser.mockImplementation(createUserMock);

      await expect(signUp(username, email, password)).rejects.toThrow(
        new Error("Email already in use"),
        "Expected the function to throw an error with the message 'Email already in use' and status code '409'."
      );
    });

    it("should throw error if username already in use", async () => {
      const username = "testUsername";
      const email = "testEmail";
      const password = "testPassword";

      const createUserMock = jest.fn().mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          "The record with username testUsername already exists",
          {
            code: "P2002",
            clientVersion: "4.5.0",
            meta: {
              target: "User.username",
            },
          }
        )
      );

      createUser.mockImplementation(createUserMock);
      await expect(signUp(username, email, password)).rejects.toThrow(
        expect.objectContaining({
          message: "Username already in use",
          status: 409,
        })
      );
    });
  });
});
