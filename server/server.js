import express from 'express';
import cors from 'cors';

import 'dotenv/config.js';
import { usersRouter } from './routes/users.routes.js';

const app = express();
const port = +process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  methods: 'GET, POST',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})