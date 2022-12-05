import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './inputs/create-account.input';
import { AccountEntity } from './entities/account.entity';
import { UpdateAccountInput } from './inputs/update-account.input';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AccountsService {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
		private readonly rolesService: RolesService,
	) {}

	findAll(): Promise<AccountEntity[]> {
		return this.accountRepository.find();
	}

	findOne(id: number): Promise<AccountEntity> {
		return this.accountRepository.findOneByOrFail({ id });
	}

	getRole(roleId: number): Promise<Role> {
		return this.rolesService.findOne(roleId)
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
