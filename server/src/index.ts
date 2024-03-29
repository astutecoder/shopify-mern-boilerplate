import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import productRouter from './routes/products';
import webhookRouter from './routes/webhooks';
import { DB_URL, PORT } from './utils/constants/global';
import { createServer } from 'http';
import { socket } from '../src/services/Socket';
import { isValidWebhookRequest } from './middlewares/webhook.middleware';

const dbUrl = DB_URL;
const port = PORT;
const app = express();
const server = createServer(app);

mongoose
  .connect(dbUrl!)
  .then(() => {
    console.log(`db connection established`);

    app.use(cors());
    app.use('/webhooks', isValidWebhookRequest, webhookRouter);
    app.use(express.json());

    app.get('/', (req, res) => {
      res.json({ a: 1, b: 2, c: 4 });
    });

    app.use('/auth', authRouter);
    app.use('/products', productRouter);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    socket.connect(server);

    server.listen(port, () => {
      console.log(`app is listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log('error', error);
  });
