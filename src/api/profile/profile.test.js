const app = require("../../app");
const request = require("supertest");
const { log } = require("console");

describe("GET /api/profile", () => {
    let server; // Declare a variable to hold the server instance
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4ZDhjNDRiNTNiZmJhYjFiNzhjYSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImZ1bGxuYW1lIjoiam9obiBkb2UiLCJhZ2UiOm51bGwsInBhc3N3b3JkIjoiJDJhJDEwJDY4aExGdC9lMkdIdndFYncwd1BYdU8yeC5hazY1Y1Z5d0tqNm9Oc3VpVTEvWDFnLi52alcuIiwic3RhdHVzIjoiVkVSSUZJRUQiLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRBdCI6IjIwMjMtMTItMTFUMDQ6MTg6MjAuMTEzWiIsImlhdCI6MTcwMzIyMTk4NH0.7Tf3cXht7rd1TFNtxXBKiYQeyi8r0dtfsIny6AW-CSE";
    const wrongToken ="abcdefgh";

    beforeAll(() => {
      server = app.listen(8000); // Start the server before running tests
    });
  
    afterAll((done) => {
      server.close(done); // Close the server after all tests are done
    });  
  
    test("get profile details with correct token", async () => {
      const { statusCode, body } = await request(app)
      .get("/api/profile")
      .set('Authorization', `Bearer ${token}`);
      const returnBody = body.body.body;

      expect(statusCode).toBe(200);
      expect(body.body.status).toBe(true);
      expect(typeof returnBody.id).toBe("string");
      expect(typeof returnBody.email).toBe("string");
      expect(typeof returnBody.fullname).toBe("string");
      expect(typeof returnBody.password).toBe("string");
      expect(typeof returnBody.role).toBe("string");
      expect(typeof returnBody.status).toBe("string");
    }, 30000);
  
    test("get profile details with wrong token", async () => {
      const { statusCode, body } = await request(app)
      .get("/api/profile")
      .set('Authorization', `Bearer ${wrongToken}`);

      expect(statusCode).toBe(403);
      expect(body.body.status).toBe(false);
      expect(body.body.message).toBe("Invalid token.");
    }, 30000);
  
    test("get profile details with wrong token", async () => {
        const { statusCode, body } = await request(app)
        .get("/api/profile")

        expect(statusCode).toBe(401);
        expect(body.body.status).toBe(false);
        expect(body.body.message).toBe("Access token not found.");
    }, 30000);
});