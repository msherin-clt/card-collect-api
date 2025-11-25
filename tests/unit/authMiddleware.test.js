import { beforeEach, describe, jest } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn(),
  },
}));

const jwtModule = await import("jsonwebtoken");
const jwt = jwtModule.default;

const { protect, isAdmin } = await import(
  "../../src/middleware/authMiddleware.js"
);

describe("authMiddleware", () => {
  let req, res, next;
  beforeEach(() => {
    req = { headers: {} };
    res = {};
    next = jest.fn();
    jest.resetAllMocks();
  });
  describe("isAdmin", () => {
    it("should call next if user is admin", () => {
      const req = { user: { role: "ADMIN" } };
      isAdmin(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
    it("should call next(error) if user is user", () => {
      const req = { user: { role: "USER" } };
      const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
      isAdmin(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      const error = next.mock.calls[0][0];
      expect(error.status).toBe(403);
      expect(error.message).toBe("Not authorized as an admin");
    });
  });

  describe("protect", () => {
    beforeEach(() => {
      req = { headers: {} };
      res = {};
      next = jest.fn();
      jest.resetAllMocks();
    });
    it("should return 401 if no token", () => {
      protect(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      const error = next.mock.calls[0][0];
      expect(error.status).toBe(401);
      expect(error.message).toBe("Not authorized, no token");
    });

    it("should return 401 if invalid token", () => {
      const req = { headers: { authorization: "Bearer invalidToken" } };
      protect(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      const error = next.mock.calls[0][0];
      expect(error.status).toBe(401);
      expect(error.message).toBe("Not authorized, token failed");
    });
  });
});
