const express = require("express");
const authService = require("./auth.service");
const router = express.Router();
const validatorCatcher = require("../../middlewares/validatorCatcher");
const utils = require("../../utils/apiUtils");



router.post("/register",async (req, res) => {
      try {
        const sanitizeUser = {
          email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        role: req.body.role,
        age: req.body.age ? req.body.age : null,
        };
        console.log("test")
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
  console.log("login")
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
