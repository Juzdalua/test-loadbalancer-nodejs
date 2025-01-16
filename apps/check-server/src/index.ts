import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env'
});

const app = express();

app.listen(process.env.CHECK_SERVER_PORT, () => {
  console.log(`✅ Check Server running on PORT: ${process.env.CHECK_SERVER_PORT}`);
});
