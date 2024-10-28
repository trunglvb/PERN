const express = require('express');
const authRouter = express.Router();
const { loginWithGoogleController, checkAlreadyUserController, logout } = require('@controllers/auth.controller');

authRouter.post('/google-login', loginWithGoogleController);
authRouter.get('/has-user', checkAlreadyUserController);
authRouter.post('/logout', logout);

module.exports = authRouter;
