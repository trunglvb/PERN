const express = require('express');
const authRouter = express.Router();
const { loginWithGoogleController, checkAlreadyUserController } = require('@controllers/auth.controller');

authRouter.post('/google-login', loginWithGoogleController);
authRouter.get('/has-user', checkAlreadyUserController);

module.exports = authRouter;
