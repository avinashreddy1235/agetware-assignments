import express from 'express';
import bodyParser from 'body-parser';
import loanRoutes from './src/routes/loanRoutes.js';
import { initDB } from './src/db/database.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/v1', loanRoutes);

// Ensure DB is initialized before starting server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
});
