const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

const multer = require("multer")


const upload = multer({
    limits: {
      fileSize: 4 * 1024 * 1024,
    }
  });

router.get('/news',newsController.getNews);
router.post('/news',upload.any(),newsController.postNews);
router.delete('/news/:id',newsController.deleteNews);


module.exports = router;
