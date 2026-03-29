import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  await contactHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
