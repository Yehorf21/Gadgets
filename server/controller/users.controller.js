import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

import { services } from '../services/users.services.js';
import { security } from '../security.js';

const getAll = async (req, res) => {
  const users = await services.getAll();

  res.send(users.map(security.normalize));
};

const post = async (req, res) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET;
  let method = 'logged in';
  
  // error handling
  if (!email.trim() || !password.trim()) {
    res.status(400).send('Both email and password have to be entered');
    
    return;
  }

  const user = await services.getOne(email);
  
  // sign-up handling
  if (!user) {
    const hash = await security.generateHash(password, 10);
    
    await services.addOne({ email, hash });

    method = 'signed up';
  }

  // login handling
  if (user) {
    const isVerified = await security.verifyPassword(password, user.hash);
  
    if (!isVerified) {
      res.status(401).send({ message: 'The password is incorrect' });
      return;
    }
  }
  
  // jwt token handling
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).send({ message: `You ${method} successfully`, token });
};

export const controller = { getAll, post };