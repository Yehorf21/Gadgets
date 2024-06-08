import express from 'express';
import { controller } from '../controller/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', controller.getAll);

usersRouter.post('/', controller.post);
