const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectionDatabase } = require('@configs/dbconnect.js');
const app = express();
require('module-alias/register');
const initRouter = require('@routes/index.js');
connectionDatabase();

const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@utils': `${__dirname}/utils`,
  '@controllers': `${__dirname}/controllers`,
  '@models': `${__dirname}/models`,
  '@middlewares': `${__dirname}/middlewares`,
  '@routes': `${__dirname}/routes`,
  '@migrations': `${__dirname}/migrations`,
  '@seeders': `${__dirname}/seeders`,
  '@configs': `${__dirname}/configs`
});

dotenv.config();
const port = process.env.PORT || 8888;
app.use(cors({ origin: process.env.CLIENT_URL, methods: ['POST', 'PUT', 'DELETE', 'GET'] }));
app.use(express.json({ limit: '5mb' }));

//for formData
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

//route
initRouter(app);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
