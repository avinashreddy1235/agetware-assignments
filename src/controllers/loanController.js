import { v4 as uuidv4 } from 'uuid';
import { initDB } from '../db/database.js';

export const createLoan = async (req, res) => {
  try {
    const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;

    if (!customer_id || !loan_amount || !loan_period_years || !interest_rate_yearly) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const db = await initDB();

    const interest = loan_amount * loan_period_years * (interest_rate_yearly / 100);
    const total_amount = loan_amount + interest;
    const monthly_emi = total_amount / (loan_period_years * 12);
    const loan_id = uuidv4();
    const created_at = new Date().toISOString();

    await db.run(
      `INSERT INTO Loans (loan_id, customer_id, principal_amount, interest_rate, loan_period_years, total_amount, monthly_emi, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [loan_id, customer_id, loan_amount, interest_rate_yearly, loan_period_years, total_amount, monthly_emi, 'ACTIVE', created_at]
    );

    return res.status(201).json({
      loan_id,
      customer_id,
      total_amount_payable: total_amount,
      monthly_emi: monthly_emi.toFixed(2),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
