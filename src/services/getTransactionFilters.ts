import transactionsData from '../data/transactions.json';
import { Transaction } from './getTransactionSummary';
 
const transactions = transactionsData as Transaction[]

export const accounts = Array.from(
  new Set(transactions.map(t => t.account))
);

export const industries = Array.from(
  new Set(transactions.map(t => t.industry))
);

export const states = Array.from(
  new Set(transactions.map(t => t.state))
);
