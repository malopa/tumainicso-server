const UserController = require("../controllers/UserController")
const express = require("express")
const router = express.Router();

router.get("/user",UserController.getUsers)
router.post("/user/register",UserController.addUser)
router.post("/user/login",UserController.login)
router.delete("/user/:id",UserController.deleteUser)


module.exports = router;