import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import Interceptor from './utils/interceptor';
import Checker from './utils/checker';

const InitServer = async () => {
  dotenv.config({
    path: '../../.env'
  });

  const app = express();
  app.use(express.json());

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    await Interceptor.getInstance().connectMainServer(req);
    // next();
  });

  app.get('/', (req: Request, res: Response): any => {
    console.log('method', req.method);
    console.log('query', req.query);
    console.log('params', req.params);
    console.log('url', req.url);
    console.log('path', req.path);
    console.log('token', req.headers['authorization']?.split(' ')[1]);

    return res.status(200).json({});
  });

  app.listen(process.env.PORT_CHECK_SERVER, () => {
    console.log(`✅ Check Server running on ${process.env.BASE_URL}:${process.env.PORT_CHECK_SERVER}`);
  });
};

InitServer();
setInterval(Checker.getInstance().healthCheck, 5000);
