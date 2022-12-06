import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountEntity } from './entities/account.entity';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountsService {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
	) {}

	findAll(): Promise<AccountEntity[]> {
		return this.accountRepository.find();
	}

	findOne(id: number): Promise<AccountEntity> {
		return this.accountRepository.findOneByOrFail({ id });
	}

	async create(data: CreateAccountInput): Promise<AccountEntity> {
		return this.accountRepository.save(data);
	}

	async update(data: UpdateAccountInput): Promise<AccountEntity> {
		await this.accountRepository.update({ id: data.id }, { ...data });
		return await this.findOne(data.id);
	}

	async remove(id: number): Promise<number> {
		await this.accountRepository.delete({ id });
		return id;
	}
}

