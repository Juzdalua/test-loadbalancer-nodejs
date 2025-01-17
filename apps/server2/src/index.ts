import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env'
});

const app = express();

app.get('/health-check', (req: Request, res: Response): any => {
  return res.status(200).json({});
});

app.get('/', (req: Request, res: Response) => {
  console.log('HI');
  res.end();
});

app.listen(process.env.PORT_SERVER2, () => {
  console.log(`✅ Check Server running on PORT: ${process.env.PORT_SERVER2}`);
});
