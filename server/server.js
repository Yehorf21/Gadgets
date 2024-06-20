import express from 'express';
import cors from 'cors';

import 'dotenv/config.js';
import { usersRouter } from './routes/users.routes.js';

const app = express();
const port = +process.env.PORT || 4000;
const origin = process.env.CLIENT_ORIGIN || 'https://yehorf21.github.io';

const corsOptions = {
  origin,
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})