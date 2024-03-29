const express = require("express");
const authService = require("./auth.service");
const router = express.Router();
const validatorCatcher = require("../../middlewares/validatorCatcher");
const utils = require("../../utils/apiUtils");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         fullname:
 *           type: string
 *           description: The full name of the user.
 *         age:
 *           type: integer
 *           format: int32
 *           description: The age of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         status:
 *           type: string
 *           description: The status of the user.
 *         role:
 *           type: string
 *           enum:
 *             - USER
 *             - EO
 *           description: The role of the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the user.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: halocuy@gmail.com
 *             fullname: halo cuy
 *             password: 123palocuygaskeun
 *             role: USER
 *             age: 12
 *     responses:
 *       200:
 *         description: Successful user registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
 *                   type: object
 *                   properties:
 *                     time_request:
 *                       type: string
 *                       format: date-time
 *                 body:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     body:
 *                       $ref: '#/components/schemas/User'
 *                       example:
 *                         id: 1
 *                         email: halocuy@gmail.com
 *                         fullname: halo cuy
 *                         age: null
 *                         password: "$2a$10$FOMELsoT1vMJX2OPwV3riO.8oOfxr.EjS36VqT6mdurype6xdkm/i"
 *                         status: VERIFIED
 *                         role: USER
 *                         createdAt: "2023-08-16T12:06:40.569Z"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logging in a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: halocuy@gmail.com
 *             password: 123palocuygaskeun
 *     responses:
 *       200:
 *         description: Successful user login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
 *                   type: object
 *                   properties:
 *                     time_request:
 *                       type: string
 *                       format: date-time
 *                 body:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                     body:
 *                       $ref: '#/components/schemas/User'
 *                       example:
 *                         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoibW5lb2NpY2Vyb2tAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJOZW8gTmVvIiwiYWdlIjoxOCwicGFzc3dvcmQiOiIkMmEkMTAkNm9yN0pXRmdVTGxYNTM5b3E0L0x3T0p6S2VEaC9CdmxtOU1NZThtQVRsbGlkSHBRdzBuNjIiLCJzdGF0dXMiOiJWRVJJRklFRCIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wOC0xOFQwNjoyMTo1My43MTFaIiwiaWF0IjoxNjkyMzQzNDg0fQ.e8hUthiojrUHxQUHrQqgdIQxvG5-V11SMzurRskRRU0
 */

router.post("/register",async (req, res) => {
      try {
        const sanitizeUser = {
          email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        role: req.body.role,
        age: req.body.age ? req.body.age : null,
        };
        const newUser = await authService.register(sanitizeUser);
        return utils.apiResponse(201, req, res, {
          status: true,
          message: "success adding new user",
          body: newUser,
        });
      } catch (err) {
        if (err.isCustomError) {
          return utils.apiResponse(err.statusCode, req, res, {
            status: false,
            message: err.message,
          });
        } else {
          return utils.apiResponse("500", req, res, {
            status: false,
            message: err.message ? err.message : "Sorry Something Went Wrong",
          });
        }
      }
    }
  );
  

router.post("/login",
async (req, res) => {
try {
  const sanitizeUser = {
    email: req.body.email,
    password: req.body.password,
  };
  const accessToken = await authService.login(sanitizeUser);

  return utils.apiResponse(200, req, res, {
    status: true,
    message: "successfully logged in",
    body: { accessToken : accessToken },
  });
  } catch (err) {
  if (err.isCustomError) {
    return utils.apiResponse(err.statusCode, req, res, {
      status: false,
      message: err.message,
    });
  } else {
    return utils.apiResponse(500, req, res, {
      status: false,
      message: err.message ? err.message : "Sorry Something Went Wrong",
    });
  }
}
});

  module.exports = router;
