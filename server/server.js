import express from 'express';
import cors from 'cors';

import 'dotenv/config.js';
import { usersRouter } from './routes/users.routes.js';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  methods: 'GET, POST',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', usersRouter);

app.listen(+process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
})