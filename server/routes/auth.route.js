const express = require('express');
const authRouter = express.Router();
const { loginWithGoogle } = require('@controllers/auth.controller');

authRouter.post('/google-login', loginWithGoogle);

module.exports = authRouter;
