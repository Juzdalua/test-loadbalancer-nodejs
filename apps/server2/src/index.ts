import express from 'express';

const PORT = 4002;
const app = express();

app.listen(PORT, () => {
  console.log(`✅ Check Server running on PORT: ${PORT}`);
});
