import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const findTransaction = await transactionsRepository.findOne({
      where: { id },
    });
    if (!findTransaction) {
      throw new AppError('Project not found');
    }

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
