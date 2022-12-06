import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './entities/account.entity';
import { UpdateAccountInput } from './dto/update-account.input';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AccountsService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		@Inject(forwardRef(() => RolesService))
		private readonly rolesService: RolesService,
	) {}

	getRole(roleId: number) {
		return this.rolesService.findOne(roleId);
	}

	findAll(options?: FindManyOptions<Account>): Promise<Account[]> {
		return this.accountRepository.find(options);
	}

	findOne(id: number): Promise<Account> {
		return this.accountRepository.findOneByOrFail({ id });
	}

	async create(data: CreateAccountInput): Promise<Account> {
		return this.accountRepository.save(data);
	}

	async update(data: UpdateAccountInput): Promise<Account> {
		await this.accountRepository.update({ id: data.id }, { ...data });
		return await this.findOne(data.id);
	}

	async remove(id: number): Promise<number> {
		await this.accountRepository.delete({ id });
		return id;
	}
}



