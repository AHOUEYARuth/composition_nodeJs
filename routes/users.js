const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/auth/register", usersController.register);
router.post("/auth/login", usersController.login);
router.get('/auth/', usersController.getAllUser);


module.exports = router;