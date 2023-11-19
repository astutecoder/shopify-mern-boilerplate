import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import productRouter from './routes/products';
import { DB_URL, PORT } from './utils/constants/global';

const dbUrl = DB_URL;
const port = PORT;
const app = express();

mongoose
  .connect(dbUrl!)
  .then(() => {
    console.log(`db connection established`);

    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
      res.json({ a: 1 });
    });

    app.use('/auth', authRouter);
    app.use('/products', productRouter);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`app is listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log('error', error);
  });
