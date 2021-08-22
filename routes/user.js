const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");


// start definitions

// end definitions

router.put("/login", controller.putLogin)

router.put("/register", controller.putRegister)

router.delete("/delete")

router.get('/stats')

module.exports = router;