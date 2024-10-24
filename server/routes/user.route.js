const express = require('express');
const { getUserController } = require('@controllers/users.controller');
const { accessTokenValidator } = require('../middlewares/user.middleware');
const userRouter = express.Router();

userRouter.get('/me', accessTokenValidator, getUserController);

module.exports = userRouter;
