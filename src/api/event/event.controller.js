const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("hey")

    try {
        return res.status(200).json({
            header: {
              time_request: new Date(),
            },
            message: "success get all events",
            body:"hey"
        });


      
    } catch (err) {
        console.log(err);
      return res.status(500, req, res, {
        status: false,
        message: "Sorry Something Error",
      });
    }
  }
);

module.exports = router;

