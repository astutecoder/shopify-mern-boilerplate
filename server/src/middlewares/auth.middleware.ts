import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { User } from '../models';
import { JWT_SECRET } from '../utils/constants/global';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('Not authenticated');

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      id: ObjectId;
      iat: number;
    };

    if (!decoded?.id) {
      throw new Error('Not authenticated');
    }

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      throw new Error('Not authenticated');
    }

    req.user = { token: user.password, shop: user.shop };
    next();
  } catch (error) {
    console.log('error', error.message);
    next(error);
  }
};
