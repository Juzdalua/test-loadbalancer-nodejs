import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env'
});

const app = express();

app.listen(process.env.PORT_SERVER2, () => {
  console.log(`✅ Check Server running on PORT: ${process.env.PORT_SERVER2}`);
});
