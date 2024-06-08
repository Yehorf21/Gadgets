import bcrypt from 'bcrypt';

const generateHash = async (password) => {
  return (await bcrypt.hash(password, 10));
};

const verifyPassword = async (plain, hash) => {
  return (await bcrypt.compare(plain, hash));
};

const normalize = ({ id, email }) => {
  return { id, email };
};

export const security = { generateHash, verifyPassword, normalize };