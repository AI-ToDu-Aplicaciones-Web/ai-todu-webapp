import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
app.use(express.static(dist));
app.listen(process.env.PORT || 3000);
