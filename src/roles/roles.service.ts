import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
		@Inject(forwardRef(() => AccountsService))
		private readonly accountsService: AccountsService,
	) {}

	getAccounts(roleId: number) {
		return this.accountsService.findAll({ where: { roleId } });
	}

	create(createRoleInput: CreateRoleInput) {
		return this.roleRepository.save(createRoleInput);
	}

	findAll(options?: FindManyOptions<Role>) {
		return this.roleRepository.find(options);
	}

	findOne(id: number) {
		return this.roleRepository.findOneByOrFail({ id });
	}

	update(id: number, updateRoleInput: UpdateRoleInput) {
		return this.roleRepository.update(id, updateRoleInput);
	}

	async remove(id: number) {
		await this.roleRepository.delete({ id });
		return id;
	}
}

