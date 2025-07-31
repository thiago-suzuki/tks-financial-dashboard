import transactionsData from '../data/transactions.json';

export type Transaction = {
  date: number;
  amount: string;
  transaction_type: 'deposit' | 'withdraw';
  currency: string;
  account: string;
  industry: string;
  state: string;
};

export type TransactionSummary = {
  totalBalance: number;
  transactionCount: number;
  depositCount: number;
  withdrawCount: number;
};

export type TransactionFilters = {
  account?: string;
  industry?: string;
  state?: string;
};

export function getTransactionSummary(
  filters: TransactionFilters = {}
): TransactionSummary {
  const {
    account = 'All',
    industry = 'All',
    state = 'All',
  } = filters;

  const transactions = transactionsData as Transaction[];

  const filtered = transactions.filter((t) => {
    if (account !== 'All' && t.account !== account) return false;
    if (industry !== 'All' && t.industry !== industry) return false;
    if (state !== 'All' && t.state !== state) return false;
    return true;
  });

  const depositTransactions = filtered.filter((t) => t.transaction_type === 'deposit');
  const withdrawTransactions = filtered.filter((t) => t.transaction_type === 'withdraw');

  const totalBalance = depositTransactions.reduce((sum, t) => {
    // Converte string para float com 2 casas decimais
    const value = parseFloat((parseInt(t.amount, 10) / 100).toFixed(2));
    return sum + value;
  }, 0);

  return {
    totalBalance: parseFloat(totalBalance.toFixed(2)),
    transactionCount: filtered.length,
    depositCount: depositTransactions.length,
    withdrawCount: withdrawTransactions.length,
  };
}