import transactionsData from '../data/transactions.json';
import dayjs from "@/lib/dayjs"


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
  data: Transaction[];
  amountByState: {
    state: string;
    deposit: number;
    withdraw: number;
  }[];
};

export type TransactionFilters = {
  account?: string;
  industry?: string;
  state?: string;
  startDate?: number;
  endDate?: number;
};

export function getTransactionSummary(
  filters: TransactionFilters = {}
): TransactionSummary {
  const {
    account = 'All',
    industry = 'All',
    state = 'All',
    startDate = Date.parse(dayjs().startOf('month').format('YYYY-MM-DD')),
    endDate = Date.parse(dayjs().endOf('month').format('YYYY-MM-DD')),
  } = filters;

  const transactions = (transactionsData as Transaction[]);

  const filtered = transactions.filter((t) => {
    if (account !== 'All' && t.account !== account) return false;
    if (industry !== 'All' && t.industry !== industry) return false;
    if (state !== 'All' && t.state !== state) return false;
    if (startDate !== undefined && t.date < startDate) return false;
    if (endDate !== undefined && t.date > endDate) return false;
    return true;
  });

  const depositTransactions = filtered.filter((t) => t.transaction_type === 'deposit');
  const withdrawTransactions = filtered.filter((t) => t.transaction_type === 'withdraw');

  const totalBalance = depositTransactions.reduce((sum, t) => {
    // Converte string para float com 2 casas decimais
    const value = parseFloat((parseInt(t.amount, 10) / 100).toFixed(2));
    return sum + value;
  }, 0);

  // Agrupamento por estado
  const groupedByState: Record<string, { deposit: number; withdraw: number }> = {};

  filtered.forEach((tx) => {
    if (!groupedByState[tx.state]) {
      groupedByState[tx.state] = { deposit: 0, withdraw: 0 };
    }
    const amount = parseFloat((parseInt(tx.amount, 10) / 100).toFixed(2));
    if (tx.transaction_type === 'deposit') {
      groupedByState[tx.state].deposit += amount;
    } else if (tx.transaction_type === 'withdraw') {
      groupedByState[tx.state].withdraw += amount;
    }
  });

  const amountByState = Object.entries(groupedByState).map(([state, { deposit, withdraw }]) => ({
    state,
    deposit: parseFloat(deposit.toFixed(2)),
    withdraw: parseFloat(withdraw.toFixed(2)),
  }));

  return {
    totalBalance: parseFloat(totalBalance.toFixed(2)),
    transactionCount: filtered.length,
    depositCount: depositTransactions.length,
    withdrawCount: withdrawTransactions.length,
    data: filtered,
    amountByState
  };
}