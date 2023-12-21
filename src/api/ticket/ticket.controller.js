const express = require("express");
const ticketService = require("./ticket.service");

const router = express.Router();
const utils = require("../../utils/apiUtils");

router.post("/", async (req, res) => {
    try {
        const sanitizeTicket = {
          quantity: req.body.quantity,
          eventId: req.body.eventId,
          userId: req.body.userId,
        };
  
        const tickets = await ticketService.createTicket(sanitizeTicket);
        return utils.apiResponse(201, req, res, {
          status: true,
          message: "Success buying tickets",
          body: tickets,
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
