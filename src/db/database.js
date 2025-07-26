import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './src/db/bank.db',
    driver: sqlite3.Database,
  });

  // Create Customers table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Customers (
      customer_id TEXT PRIMARY KEY,
      name TEXT,
      created_at TEXT
    );
  `);

  // Create Loans table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Loans (
      loan_id TEXT PRIMARY KEY,
      customer_id TEXT,
      principal_amount REAL,
      interest_rate REAL,
      loan_period_years INTEGER,
      total_amount REAL,
      monthly_emi REAL,
      status TEXT,
      created_at TEXT
    );
  `);

  return db;
};
