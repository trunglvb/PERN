const { notFound, defaultError } = require('@middlewares/error.middleware.js');
const authRouter = require('./auth.route.js');
const userRouter = require('./user.route.js');

const initRouter = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use(notFound);
  app.use(defaultError);
};

module.exports = initRouter;
