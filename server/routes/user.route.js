const express = require('express');
const { getUserController, postUserController } = require('@controllers/users.controller');
const { accessTokenValidator } = require('../middlewares/user.middleware');
const userRouter = express.Router();

userRouter.get('/me', accessTokenValidator, getUserController);
userRouter.post('/me1', accessTokenValidator, postUserController);

module.exports = userRouter;
