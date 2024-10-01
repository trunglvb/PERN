import express from 'express';
import { config as configEnv } from 'dotenv';
import cors from 'cors';
import { connectionDatabase } from './configs/dbconnect.js';
const app = express();

configEnv();
const port = process.env.PORT || 8888;
app.use(cors({ origin: process.env.CLIENT_URL, methods: ['POST', 'PUT', 'DELETE', 'GET'] }));
app.use(express.json({ limit: '5mb' }));

//for formData
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectionDatabase();
