const app = require("../../app");
const request = require("supertest");
const { log } = require("console");
const utils = require("../../utils/apiUtils");
const types = require("../../config/types.config");

describe("GET /api/events/:id", () => {
  let server; // Declare a variable to hold the server instance

  beforeAll(() => {
    server = app.listen(3000); // Start the server before running tests
  });

  afterAll((done) => {
    server.close(done); // Close the server after all tests are done
  });

  test("Get an existing event", async () => {
    const { statusCode, body } = await request(app).get("/api/events/65768da2d84b9772dab498dd");
    const returnBody = body.body.body;

    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("Fetched event");
    expect(typeof returnBody.id).toBe("string");
    expect(typeof returnBody.userId).toBe("string");
    expect(typeof returnBody.title).toBe("string");
    expect(typeof returnBody.imageUrl).toBe("string");
    expect(new Date(returnBody.datetime)).toBeInstanceOf(Date);
    expect(Object.values(types.eventCity)).toContain(returnBody.city);
    expect(typeof returnBody.ticketPrice).toBe("number");
    expect(typeof returnBody.capacity).toBe("number");
    expect(Object.values(types.eventCategory)).toContain(returnBody.category);
    expect(returnBody.status).toBe(types.status.verified);
    expect(new Date(returnBody.createdAt)).toBeInstanceOf(Date);
    expect(returnBody).toHaveProperty("description");
    expect(returnBody).toHaveProperty("locationDetail");
  }, 30000);

  test("Get non existing event", async () => {
    const { statusCode, body } = await request(app).get("/api/events/65768da2d84b9772dab41234");

    expect(statusCode).toBe(404);
    expect(body.body.status).toBe(false);
    expect(body.body.message).toBe("Event not found");
  }, 30000);

  // test("Get an event with non number id parameter", async () => {
  //   const { statusCode, body } = await request(app).get("/api/events/65768da2d84b9772dab4fake");

  //   expect(statusCode).toBe(400);
  //   expect(body.body.status).toBe(false);
  //   expect(body.body.message).toBe("Bad id parameter");
  // }, 30000);
});

describe("GET /api/events", () => {
  let server; // Declare a variable to hold the server instance

  beforeAll(() => {
    server = app.listen(3000); // Start the server before running tests
  });

  afterAll((done) => {
    server.close(done); // Close the server after all tests are done
  });

  test("Get all events without query string", async () => {
    const { statusCode, body } = await request(app).get("/api/events");

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("success get all events");
    expect(returnBody).toBeInstanceOf(Array);
    expect(typeof returnBody[0].id).toBe("string");
    expect(typeof returnBody[0].userId).toBe("string");
    expect(typeof returnBody[0].title).toBe("string");
    expect(typeof returnBody[0].imageUrl).toBe("string");
    expect(new Date(returnBody[0].datetime)).toBeInstanceOf(Date);
    expect(Object.values(types.eventCity)).toContain(returnBody[0].city);
    expect(typeof returnBody[0].ticketPrice).toBe("number");
    expect(typeof returnBody[0].capacity).toBe("number");
    expect(Object.values(types.eventCategory)).toContain(
      returnBody[0].category
    );
    expect(returnBody[0].status).toBe(types.status.verified);
    expect(new Date(returnBody[0].createdAt)).toBeInstanceOf(Date);
    expect(returnBody[0]).toHaveProperty("description");
    expect(returnBody[0]).toHaveProperty("locationDetail");
  }, 30000);

  // test("Get all events with pagination (limit and page query)", async () => {
  //   const { statusCode, body } = await request(app).get(
  //     "/api/events?page=2&limit=3"
  //   );

  //   const returnBody = body.body.body;
  //   expect(statusCode).toBe(200);
  //   expect(body.body.status).toBe(true);
  //   expect(body.body.message).toBe("success get all events");
  //   expect(returnBody).toBeInstanceOf(Array);
  //   expect(returnBody.length).toBe(3);
  // }, 30000);

  test("Get all events with category filter", async () => {
    const { statusCode, body } = await request(app).get(
      "/api/events?category=MUSIC"
    );

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("success get all events");
    expect(returnBody).toBeInstanceOf(Array);
    expect(returnBody[0].category).toBe(types.eventCategory.music);
  }, 30000);

  test("Get all events with location filter", async () => {
    const { statusCode, body } = await request(app).get(
      "/api/events?location=BANDUNG"
    );

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("success get all events");
    expect(returnBody).toBeInstanceOf(Array);
    expect(returnBody[0].city).toBe(types.eventCity.bandung);
  }, 30000);

  test("Get all events with search query", async () => {
    const { statusCode, body } = await request(app).get(
      "/api/events?search=1"
    );

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("success get all events");
    expect(returnBody).toBeInstanceOf(Array);
    expect(returnBody[0].title).toContain("EVENT 1");
  }, 30000);

  test("Get all events with ascending order", async () => {
    const { statusCode, body } = await request(app).get("/api/events?sort=asc");

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("success get all events");
    expect(returnBody).toBeInstanceOf(Array);
    const isGreaterThan = (d1, d2) => {
      let date1 = new Date(d1).getTime();
      let date2 = new Date(d2).getTime();
      return date1 > date2
    };
    expect(
      
      isGreaterThan(returnBody[1].createdAt, returnBody[0].createdAt)
    ).toBe(true);
  }, 30000);

  // test("Get all events within range of time", async () => {
  //   const { statusCode, body } = await request(app).get(
  //     "/api/events?date_lte=2023-08-30&date_gte=2023-08-01"
  //   );

  //   const returnBody = body.body.body;
  //   expect(statusCode).toBe(200);
  //   expect(body.body.status).toBe(true);
  //   expect(body.body.message).toBe("success get all events");
  //   expect(returnBody).toBeInstanceOf(Array);
  //   expect(utils.isGreaterThan("2023-08-31", returnBody[0].createdAt)).toBe(
  //     true
  //   );
  //   expect(
  //     utils.isGreaterThan(
  //       returnBody[returnBody.length - 1].createdAt,
  //       "2023-07-31"
  //     )
  //   ).toBe(true);
  // }, 30000);
});

describe("GET /api/events/my-events", () => {
  let server; // Declare a variable to hold the server instance
  let token;

  beforeAll(async () => {
    server = app.listen(8000); // Start the server before running tests
    const { body } = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "123456789",
    });
    const accToken = body.body.body.accessToken;
    token = accToken;
  }, 30000);

  afterAll((done) => {
    server.close(done); // Close the server after all tests are done
  });

  test("Get my events with token", async () => {
    const { statusCode, body } = await request(app)
      .get("/api/events/my-events")
      .set("Authorization", `Bearer ${token}`);

    const returnBody = body.body.body;
    expect(statusCode).toBe(200);
    expect(body.body.status).toBe(true);
    expect(body.body.message).toBe("Success fetching events");
    expect(returnBody).toHaveProperty("upcomingEvents");
    expect(returnBody).toHaveProperty("pastEvents");
    expect(returnBody.upcomingEvents).toBeInstanceOf(Array);
    expect(returnBody.pastEvents).toBeInstanceOf(Array);
  }, 30000);

  test("Get my events without token", async () => {
    const { statusCode, body } = await request(app)
      .get("/api/events/my-events")

    expect(statusCode).toBe(401);
    expect(body.body.status).toBe(false);
    expect(body.body.message).toBe("Access token not found.");
  }, 30000);

  test("Get my events with false token", async () => {
    const { statusCode, body } = await request(app)
      .get("/api/events/my-events")
      .set("Authorization", `Bearer ${token}falsy`);

    expect(statusCode).toBe(403);
    expect(body.body.status).toBe(false);
    expect(body.body.message).toBe("Invalid token.");
  }, 30000);


});
