import jwt from 'jsonwebtoken';
require('dotenv').config()

export const mockedApiToken = jwt.sign({ userId: 'testUser' }, process.env.JWT_SECRET || 'default_secret');