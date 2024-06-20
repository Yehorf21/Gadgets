import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users-gadgets',
    createdAt: false,
    updatedAt: false,
  },
);

const getAll = async () => {
  return await User.findAll();
};

const getOne = async (email) => {
  return await User.findOne({ where: { email } });
};

const addOne = async (body) => {
  await User.create(body);
};

export const services = { getAll, getOne, addOne };