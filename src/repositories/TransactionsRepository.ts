import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = await this.find();
    const income = transactions
      .filter(item => item.type === 'income')
      .reduce((acc, cur) => acc + cur.value, 0);

    const outcome = transactions
      .filter(item => item.type === 'outcome')
      .reduce((acc, cur) => acc + cur.value, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
