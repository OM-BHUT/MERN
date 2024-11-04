const express = require('express');
const {handleRegister, verifyEmail} = require("../controllers/auth");

const authRouter = express.Router();
authRouter.post('/register',handleRegister);
authRouter.post('/verify',verifyEmail);


module.exports = authRouter;