import * as dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT ?? '3000';
const app = createApp();

app.listen(Number(PORT), () => {
  console.log(`Server running on http://localhost:${PORT}`);
});