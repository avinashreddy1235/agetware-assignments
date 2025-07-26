import express from 'express';
import { createLoan } from '../controllers/loanController.js';

const router = express.Router();

router.post('/loans', createLoan);

export default router;
