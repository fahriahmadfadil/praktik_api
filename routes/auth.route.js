const express = require("express");
const { createUser, processLogin } = require("../controller/auth.controller");
const router = express.Router();
const jwtMiddleware = require("../middleware/verify-jwt");

router.post('/auth/create-user', jwtMiddleware,createUser);
router.post('/auth/login',processLogin); // login gk perlu jwt middleware

module.exports = router;