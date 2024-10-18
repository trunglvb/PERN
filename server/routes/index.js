const { notFound, defaultError } = require('@middlewares/error.middleware.js');
const authRouter = require('./auth.route.js');

const initRouter = (app) => {
  app.use('/api/auth', authRouter);
  app.use(notFound);
  app.use(defaultError);
};

module.exports = initRouter;
