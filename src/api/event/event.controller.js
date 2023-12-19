const express = require("express");
const router = express.Router();
const eventService = require("../event/event.service");
const utils = require("../../utils/apiUtils");
const validatorCatcher = require("../../middlewares/validatorCatcher");
const authenticateToken = require("../../middlewares/authenticateToken");



router.get("/",validatorCatcher, async (req, res) => {
    try {
      const sanitizeQuery = {
        category: req.query.category ? req.query.category : null,
        location: req.query.location ? req.query.location : null,
        search: req.query.search ? req.query.search : null,
        page: req.query.page ? parseInt(req.query.page) : null,
        limit: req.query.limit ? parseInt(req.query.limit) : null,
        date_lte: req.query.date_lte ? req.query.date_lte : null,
        date_gte: req.query.date_gte ? req.query.date_gte : null,
        sort: req.query.sort ? req.query.sort : null,
      };

      const events = await eventService.getAllEvents(sanitizeQuery);

      return utils.apiResponse(200, req, res, {
        status: true,
        message: "success get all events",
        body: events,
      });
      
    } catch (err) {
        console.log(err);
        return utils.apiResponse(err.statusCode, req, res, {
          status: false,
          message: err.message,
        });
      
    }
  }
);

router.get("/my-events", authenticateToken, async (req, res) => {
  try {
    // const myEvents=
    const userId = req.user.id;
    const myEventAndTicket = await eventService.getMyEventAndTicket(userId);
    return utils.apiResponse("200", req, res, {
      status: true,
      message: "Success fetching events",
      body: myEventAndTicket,
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
});


router.get("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!eventId) {
      return utils.apiResponse(400, req, res, {
        status: false,
        message: "Bad id parameter",
      });
    }
    const event = await eventService.getEventById(eventId);
    return utils.apiResponse(200, req, res, {
      status: true,
      message: "Fetched event",
      body: event,
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
        message: err.message ? err.message : "Sorry Something Error",
      });
    }
  }
});


module.exports = router;

