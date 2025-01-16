import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Checker from './checker';

const InitServer = () => {
  dotenv.config({
    path: '../../.env'
  });

  const app = express();

  app.get('/', (req: Request, res: Response): any => {
    return res.end();
  });

  app.listen(process.env.CHECK_SERVER_PORT, () => {
    console.log(`✅ Check Server running on PORT: ${process.env.CHECK_SERVER_PORT}`);
  });
};

InitServer();
setInterval(Checker.getInstance().healthCheck, 5000);
