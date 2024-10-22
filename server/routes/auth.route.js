const express = require('express');
const authRouter = express.Router();
const { loginWithGoogle, checkAlreadyUser } = require('@controllers/auth.controller');

authRouter.post('/google-login', loginWithGoogle);
authRouter.get('/has-user', checkAlreadyUser);

module.exports = authRouter;
