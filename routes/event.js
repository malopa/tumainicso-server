const express = require("express");
const eventController = require("../controllers/eventsController");
var multer = require('multer');


router = express.Router();

const upload = multer({
    limits: {
      fileSize: 4 * 1024 * 1024,
    }
  });

router.get("/events",eventController.getEvent)
router.post("/events",upload.single("img"),eventController.postEvent)
router.delete("/events/:id",eventController.deleteEvent)

module.exports = router;