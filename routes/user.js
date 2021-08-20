const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");


// start definitions

// end definitions

router.get("/login")

router.put("/register", controller.postRegister)

router.delete("/delete")

router.get('/stats')

module.exports = router;