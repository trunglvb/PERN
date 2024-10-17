const authRouter = require('./auth.route.js');

const initRouter = (app) => {
  app.use('/api/auth', authRouter);
};

module.exports = initRouter;
