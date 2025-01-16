import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: '../../.env'
});

const app = express();

app.listen(process.env.SERVER2_PORT, () => {
  console.log(`✅ Check Server running on PORT: ${process.env.SERVER2_PORT}`);
});
