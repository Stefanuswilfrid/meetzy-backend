const express = require("express");
const router = express.Router();
const eventService = require("../event/event.service");
const utils = require("../../utils/apiUtils");


router.get("/", async (req, res) => {
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

module.exports = router;

